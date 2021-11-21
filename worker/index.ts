import { attachClients } from "./../data/index";
import { createFetchHandler } from "./singleWorkerRemixLoader";
import type { GetLoadContextFunction } from "./singleWorkerRemixLoader";

// @ts-ignore
import * as build from "../build";

export interface Env {
  REVUE_API_TOKEN: string;
  LAST_FM_API_KEY: string;
  CLOUDFLARE_API_TOKEN: string;
}

const getLoadContext: GetLoadContextFunction<Env> = ({
  request,
  env,
  context,
}) => {
  return {
    ...attachClients({ request, env, context }),
  };
};

const handleFetch: ExportedHandlerFetchHandler<Env> = createFetchHandler({
  build,
  getLoadContext,
});

export default {
  // TODO: Hack to stop glitchy browser caching
  // Will ordinarily just be able to export handleFetch like so
  // fetch: handleFetch,

  async fetch(
    request: Request,
    env: Env & { ASSETS: { fetch: typeof fetch } },
    context: ExecutionContext
  ) {
    request = new Request(request);
    request.headers.delete("If-None-Match");

    return handleFetch(request, env, context);
  },
};
