import { LoaderFunction, useLoaderData, useParams } from "remix";
import { Stream } from "@cloudflare/stream-react";

interface LoaderData {
  ok: boolean;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  const response = await fetch(`https://iframe.videodelivery.net/${slug}`);

  if (response.status === 404) {
    throw new Response(null, { status: 404 });
  }

  return null;
};

export default function Video() {
  const slug = useParams().slug as string;

  return (
    <div className="max-w-6xl mx-auto">
      <Stream controls src={slug} />
    </div>
  );
}
