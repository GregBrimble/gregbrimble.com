import type { WithContext, BlogPosting } from "schema-dts";
import { GregBrimble } from "~/schema.org/GregBrimble";
import { GregBrimbleBlog } from "~/schema.org/GregBrimbleBlog";
import { GregBrimbleCom } from "~/schema.org/GregBrimbleCom";
import { formatDate } from "~/utils/formatDate";

export const NewsletterIssue = ({
  slug,
  title,
  description,
  date,
  html,
}: {
  slug: string;
  title: string;
  description: string;
  date: string;
  html: string;
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
    copyrightYear: new Date(date).getFullYear(),
    creditText: "© 2021 gregbrimble.com. All rights reserved.",
    dateCreated: date,
    // TODO: dateModified
    datePublished: date,
    headline: title,
    inLanguage: "en-US",
    // TODO: interactionStatistic
    // TODO: interactivityType
    isAccessibleForFree: "https://schema.org/True",
    isPartOf: {
      "@id": GregBrimbleBlog["@id"],
    },
    // TODO: keywords
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
    <>
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
          <time dateTime={new Date(date).toISOString()}>
            {formatDate(date)}
          </time>
        </p>
      </div>
      <article
        className="mt-6 prose dark:prose-@light prose-blue dark:prose-blue@light prose-lg text-gray-500 dark:text-gray-400 mx-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      ></article>
      <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
    </>
  );
};
