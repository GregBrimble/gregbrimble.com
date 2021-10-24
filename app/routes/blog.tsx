import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction, AppLoadContext } from "remix";
import { Decoration } from "~/components/blog/Decoration";
import { usePathname } from "~/utils/usePathname";

import { indexLoader as initialization } from "./blog/initialization";

const IS_BLOG_POST_REGEXP = /^\/blog\/.+/i;

interface Writing {
  to: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export type IndexLoader = (context: AppLoadContext) => Promise<Writing>;

const posts = [
  {
    title: "Boost your conversion rate",
    to: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
  },
  {
    title: "How to use search engine optimization to drive sales",
    to: "#",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
  },
  {
    title: "Improve your customer experience",
    to: "#",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
  },
];

export const loader: LoaderFunction = async ({ context }) => {
  initialization(context);

  return [];
};

const BlogIndex = () => {
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
          {posts.map((post) => (
            <div key={post.title}>
              <Link to={post.to}>
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    className="object-cover shadow-lg rounded-lg"
                    src="http://localhost:4000/build/_assets/banner-75T4H25Z.jpg"
                    alt=""
                  />
                </div>
              </Link>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <Link to={post.to}>
                  <time dateTime={post.datetime}>{post.date}</time>
                </Link>
              </p>
              <Link to={post.to} className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </p>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  {post.description}
                </p>
              </Link>
              <div className="mt-3">
                <Link
                  to={post.to}
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
