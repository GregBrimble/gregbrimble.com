import { GetLoadContextFunction } from "../worker/singleWorkerRemixLoader";
import { Newsletter } from "./newsletter";

export const attachClients: GetLoadContextFunction = ({
  request,
  env,
  context,
}) => ({
  newsletter: new Newsletter("tokenfromenv"),
});
