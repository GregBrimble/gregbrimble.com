import type { LinksFunction, MetaFunction } from "remix";
import type { ComponentType } from "react";
import { BlogPost } from "~/components/blog/BlogPost";
import { IndexLoader } from "~/routes/blog";
import { generateMeta } from "../generateMeta";

interface BlogPostAttributes {
  slug: string;
  title: string;
  description: string;
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
      published_date: publishedDate,
      modified_date: modifiedDate,
      canonical_url: canonicalURL,
      image: dehydatedImage,
      authors = [{ name: "Greg Brimble", url: "https://gregbrimble.com/" }],
    },
  } = blogPost;

  const image = {
    ...dehydatedImage,
    url: `https://gregbrimble.com${imageURL}`,
  };

  const links: LinksFunction = () => {
    const links = [];

    if (canonicalURL) links.push({ rel: "canonical", href: canonicalURL });

    return links;
  };

  const meta: MetaFunction = () => {
    return generateMeta({
      title,
      description,
      path: `/blog/${slug}`,
      image: {
        url: image.url,
        alt: image.alt,
      },
      keywords: ["Greg Brimble", "blog post"], // TODO: Blog Post keywords
      type: "article",
      article: {
        publishedDate,
        modifiedDate,
        authors,
      },
    });
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
      />
    );
  };

  return {
    links,
    meta,
    indexLoader,
    default: Component,
  };
};
