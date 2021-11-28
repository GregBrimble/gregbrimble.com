import {
  ServerBuild,
  AppLoadContext,
  createRequestHandler as _createRequestHandler,
} from "@remix-run/server-runtime";

export interface GetLoadContextFunction<Env = unknown> {
  ({
    request,
    env,
    context,
  }: {
    request: Request;
    env: Env;
    context: ExecutionContext;
  }): AppLoadContext;
}

interface CreateRequestHandlerParams<Env> {
  build: ServerBuild;
  getLoadContext?: GetLoadContextFunction<Env>;
  mode?: string;
}

const createRequestHandler = <Env>({
  build,
  getLoadContext,
  mode,
}: CreateRequestHandlerParams<Env>) => {
  let platform = {};
  let handleRequest = _createRequestHandler(build, platform, mode);

  return ({
    request,
    env,
    context,
  }: {
    request: Request;
    env: Env;
    context: ExecutionContext;
  }) => {
    let loadContext =
      typeof getLoadContext === "function"
        ? getLoadContext({ request, env, context })
        : undefined;
    return handleRequest(request, loadContext);
  };
};

const handleAsset = async ({
  request,
  env,
}: {
  request: Request;
  env: unknown;
}) => {
  let response = await (
    env as { ASSETS: { fetch: typeof fetch } }
  ).ASSETS.fetch(request);
  if (response.ok) {
    response = new Response(
      [101, 204, 205, 304].includes(response.status) ? null : response.body,
      response
    );
    response.headers.set(
      "cache-control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }
};

export const createFetchHandler = <Env>({
  build,
  getLoadContext,
  mode,
}: CreateRequestHandlerParams<Env>): ExportedHandlerFetchHandler<Env> => {
  const handleRequest = createRequestHandler({
    build,
    getLoadContext,
    mode,
  });

  const handleFetch = async (
    request: Request,
    env: Env,
    context: ExecutionContext
  ) => {
    const cache = await caches.open(VERSION);
    let response = await cache.match(request);
    if (response) {
      return response;
    }

    response = await handleAsset({
      request,
      env,
    });

    if (!response) {
      response = await handleRequest({ request, env, context });
    }

    context.waitUntil(cache.put(request, response.clone()));

    return response;
  };

  return async (request, env, context) => {
    try {
      return await handleFetch(request, env, context);
    } catch (thrown) {
      if (process.env.NODE_ENV === "development") {
        return new Response(`${thrown}`, {
          status: 500,
        });
      }

      return new Response("Internal Error", {
        status: 500,
      });
    }
  };
};
