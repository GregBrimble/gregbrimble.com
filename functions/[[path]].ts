import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import { attachClients } from "data";

// @ts-ignore
import * as build from "../build";

export interface Env {
  KV: KVNamespace;
}

export const onRequest: PagesFunction<Env, any, any> =
  createPagesFunctionHandler({
    build,
    getLoadContext: (context) => {
      return {
        ...attachClients(context),
      };
    },
  });
