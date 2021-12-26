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
      date,
      canonical_url: canonicalURL,
      image: dehydatedImage,
      authors = [{ name: "Greg Brimble", url: "https://gregbrimble.com/" }],
    },
  } = blogPost;

  const image = {
    ...dehydatedImage,
    url: imageURL,
  };

  const links: LinksFunction = () => {
    const links = [];

    if (canonicalURL) links.push({ rel: "canonical", href: canonicalURL });

    return links;
  };

  const meta: MetaFunction = () => {
    return {
      title: `${title} | Greg Brimble`,
      description,
    };
  };

  const indexLoader: IndexLoader = async () => {
    return {
      type: "BlogPost",
      to: `/blog/${slug}`,
      title,
      description,
      date,
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
        date={date}
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
