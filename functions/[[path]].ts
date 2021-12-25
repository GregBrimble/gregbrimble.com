// https://github.com/remix-run/remix/pull/1237
// import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import { createPagesFunctionHandler } from "./worker";
import { attachClients } from "data";
import { Context } from "types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as build from "../build";

export interface Env {
  KV: KVNamespace;
}

export const onRequest: PagesFunction<Env, any, any> = async (...args) => {
  const response = await createPagesFunctionHandler({
    build,
    getLoadContext: (context): Context => {
      return {
        ...attachClients(context),
      };
    },
  })(...args);

  return response;
};
