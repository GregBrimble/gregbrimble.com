import { LoaderFunction, useLoaderData } from "remix";
import { Context } from "types";

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
      <h1 className="text-gray-900 dark:text-white">Coming soon</h1>
    </div>
  );
}
