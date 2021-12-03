import type { SessionIdStorageStrategy } from "@remix-run/server-runtime";
import { createCloudflareKVSessionStorage } from "remix";
import { createCloudflareDurableObjectSessionStorage } from "./cloudflareDurableObjectSessionStorage";

export const createCloudflareSessionStorage = ({
  cookie,
  ...storage
}:
  | {
      cookie?: SessionIdStorageStrategy["cookie"];
      durableObjectNamespace: DurableObjectNamespace;
    }
  | {
      cookie?: SessionIdStorageStrategy["cookie"];
      kv: KVNamespace;
    }) => {
  if ("kv" in storage) {
    return createCloudflareKVSessionStorage({ cookie, kv: storage.kv });
  } else if ("durableObjectNamespace" in storage) {
    return createCloudflareDurableObjectSessionStorage({
      cookie,
      durableObjectNamespace: storage.durableObjectNamespace,
    });
  }

  throw new Error(
    "You must specify either a KV namespace or Durable Object namespace when creating session storage."
  );
};
