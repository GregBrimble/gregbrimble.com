import type { LinksFunction, MetaFunction } from "remix";
import type { ComponentType } from "react";
import { BlogPost } from "~/components/blog/BlogPost";
import { IndexLoader } from "~/routes/blog";

interface BlogPostAttributes {
  slug: string;
  title: string;
  description: string;
  date: string;
  canonical_url?: string;
  image?: {
    url: string;
    alt?: string;
    attribution?: string;
  };
}

interface BlogPostComponent {
  default: ComponentType;
  attributes: BlogPostAttributes;
}

export const generateBlogPost = (blogPost: BlogPostComponent) => {
  const {
    attributes: { slug, title, description, date, canonical_url, image },
  } = blogPost;

  const links: LinksFunction = () => {
    const links = [];

    if (canonical_url) links.push({ rel: "canonical", href: canonical_url });

    return links;
  };

  const meta: MetaFunction = () => {
    return {
      title: `${title} | Greg Brimble`,
    };
  };

  const indexLoader: IndexLoader = async () => {
    return {
      to: `/blog/${slug}`,
      title: title,
      description: description,
      date: date,
      image: image,
    };
  };

  const Component = () => {
    return (
      <BlogPost
        Component={blogPost.default}
        title={title}
        description={description}
        date={date}
        image={image}
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
