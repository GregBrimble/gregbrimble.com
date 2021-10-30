import {
  useLoaderData,
  Meta,
  Links,
  Scripts,
  LiveReload,
  Outlet,
  useCatch,
} from "remix";
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";
import type { Context } from "../data";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

import stylesUrl from "./styles/app.css";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: "/fonts/inter/variable.css" },
  ];
};

export const meta: MetaFunction = () => {
  return {
    title: "Greg Brimble",
  };
};

interface LoaderData {
  isLive: boolean;
}

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}): Promise<LoaderData> => {
  const data = {
    isLive: false,
  };

  try {
    data.isLive = (await context.clients.videos.getLiveVideo()) !== undefined;
  } catch {}

  return data;
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="bg-white dark:bg-gray-900 selection:bg-rose-100 dark:selection:bg-rose-800">
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const { isLive } = useLoaderData<LoaderData>();

  return (
    <Document>
      <Header isLive={isLive} />
      <Outlet />
      <Footer />
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
