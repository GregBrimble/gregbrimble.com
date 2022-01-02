import type { LinksFunction, MetaFunction } from "remix";
import type { ComponentType } from "react";
import { BlogPost } from "~/components/blog/BlogPost";
import { IndexLoader } from "~/routes/blog";
import { generateMeta } from "../generateMeta";

interface BlogPostAttributes {
  slug: string;
  title: string;
  description: string;
  status?: "draft" | "published";
  published_date: string;
  modified_date?: string;
  canonical_url?: string;
  image: {
    alt?: string;
    attribution?: string;
    attribution_url?: string;
  };
  authors?: {
    name: string;
    url?: string;
  }[];
  keywords?: string[];
}

interface BlogPostComponent {
  default: ComponentType;
  attributes: BlogPostAttributes;
}

export const generateBlogPost = (
  blogPost: BlogPostComponent,
  imageURL: string
) => {
  const {
    attributes: {
      slug,
      title,
      description,
      status = "published",
      published_date: publishedDate,
      modified_date: modifiedDate,
      canonical_url: canonicalURL,
      image: dehydatedImage,
      authors = [{ name: "Greg Brimble", url: "https://gregbrimble.com/" }],
      keywords = [],
    },
  } = blogPost;

  const image = {
    url:
      process.env.NODE_ENV === "development"
        ? imageURL
        : `https://gregbrimble.com${imageURL}`,
    alt: dehydatedImage.alt,
    attribution: dehydatedImage.attribution,
    attributionURL: dehydatedImage.attribution_url,
  };

  const links: LinksFunction = () => {
    const links = [];

    if (canonicalURL) links.push({ rel: "canonical", href: canonicalURL });
    // TODO
    // if (previousURL) links.push({ rel: "prev", href: previousURL });
    // if (nextURL) links.push({ rel: "next", href: nextURL });

    return links;
  };

  const meta: MetaFunction = () => {
    return {
      ...generateMeta({
        title,
        description,
        path: `/blog/${slug}`,
        image: {
          url: image.url,
          alt: image.alt,
        },
        keywords: ["Greg Brimble", "blog post", ...keywords],
        type: "article",
        article: {
          publishedDate,
          modifiedDate,
          authors,
        },
      }),
      ...(status === "draft" ? { robots: "noindex" } : undefined),
    };
  };

  const indexLoader: IndexLoader = async () => {
    return {
      type: "BlogPost",
      to: `/blog/${slug}`,
      title,
      description,
      publishedDate,
      modifiedDate,
      image,
      status,
    };
  };

  const Component = () => {
    return (
      <BlogPost
        Component={blogPost.default}
        slug={slug}
        title={title}
        description={description}
        publishedDate={publishedDate}
        modifiedDate={modifiedDate}
        image={image}
        authors={authors}
        keywords={keywords}
      />
      // TODO: next, previous
    );
  };

  return {
    links,
    meta,
    indexLoader,
    default: Component,
  };
};
