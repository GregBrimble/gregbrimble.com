import { LoaderFunction, useLoaderData, SessionStorage, json } from "remix";

export const loader: LoaderFunction = async ({ context, request }) => {
  const { getSession, commitSession, destroySession } =
    context.sessionStorage as SessionStorage;

  const session = await getSession(request.headers.get("Cookie"));

  console.log(session.id);

  const count = (session.get("count") || 0) + 1;

  session.set("count", count);

  return json(
    { count },
    {
      headers: {
        "Set-Cookie": await commitSession(session, {
          expires: new Date(new Date().getTime() + 1000 * 30),
        }),
      },
    }
  );
};

export default function () {
  const data = useLoaderData();
  return <div>{JSON.stringify(data)}</div>;
}
