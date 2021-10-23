declare namespace SingleWorker {
  type Env<Env = Record<string, unknown>> = Env & {
    ASSETS: { fetch: typeof fetch };
  };

  type Context = { waitUntil: (promise: Promise<void>) => void };
}
