import type {
  SessionData,
  SessionIdStorageStrategy,
  SessionStorage,
} from "@remix-run/server-runtime";
import { createSessionStorage } from "@remix-run/server-runtime";

export const createCloudflareDurableObjectSessionStorageGenerator = ({
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

export class SessionStorageDurableObject implements DurableObject {
  storage: DurableObjectStorage;

  constructor(state: DurableObjectState) {
    this.storage = state.storage;
  }

  async fetch(request: Request) {
    switch (request.method.toLowerCase()) {
      case "get": {
        const dataMap = await this.storage.list();
        if (dataMap.size === 0) return new Response(JSON.stringify(null));

        return new Response(
          JSON.stringify(Object.fromEntries(dataMap.entries()))
        );
      }
      case "post": {
        const { data, expires } = await request.json<{
          data: SessionData;
          expires: Date | undefined;
        }>();

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
