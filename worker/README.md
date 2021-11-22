# Cloudflare Pages Remix Loader

[./cloudflarePagesRemixLoader.ts](./cloudflarePagesRemixLoader.ts) is a Remix adapter for Cloudflare Pages.

You need to produce a bundled `_worker.js` in your public directory with the following:

```typescript
import { createFetchHandler } from "./cloudflarePagesRemixLoader";
import type { GetLoadContextFunction } from "./cloudflarePagesRemixLoader";

// @ts-ignore
import * as build from "../build";

export interface Env {
  MY_KV_NAMESPACE: KVNamespace;
}

const getLoadContext: GetLoadContextFunction<Env> = ({
  request,
  env,
  context,
}) => {
  return {
    user: request.headers.get("email"),
    MY_KV_NAMESPACE: env.MY_KV_NAMESPACE,
    // etc.
  };
};

const handleFetch: ExportedHandlerFetchHandler<Env> = createFetchHandler({
  build,
  getLoadContext,
  mode: process.env.NODE_ENV, // Replace with esbuild during the build step
});

export default {
  fetch: handleFetch,
};
```

## Build step

I use the following command to bundle the Worker into `public/_worker.js` for production:

```sh
esbuild worker/index.ts --bundle --outfile=public/_worker.js --format=esm --define:process.env.NODE_ENV=\"'production'\" --minify
```

## To-Do List

- [ ] Caching
- [ ] KV
- [ ] Durable Objects
