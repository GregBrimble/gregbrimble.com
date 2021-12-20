import { Context } from "data";
import { LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}) => {
  return {};
};

export default function Videos() {
  return (
    <div>
      <h1 className="text-white">Coming soon</h1>
    </div>
  );
}
