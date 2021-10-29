import type { Env } from "../worker";
import type { GetLoadContextFunction } from "../worker/singleWorkerRemixLoader";
import { Newsletter } from "./newsletter";
import { Stream } from "./stream";

export const attachClients: GetLoadContextFunction<Env> = ({ env }) => {
  return {
    clients: {
      newsletter: new Newsletter(env.REVUE_API_TOKEN),
      music: new Stream(env.LAST_FM_API_KEY),
      stream: new Stream(env.CLOUDFLARE_API_TOKEN),
    },
  };
};
