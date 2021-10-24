import { createFetchHandler } from "./singleWorkerRemixLoader";

// @ts-ignore
import * as build from "../build";

const handleFetch = createFetchHandler({
  build,
  getLoadContext: () => ({
    token: "Greg",
  }),
});

export default {
  async fetch(
    request: Request,
    env: SingleWorker.Env,
    context: SingleWorker.Context
  ) {
    // TODO: Hack to stop glitchy browser caching
    request = new Request(request);
    request.headers.delete("If-None-Match");

    return handleFetch(request, env, context);
  },
};
