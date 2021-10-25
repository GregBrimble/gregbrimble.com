import { attachClients } from "./../data/index";
import { createFetchHandler } from "./singleWorkerRemixLoader";
import type { GetLoadContextFunction } from "./singleWorkerRemixLoader";

// @ts-ignore
import * as build from "../build";

export interface Env {
  REVUE_API_TOKEN: string;
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

const handleFetch = createFetchHandler({
  build,
  getLoadContext,
});

export default {
  async fetch(
    request: Request,
    env: SingleWorker.Env<Env>,
    context: SingleWorker.Context
  ) {
    // TODO: Hack to stop glitchy browser caching
    request = new Request(request);
    request.headers.delete("If-None-Match");

    return handleFetch(request, env, context);
  },
};
