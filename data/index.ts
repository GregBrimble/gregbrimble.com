import { Env } from "functions/[[path]]";
import { Music } from "./music";
import { Newsletter } from "./newsletter";
import { Videos } from "./videos";

export interface Context {
  clients: { music: Music; newsletter: Newsletter; videos?: Videos };
}

export const attachClients = (
  context: EventContext<Env, any, any>
): Context => {
  return {
    clients: {
      music: new Music(context),
      newsletter: new Newsletter(context),
      // videos: new Videos(env.GREGBRIMBLE_COM_SECRETS),
    },
  };
};
