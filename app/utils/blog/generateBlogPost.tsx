import type { LinksFunction, MetaFunction } from "remix";
import type { ComponentType } from "react";
import { BlogPost } from "~/components/blog/BlogPost";

interface BlogAttributes {
  title: string;
  description?: string;
  date?: string;
  canonical_url?: string;
  image?: {
    url: string;
    attribution?: string;
  };
}

interface Blog {
  default: ComponentType;
  attributes: BlogAttributes;
}

export const generateBlogPost = (blog: Blog) => {
  const links: LinksFunction = () => {
    const links = [];

    if (blog.attributes.canonical_url)
      links.push({ rel: "canonical", href: blog.attributes.canonical_url });

    return links;
  };

  const meta: MetaFunction = () => {
    return {
      title: `${blog.attributes.title} | Greg Brimble`,
    };
  };

  const Component = () => {
    return <BlogPost blog={blog} />;
  };

  return {
    links,
    meta,
    default: Component,
  };
};
