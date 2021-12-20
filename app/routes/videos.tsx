import { Context } from "data";
import { LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}) => {
  const length = await context.clients.newsletter.debug();

  return { length };
};

export default function Videos() {
  const loaderData = useLoaderData();

  return (
    <div>
      <h1>Videos</h1>
      <div>{JSON.stringify(loaderData)}</div>
    </div>
  );
}
