import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useCatch,
  useLoaderData,
  useLocation,
} from "remix";
import type { ErrorBoundaryComponent } from "remix";
import type { Brand, Organization, Person, WithContext } from "schema-dts";

import type {
  Context,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "~/types";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { GregBrimbleBrand } from "~/content/schema.org/GregBrimbleBrand";
import { GregBrimble } from "~/content/schema.org/GregBrimble";
import { GregBrimbleCom } from "~/content/schema.org/GregBrimbleCom";
import { useSafeLayoutEffect } from "~/utils/useSafeLayoutEffect";
import { NotFound } from "~/components/NotFound";
import { UnexpectedError } from "~/components/UnexpectedError";
import stylesUrl from "~/styles/dist.css";

interface LoaderData {
  isLive: boolean;
  nextLive?: { start: string; end: string };
}

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}): Promise<LoaderData> => {
  const data: LoaderData = {
    isLive: false,
  };

  try {
    data.isLive = (await context.clients.videos.getLiveVideo()) !== undefined;
  } catch {}

  try {
    const schedule = await context.clients.videos.getSchedule();
    if (schedule && schedule.length > 0) {
      data.nextLive = schedule[0];
    }
  } catch {}

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
  const { isLive, nextLive } = useLoaderData<LoaderData>();

  return (
    <Document>
      <Header isLive={isLive} nextLive={nextLive} />
      <Outlet />
      <Footer />
    </Document>
  );
}

export const CatchBoundary = () => {
  const caught = useCatch();

  switch (caught.status) {
    case 404:
      return (
        <Document title="Not Found | Greg Brimble">
          <Header />
          <NotFound />
          <Footer />
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
};

export const ErrorBoundary: ErrorBoundaryComponent = ({
  error,
}: {
  error: Error;
}) => {
  return (
    <Document title="Unexpected Error | Greg Brimble">
      <Header />

      <UnexpectedError error={error} />

      <Footer />
    </Document>
  );
};
