import { createRequestHandler as _createRequestHandler } from "@remix-run/cloudflare-workers";
import serverRuntime, {
  ServerBuild,
  AppLoadContext,
} from "@remix-run/server-runtime";

interface GetLoadContextFunction {
  (context: Plinko.Context): AppLoadContext;
}

interface CreateRequestHandlerParams {
  build: ServerBuild;
  getLoadContext?: GetLoadContextFunction;
  mode?: string;
}

const createRequestHandler = <
  Env = Record<string, unknown>,
  Params = unknown,
  Data = unknown
>({
  build,
  getLoadContext,
  mode,
}: CreateRequestHandlerParams) => {
  let platform = {};
  let handleRequest = serverRuntime.createRequestHandler(build, platform, mode);

  return (context: Plinko.Context) => {
    let loadContext =
      typeof getLoadContext === "function"
        ? getLoadContext(context)
        : undefined;
    return handleRequest(context.request, loadContext);
  };
};

const handleAsset = async (context: Plinko.Context) => {
  const response = await context.next();
  if (response.ok) return response;
};

export const createContextHandler = <
  Env = Record<string, unknown>,
  Params = unknown,
  Data = unknown
>({
  build,
  getLoadContext,
  mode,
}: CreateRequestHandlerParams) => {
  const handleRequest = createRequestHandler({
    build,
    getLoadContext,
    mode,
  });

  const handleContext = async (context: Plinko.Context<Env, Params, Data>) => {
    let response = await handleAsset(context);

    if (!response) {
      response = await handleRequest(context);
    }

    return response;
  };

  return async (context: Plinko.Context<Env, Params, Data>) => {
    try {
      return await handleContext(context);
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
