import type { ComponentType } from "react";
import { formatDate } from "~/utils/formatDate";
import { SmartLink } from "../SmartLink";

export const BlogPost = ({
  Component,
  title,
  description,
  date,
  image,
}: {
  Component: ComponentType;
  title: string;
  description: string;
  date: string;
  image: {
    url: string;
    alt?: string;
    attribution?: string;
    attribution_url?: string;
  };
}) => {
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

        <div className="mt-6 prose dark:prose-@light prose-blue dark:prose-blue@light prose-lg text-gray-500 dark:text-gray-400 mx-auto">
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

        <p className="mt-6 text-gray-500 dark:text-gray-400 mx-auto">
          <time dateTime={date}>{formatDate(date)}</time>
        </p>
      </div>
      <div className="mt-6 prose dark:prose-@light prose-blue dark:prose-blue@light prose-lg text-gray-500 dark:text-gray-400 mx-auto">
        <Component />
      </div>
    </>
  );
};
