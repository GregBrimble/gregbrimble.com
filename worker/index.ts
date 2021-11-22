import { attachClients } from "./../data/index";
import { createFetchHandler } from "./cloudflarePagesRemixLoader";
import type { GetLoadContextFunction } from "./cloudflarePagesRemixLoader";

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
  mode: process.env.NODE_ENV,
});

export default {
  fetch: handleFetch,
};
