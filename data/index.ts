import type { Env } from "../worker";
import type { GetLoadContextFunction } from "../worker/cloudflarePagesRemixLoader";
import { Music } from "./music";
import { Newsletter } from "./newsletter";
import { Videos } from "./videos";

export interface Context {
  clients: { music: Music; newsletter: Newsletter; videos: Videos };
}

export const attachClients: GetLoadContextFunction<Env> = ({
  env,
}): Context => {
  return {
    clients: {
      music: new Music(env.LAST_FM_API_KEY),
      newsletter: new Newsletter(env.REVUE_API_TOKEN),
      videos: new Videos(env.CLOUDFLARE_API_TOKEN),
    },
  };
};
