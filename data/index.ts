import { Env } from "functions/[[path]]";
import { Music } from "./music";
import { Newsletter } from "./newsletter";
import { Videos } from "./videos";

export interface Context {
  clients: { music: Music; newsletter: Newsletter; videos?: Videos };
}

export const attachClients = ({ env }: { env: Env }): Context => {
  return {
    clients: {
      music: new Music(env.GREGBRIMBLE_COM_SECRETS),
      newsletter: new Newsletter(env.GREGBRIMBLE_COM_SECRETS),
      // videos: new Videos(env.GREGBRIMBLE_COM_SECRETS),
    },
  };
};
