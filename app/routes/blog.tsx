import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction, AppLoadContext } from "remix";
import type { WithContext, Blog } from "schema-dts";
import MailIcon from "@heroicons/react/solid/MailIcon";
import { Decoration } from "~/components/blog/Decoration";
import { usePathname } from "~/utils/usePathname";
import { formatDate } from "~/utils/formatDate";
import { ExternalLink } from "~/components/ExternalLink";
import type { Context } from "../../data";

import { indexLoader as initialization } from "./blog/initialization";
import { indexLoader as optimizingImages } from "./blog/optimizing-images";
import { indexLoader as customHeadersForPages } from "./blog/custom-headers-for-pages";
import { indexLoader as cloudflareImagesAndCloudflarePages } from "./blog/cloudflare-images-and-cloudflare-pages";
import { indexLoader as buildingFullStackWithPages } from "./blog/building-full-stack-with-pages";
import { GregBrimbleBlog } from "~/schema.org/GregBrimbleBlog";

const IS_BLOG_POST_REGEXP = /^\/blog\/.+/i;

interface BlogPost {
  type: "BlogPost";
  to: string;
  title: string;
  description: string;
  date: string;
  image: {
    url: string;
    alt?: string;
    attribution?: string;
  };
}
interface NewsletterIssue {
  type: "NewsletterIssue";
  to: string;
  title: string;
  description: string;
  date: string;
}

type Writing = BlogPost | NewsletterIssue;

export type IndexLoader = (context: Context) => Promise<Writing>;

const posts = [
  initialization,
  optimizingImages,
  customHeadersForPages,
  cloudflareImagesAndCloudflarePages,
  buildingFullStackWithPages,
];

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}) => {
  const loadedWritings = (
    await Promise.allSettled(posts.map((post) => post(context)))
  )
    .map((promise) =>
      promise.status === "fulfilled" ? promise.value : undefined
    )
    .filter((writing) => writing !== undefined) as Writing[];

  return loadedWritings.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

const BlogIndex = () => {
  const writings: Writing[] = useLoaderData();

  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 dark:divide-gray-700 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Writings
          </h2>
          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              A collection of articles primarily about technology.
            </p>
            <form
              className="mt-6 lg:mt-0"
              action="https://newsletter.gregbrimble.com/add_subscriber"
              method="post"
              name="revue-form"
              target="_blank"
            >
              <div className="flex flex-col sm:flex-row lg:justify-end">
                <div className="flex-1 lg:flex-initial">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="member[email]"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-base rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 lg:max-w-xs"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                  <input
                    type="submit"
                    value="Notify me"
                    name="member[subscribe]"
                    className="w-full bg-blue-600 dark:bg-blue-300 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white dark:text-gray-900 hover:bg-blue-700 dark:hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:w-auto sm:inline-flex cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-4 sm:mt-2 text-sm text-gray-500 dark:text-gray-400 lg:text-right">
                By subscribing, you agree with Revue’s{" "}
                <ExternalLink
                  href="https://www.getrevue.co/terms"
                  className="underline"
                >
                  Terms of Service
                </ExternalLink>{" "}
                and{" "}
                <ExternalLink
                  href="https://www.getrevue.co/privacy"
                  className="underline"
                >
                  Privacy Policy
                </ExternalLink>
                .
              </div>
            </form>
          </div>
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {writings.map((writing) => (
            <Link to={writing.to} key={writing.title}>
              {writing.type === "BlogPost" ? (
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    className="object-cover shadow-lg rounded-lg"
                    src={writing.image.url}
                    alt={writing.image.alt || ""}
                  />
                </div>
              ) : (
                <div className="hidden lg:block aspect-w-3 aspect-h-2">
                  <div className="shadow-lg rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center">
                    <MailIcon className="mx-auto w-28 h-28 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              )}
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={writing.date}>{formatDate(writing.date)}</time>
              </p>
              <div className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {writing.title}
                </p>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  {writing.description}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-base font-semibold text-blue-600 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400">
                  Read the full article
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  const pathname = usePathname();

  const isBlogPost = IS_BLOG_POST_REGEXP.test(pathname);

  return (
    <>
      {isBlogPost ? (
        <div className="relative py-16 overflow-hidden">
          <Decoration />
          <div className="relative px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      ) : (
        <BlogIndex />
      )}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          ...Object(GregBrimbleBlog),
        } as WithContext<Blog>)}
      </script>
    </>
  );
}
