import {
  useLoaderData,
  Meta,
  Links,
  Scripts,
  LiveReload,
  Outlet,
  useCatch,
} from "remix";
import type { ErrorBoundaryComponent } from "remix";
import type { WithContext, Person, Brand, Organization } from "schema-dts";

import type {
  Context,
  LoaderFunction,
  LinksFunction,
  MetaFunction,
} from "types";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { GregBrimbleBrand } from "~/schema.org/GregBrimbleBrand";
import { GregBrimble } from "~/schema.org/GregBrimble";
import { GregBrimbleCom } from "~/schema.org/GregBrimbleCom";
import { useSafeLayoutEffect } from "~/utils/useSafeLayoutEffect";
import stylesUrl from "~/styles/app.css";

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
    data.isLive = (await context.clients.videos?.getLiveVideo()) !== undefined;
  } catch {
    //
  }

  return data;
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: "/fonts/inter/variable.css" },
  ];
};

export const meta: MetaFunction = () => {
  return {
    title: "Greg Brimble",
    description: "Personal website of Greg Brimble, Technological Engineer",
  };
};

const Document = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  useSafeLayoutEffect(() => {
    document.body.parentElement?.classList.remove("no-js");
  });

  return (
    <html lang="en" className="no-js">
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
      {/*
          #f43f5d = rgb(244,63,93) = rose-600
      */}
      <body className="bg-white dark:bg-gray-900 selection:bg-[rgba(244,63,93,0.3)] dark:selection:bg-[rgba(244,63,93,0.5)]">
        {children}
        <Scripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              ...Object(GregBrimbleBrand),
            } as WithContext<Brand>),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              ...Object(GregBrimble),
            } as WithContext<Person>),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              ...Object(GregBrimbleCom),
            } as WithContext<Organization>),
          }}
        />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

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

export const CatchBoundary = () => {
  const caught = useCatch();

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
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <pre>{error.stack}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
};
