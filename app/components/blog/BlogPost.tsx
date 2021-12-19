import { ComponentType } from "react";
import type { WithContext, BlogPosting } from "schema-dts";
import { GregBrimble } from "~/schema.org/GregBrimble";
import { GregBrimbleBlog } from "~/schema.org/GregBrimbleBlog";
import { formatDate } from "~/utils/formatDate";
import { SmartLink } from "../SmartLink";
import { CodeBlock } from "../CodeBlock";
import { Markdown } from "../Markdown";

export const BlogPost = ({
  Component,
  slug,
  title,
  description,
  date,
  image,
  authors,
}: {
  Component: ComponentType;
  slug: string;
  title: string;
  description: string;
  date: string;
  image: {
    url: string;
    alt?: string;
    attribution?: string;
    attribution_url?: string;
  };
  authors: {
    name: string;
    url?: string;
  }[];
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
    // TODO: Organization Authors
    author: authors.map((author) =>
      author.name === "Greg Brimble"
        ? { "@id": GregBrimble["@id"] }
        : {
            "@type": "Person",
            name: author.name,
            url: author.url,
          }
    ),
    // TODO: copyrightHolder
    // TODO: copyrightNotice
    copyrightYear: new Date(date).getFullYear(),
    // TODO: creditText
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
    // TODO: publisher
    description,
    identifier: url,
    image: {
      "@type": "ImageObject",
      caption: image.alt,
      copyrightHolder: image.attribution,
      copyrightNotice: `${image.attribution} (${image.attribution_url})`,
      creditText: `${image.attribution} (${image.attribution_url})`,
      url: image.url,
    },
    mainEntityOfPage: url,
    name: title,
    url,
  };

  return (
    <>
      <div className="text-lg max-w-prose mx-auto">
        <h1>
          <span className="block text-base text-center text-rose-600 dark:text-rose-300 font-semibold tracking-wide uppercase">
            A blog post about
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </span>
        </h1>

        <p className="mt-8 text-xl text-gray-500 dark:text-gray-400 leading-8">
          {description}
        </p>

        <div className="mt-6 prose dark:prose-invert prose-lg mx-auto">
          <figure>
            <img
              className="w-full rounded-lg"
              src={image.url}
              alt={image.alt || ""}
              width="1310"
              height="873"
            />
            {image.attribution && (
              <figcaption className="text-right">
                {image.attribution_url ? (
                  <SmartLink href={image.attribution_url}>
                    {image.attribution}
                  </SmartLink>
                ) : (
                  image.attribution
                )}
              </figcaption>
            )}
          </figure>
        </div>

        {authors.length > 1 && (
          <p className="mt-6 text-gray-500 dark:text-gray-400 mx-auto">
            {authors.map((author, index) => (
              <span key={author.name}>
                <SmartLink href={author.url} rel="author" className="underline">
                  {author.name}
                </SmartLink>
                {index < authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}

        <p className="mt-6 text-gray-500 dark:text-gray-400 mx-auto">
          <time dateTime={new Date(date).toISOString()}>
            {formatDate(date)}
          </time>
        </p>
      </div>
      <article className="mt-6 prose dark:prose-invert prose-lg mx-auto">
        <Markdown contents={Component} />
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
    </>
  );
};
