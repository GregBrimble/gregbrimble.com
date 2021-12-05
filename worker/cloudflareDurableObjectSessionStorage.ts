import type {
  SessionData,
  SessionIdStorageStrategy,
  SessionStorage,
} from "@remix-run/server-runtime";
import { createSessionStorage } from "@remix-run/server-runtime";

export const createCloudflareDurableObjectSessionStorage = ({
  cookie,
  durableObjectNamespace,
}: {
  cookie?: SessionIdStorageStrategy["cookie"];
  durableObjectNamespace: DurableObjectNamespace;
}) => {
  return createSessionStorage({
    cookie,
    createData: async (data, expires) => {
      const hexId = durableObjectNamespace.newUniqueId();
      const durableObject = durableObjectNamespace.get(hexId);

      await durableObject.fetch("http://fakehost/", {
        method: "POST",
        body: JSON.stringify({ data, expires }),
      });

      return hexId.toString();
    },
    readData: async (id) => {
      const hexId = durableObjectNamespace.idFromString(id);
      const durableObject = durableObjectNamespace.get(hexId);

      const response = await durableObject.fetch("http://fakehost/");
      const data = await response.json<SessionStorage | null>();

      return data;
    },
    updateData: async (id, data, expires) => {
      const hexId = durableObjectNamespace.idFromString(id);
      const durableObject = durableObjectNamespace.get(hexId);

      await durableObject.fetch("http://fakehost/", {
        method: "POST",
        body: JSON.stringify({ data, expires }),
      });
    },
    deleteData: async (id) => {
      const hexId = durableObjectNamespace.idFromString(id);
      const durableObject = durableObjectNamespace.get(hexId);

      await durableObject.fetch("http://fakehost/", {
        method: "DELETE",
      });
    },
  });
};

const EXPIRES_KEY = "__expires";

export class SessionStorageDurableObject implements DurableObject {
  storage: DurableObjectStorage;

  constructor(state: DurableObjectState) {
    this.storage = state.storage;
  }

  async fetch(request: Request) {
    switch (request.method.toLowerCase()) {
      case "get": {
        const dataMap = await this.storage.list();
        const expires = dataMap.get(EXPIRES_KEY) as Date | undefined;

        if (expires && expires < new Date()) {
          await this.storage.deleteAll();
          return new Response(JSON.stringify(null));
        }

        if (dataMap.size === 0 || (expires !== undefined && dataMap.size === 1))
          return new Response(JSON.stringify(null));

        const entries = [...dataMap.entries()].filter(
          ([key]) => key !== EXPIRES_KEY
        ) as [string, SessionData][];

        return new Response(JSON.stringify(Object.fromEntries(entries)));
      }
      case "post": {
        const { data, expires } = await request.json<{
          data: SessionData;
          expires: Date | undefined;
        }>();

        await this.storage.deleteAll();
        if (expires !== undefined) await this.storage.put(EXPIRES_KEY, expires);
        await this.storage.put(data);

        return new Response();
      }
      case "delete": {
        await this.storage.deleteAll();
        return new Response();
      }
    }

    return new Response(null, { status: 405 });
  }
}
