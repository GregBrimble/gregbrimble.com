import type { ComponentType } from "react";

interface BlogAttributes {
  title: string;
  description?: string;
  image?: {
    url: string;
    attribution?: string;
  };
}

export const BlogPost = ({
  blog: {
    default: Content,
    attributes: { title, description, image },
  },
}: {
  blog: { default: ComponentType; attributes: BlogAttributes };
}) => {
  return (
    <>
      <div className="text-lg max-w-prose mx-auto">
        <h1>
          <span className="block text-base text-center text-rose-600 dark:text-rose-400 font-semibold tracking-wide uppercase">
            A blog about
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {title}
          </span>
        </h1>
        {description && (
          <p className="mt-8 text-xl text-gray-500 dark:text-gray-400 leading-8">
            {description}
          </p>
        )}
        {image && (
          <div className="mt-6 prose dark:prose-@light prose-blue dark:prose-blue@light prose-lg text-gray-500 dark:text-gray-400 mx-auto">
            <figure>
              <img
                className="w-full rounded-lg"
                src={image.url}
                alt=""
                width="1310"
                height="873"
              />
              {image.attribution && (
                <figcaption className="text-right">
                  {image.attribution}
                </figcaption>
              )}
            </figure>
          </div>
        )}
      </div>
      <div className="mt-6 prose prose-blue prose-lg text-gray-500 dark:text-gray-400 mx-auto">
        <Content />
      </div>
    </>
  );
};
