import { createRequestHandler as _createRequestHandler } from "@remix-run/cloudflare-workers";
import serverRuntime, {
  ServerBuild,
  AppLoadContext,
} from "@remix-run/server-runtime";

export interface GetLoadContextFunction<Env = Record<string, unknown>> {
  ({
    request,
    env,
    context,
  }: {
    request: Request;
    env: Env;
    context: SingleWorker.Context;
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
    context: SingleWorker.Context;
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
  env: SingleWorker.Env;
}) => {
  const response = await env.ASSETS.fetch(request);
  if (response.ok) return response;
};

export const createFetchHandler = <Env = Record<string, unknown>>({
  build,
  getLoadContext,
  mode,
}: CreateRequestHandlerParams<Env>) => {
  const handleRequest = createRequestHandler<SingleWorker.Env<Env>>({
    build,
    getLoadContext,
    mode,
  });

  const handleFetch = async (
    request: Request,
    env: SingleWorker.Env<Env>,
    context: SingleWorker.Context
  ) => {
    let response = await handleAsset({ request, env });

    if (!response) {
      response = await handleRequest({ request, env, context });
    }

    return response;
  };

  return async (
    request: Request,
    env: SingleWorker.Env<Env>,
    context: SingleWorker.Context
  ) => {
    try {
      return await handleFetch(request, env, context);
    } catch (e) {
      if (process.env.NODE_ENV === "development" && e instanceof Error) {
        return new Response(e.message || e.toString(), {
          status: 500,
        });
      }

      return new Response("Internal Error", {
        status: 500,
      });
    }
  };
};
