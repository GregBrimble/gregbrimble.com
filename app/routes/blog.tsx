import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction, AppLoadContext } from "remix";
import { Decoration } from "~/components/blog/Decoration";
import { usePathname } from "~/utils/usePathname";
import { formatDate } from "~/utils/formatDate";

import { indexLoader as initialization } from "./blog/initialization";
import { indexLoader as optimizingImages } from "./blog/optimizing-images";

const IS_BLOG_POST_REGEXP = /^\/blog\/.+/i;

interface Writing {
  to: string;
  title: string;
  date: string;
  description: string;
  image?: {
    url: string;
    alt?: string;
    attribution?: string;
  };
}

export type IndexLoader = (context: AppLoadContext) => Promise<Writing>;

const posts = [initialization, optimizingImages];

export const loader: LoaderFunction = async ({ context }) => {
  const loadedPosts = await Promise.all(posts.map((post) => post(context)));
  return loadedPosts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

const BlogIndex = () => {
  const writings: Writing[] = useLoaderData();

  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 dark:divide-gray-700 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            From the blog
          </h2>
          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              A collection of posts primarily about technology.
            </p>
            <form
              className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end"
              action="https://newsletter.gregbrimble.com/add_subscriber"
              method="post"
              name="revue-form"
              target="_blank"
            >
              <div>
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
            </form>
          </div>
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {writings.map((writing) => (
            <div key={writing.title}>
              {writing.image && (
                <Link to={writing.to}>
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      className="object-cover shadow-lg rounded-lg"
                      src={writing.image.url}
                      alt={writing.image.alt || ""}
                    />
                  </div>
                </Link>
              )}
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <Link to={writing.to}>
                  <time dateTime={writing.date}>
                    {formatDate(writing.date)}
                  </time>
                </Link>
              </p>
              <Link to={writing.to} className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {writing.title}
                </p>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  {writing.description}
                </p>
              </Link>
              <div className="mt-3">
                <Link
                  to={writing.to}
                  className="text-base font-semibold text-blue-600 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Read the full post
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  const pathname = usePathname();

  const isBlogPost = IS_BLOG_POST_REGEXP.test(pathname);

  if (isBlogPost) {
    return (
      <div className="relative py-16 overflow-hidden">
        <Decoration />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    );
  }

  return <BlogIndex />;
}
