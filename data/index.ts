import type { Env } from "../worker";
import type { GetLoadContextFunction } from "../worker/singleWorkerRemixLoader";
import { Newsletter } from "./newsletter";

export const attachClients: GetLoadContextFunction<Env> = ({ env }) => {
  return {
    clients: {
      newsletter: new Newsletter(env.REVUE_API_TOKEN),
    },
  };
};
