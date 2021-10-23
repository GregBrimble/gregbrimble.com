declare namespace Plinko {
  interface Context<Env = unknown, Params = unknown, Data = unknown> {
    request: Request;
    env: Env;
    params: Params;
    waitUntil: (promise: Promise<void>) => void;
    next: () => Promise<Response>;
    data: Data;
  }

  type onRequest<Env = unknown, Params = unknown, Data = unknown> = (
    context: Context<Env, Params, Data>
  ) => Promise<Response>;
  type onRequestGet<Env = unknown, Params = unknown, Data = unknown> = (
    context: Context<Env, Params, Data>
  ) => Promise<Response>;
  type onRequestPost<Env = unknown, Params = unknown, Data = unknown> = (
    context: Context<Env, Params, Data>
  ) => Promise<Response>;
  type onRequestPut<Env = unknown, Params = unknown, Data = unknown> = (
    context: Context<Env, Params, Data>
  ) => Promise<Response>;
  type onRequestPatch<Env = unknown, Params = unknown, Data = unknown> = (
    context: Context<Env, Params, Data>
  ) => Promise<Response>;
  type onRequestDelete<Env = unknown, Params = unknown, Data = unknown> = (
    context: Context<Env, Params, Data>
  ) => Promise<Response>;
  type onRequestHead<Env = unknown, Params = unknown, Data = unknown> = (
    context: Context<Env, Params, Data>
  ) => Promise<Response>;
  type onRequestOptions<Env = unknown, Params = unknown, Data = unknown> = (
    context: Context<Env, Params, Data>
  ) => Promise<Response>;
}
