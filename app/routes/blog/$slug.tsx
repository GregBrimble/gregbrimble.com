import { HeadersFunction, json, useLoaderData } from "remix";
import { LoaderFunction } from "types";

export const loader: LoaderFunction = async ({ context, params }) => {
  const canonicalURL = "";

  return json(
    {},
    {
      headers: {
        Link: canonicalURL,
      },
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return loaderHeaders;
};

export default function BlogPost() {
  const data = useLoaderData();

  return <div>{JSON.stringify(data)}</div>;
}
