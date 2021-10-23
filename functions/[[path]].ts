import { createContextHandler } from "../worker/plinkoRemixLoader";

// @ts-ignore
import * as build from "../build";

export const onRequest: Plinko.onRequest = createContextHandler({
  build,
});
