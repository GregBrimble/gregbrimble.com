import { createRequestHandler as _createRequestHandler } from "@remix-run/cloudflare-workers";
import serverRuntime, {
  ServerBuild,
  AppLoadContext,
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
  let handleRequest = serverRuntime.createRequestHandler(build, platform, mode);

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
  const response = await (
    env as { ASSETS: { fetch: typeof fetch } }
  ).ASSETS.fetch(request);
  if (response.ok) return response;
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
    let response = await handleAsset({
      request,
      env,
    });

    if (!response) {
      response = await handleRequest({ request, env, context });
    }

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
