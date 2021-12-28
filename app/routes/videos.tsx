import { LoaderFunction, useLoaderData } from "remix";
import { Context } from "~/types";

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}) => {
  return {
    schedule: await context.clients.videos.getSchedule(),
  };
};

export default function Videos() {
  const data = useLoaderData();

  console.log(data);

  return (
    <div>
      <h1 className="text-gray-900 dark:text-white">Coming soon</h1>
    </div>
  );
}
