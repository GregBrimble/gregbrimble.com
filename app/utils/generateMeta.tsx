import moment from "moment";
import { MetaFunction } from "remix";

export const generateMeta = ({
  title,
  _title,
  description = "Personal website of Greg Brimble, Technological Engineer",
  path,
  image,
  keywords = [],
  type = "website",
  video,
  article,
  profile,
}: {
  title?: string;
  _title?: string;
  description?: string;
  path: string;
  image?: {
    url: string;
    alt?: string;
    type?: string;
    width?: number;
    height?: number;
  };
  keywords?: string[];
  type?: "video:other" | "article" | "profile" | "website";
  video?: {
    duration?: string;
    publishedDate: string;
    iframeURL: string;
    width: number;
    height: number;
  };
  article?: {
    publishedDate: string;
    modifiedDate?: string;
    authors: { name: string; url?: string }[];
  };
  profile?: {
    firstName: string;
    lastName: string;
    username?: string;
  };
}): ReturnType<MetaFunction> => {
  const generatedTitle = _title
    ? _title
    : title
    ? `${title} | Greg Brimble`
    : "Greg Brimble";
  return {
    title: generatedTitle,
    description,

    // Open Graph
    "og:title": generatedTitle,
    "og:description": description,
    "og:url": `https://gregbrimble.com${path}`,
    "og:type": type,
    "og:locale": "en_US",
    "og:site_name": "Greg Brimble",
    ...(image
      ? {
          "og:image": image.url,
          "og:image:url": image.url,
          ...(image.url.startsWith("https://")
            ? { "og:image:secure_url": image.url }
            : undefined),
          ...(image.alt ? { "og:image:alt": image.alt } : undefined),
          ...(image.type ? { "og:image:type": image.type } : undefined),
          ...(image.width
            ? { "og:image:width": image.width.toString() }
            : undefined),
          ...(image.height
            ? { "og:image:height": image.height.toString() }
            : undefined),
        }
      : undefined),
    ...(video
      ? {
          "video:release_date": video.publishedDate,
          ...(video.duration
            ? {
                "video:duration": moment
                  .duration(video.duration)
                  .as("seconds")
                  .toString(),
              }
            : undefined),
          ...(keywords ? { "video:tag": keywords } : undefined),
        }
      : undefined),
    ...(article
      ? {
          "article:published_time": article.publishedDate,
          ...(article.modifiedDate
            ? { "article:modified_time": article.modifiedDate }
            : undefined),
          ...(article.authors
            ? {
                "article:author": article.authors
                  .map((author) => author.url)
                  .filter(Boolean) as string[],
              }
            : undefined),
        }
      : undefined),
    ...(profile
      ? {
          "profile:first_name": profile.firstName,
          "profile:last_name": profile.lastName,
          ...(profile.username
            ? { "profile:username": profile.username }
            : undefined),
        }
      : undefined),

    // Twitter
    "twitter:card": video
      ? "player"
      : image
      ? "summary_large_image"
      : "summary",
    "twitter:site": "@GregBrimble",
    "twitter:creator": "@GregBrimble",
    "twitter:description": description,
    "twitter:title": generatedTitle,
    ...(image
      ? {
          "twitter:image": image.url,
          ...(image.alt ? { "twitter:image:alt": image.alt } : undefined),
        }
      : {
          "twitter:image": "https://gregbrimble.com/logo.png",
        }),
    ...(video
      ? {
          "twitter:player": video.iframeURL,
          "twitter:player:width": video.width.toString(),
          "twitter:player:height": video.height.toString(),
        }
      : undefined),

    keywords: keywords.join(", "),
    author: article?.authors.map((author) => author.name) || "Greg Brimble",
  };
};
