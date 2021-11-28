import { attachClients } from "./../data/index";
import { createFetchHandler } from "./cloudflarePagesRemixLoader";
import type { GetLoadContextFunction } from "./cloudflarePagesRemixLoader";
import { SessionStorageDurableObject } from "./cloudflareDurableObjectSessionStorageGenerator";
import { createCloudflareDurableObjectSessionStorageGenerator } from "./cloudflareDurableObjectSessionStorageGenerator";

// @ts-ignore
import * as build from "../build";

export interface Env {
  REVUE_API_TOKEN: string;
  LAST_FM_API_KEY: string;
  CLOUDFLARE_API_TOKEN: string;
  SESSIONS_KV: KVNamespace;
  SESSIONS_DO: DurableObjectNamespace;
}

const getLoadContext: GetLoadContextFunction<Env> = ({
  request,
  env,
  context,
}) => {
  const sessionStorage = createCloudflareDurableObjectSessionStorageGenerator({
    durableObjectNamespace: env.SESSIONS_DO,
  });
  return {
    sessionStorage,
    ...attachClients({ request, env, context }),
  };
};

const handleFetch: ExportedHandlerFetchHandler<Env> = createFetchHandler({
  build,
  getLoadContext,
  mode: process.env.NODE_ENV,
});

export default {
  fetch: (request: Request, env: Env, context: ExecutionContext) => {
    request = new Request(request);
    request.headers.delete("if-none-match");
    return handleFetch(request, env, context);
  },
};

export { SessionStorageDurableObject };
