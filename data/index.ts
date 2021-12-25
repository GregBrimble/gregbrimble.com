import { Env } from "functions/[[path]]";
import { Music } from "./music";
import { Newsletter } from "./newsletter";

export const attachClients = (context: EventContext<Env, any, any>) => {
  return {
    clients: {
      music: new Music(context),
      newsletter: new Newsletter(context),
      // videos: new Videos(env.GREGBRIMBLE_COM_SECRETS),
    },
  };
};
