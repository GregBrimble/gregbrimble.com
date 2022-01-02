import { Link } from "remix";
import type { BlogPosting, WithContext } from "schema-dts";
import { GregBrimble } from "~/content/schema.org/GregBrimble";
import { GregBrimbleBlog } from "~/content/schema.org/GregBrimbleBlog";
import { GregBrimbleCom } from "~/content/schema.org/GregBrimbleCom";
import { formatDate } from "~/utils/formatDate";
import { ExternalLink } from "../ExternalLink";

export const NewsletterIssue = ({
  slug,
  title,
  description,
  publishedDate,
  html,
  previous,
  next,
  keywords = [],
}: {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  html: string;
  previous?: {
    title: string;
    date: string;
    url: string;
  };
  next?: {
    title: string;
    date: string;
    url: string;
  };
  keywords?: string[];
}) => {
  const url = `https://gregbrimble.com/blog/${slug}`;

  const jsonLD: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    // TODO: articleBody
    // TODO: speakable
    // TODO: wordCount
    abstract: description,
    // TODO: accessMode
    // TODO: accessModeSufficient
    accountablePerson: {
      "@id": GregBrimble["@id"],
    },

    author: { "@id": GregBrimble["@id"] },
    copyrightHolder: {
      "@id": GregBrimbleCom["@id"],
    },
    copyrightNotice: "© 2021 gregbrimble.com. All rights reserved.",
    copyrightYear: new Date(publishedDate).getFullYear(),
    creditText: "© 2021 gregbrimble.com. All rights reserved.",
    dateCreated: publishedDate,
    dateModified: publishedDate,
    datePublished: publishedDate,
    headline: title,
    inLanguage: "en-US",
    // TODO: interactionStatistic
    // TODO: interactivityType
    isAccessibleForFree: "https://schema.org/True",
    isPartOf: {
      "@id": GregBrimbleBlog["@id"],
    },
    keywords: ["Greg Brimble", "newsletter", "blog post", ...keywords],
    // TODO: license
    publisher: {
      "@id": GregBrimbleCom["@id"],
    },
    description,
    identifier: url,
    mainEntityOfPage: url,
    name: title,
    url,
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <main>
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-rose-600 dark:text-rose-300 font-semibold tracking-wide uppercase">
              A newsletter issue about
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </span>
          </h1>

          <p className="mt-8 text-xl text-gray-500 dark:text-gray-400 leading-8">
            {description}
          </p>

          <p className="mt-6 text-gray-500 dark:text-gray-400 mx-auto">
            <time dateTime={new Date(publishedDate).toISOString()}>
              {formatDate(publishedDate)}
            </time>
          </p>
        </div>
        <article
          className="mt-6 prose dark:prose-invert prose-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        ></article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
      </main>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="px-6 py-6 bg-blue-700 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Want to stay updated?
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-blue-200">
              Sign up for my newsletter to recieve notifications about new
              posts.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form
              className="sm:flex"
              action="https://newsletter.gregbrimble.com/add_subscriber"
              method="post"
              name="revue-form"
              target="_blank"
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="member[email]"
                type="email"
                autoComplete="email"
                required
                className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white rounded-md"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                name="member[subscribe]"
                className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                Notify me
              </button>
            </form>
            <p className="mt-3 text-sm text-blue-200">
              By subscribing, you agree with Revue&apos;s{" "}
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
            </p>
          </div>
        </div>
      </div>

      <nav className="prose dark:prose-invert prose-lg mx-auto">
        <div className="not-prose flex flex-col sm:flex-row gap-y-12 gap-x-4 justify-between">
          {next ? (
            <Link to={next.url} className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={new Date(next.date).toISOString()}>
                  {formatDate(next.date)}
                </time>
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                &larr; {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {previous ? (
            <Link to={previous.url} className="flex-1 sm:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={new Date(previous.date).toISOString()}>
                  {formatDate(previous.date)}
                </time>
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                {previous.title} &rarr;
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
};
