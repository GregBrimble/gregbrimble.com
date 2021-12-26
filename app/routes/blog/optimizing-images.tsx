import { generateBlogPost } from "~/utils/blog/generateBlogPost";
import * as OptimizingImages from "~/content/blog/optimizing-images/index.mdx";
import Image from "~/content/blog/optimizing-images/hero.png";

const BlogPost = generateBlogPost(OptimizingImages, Image);

export const links = BlogPost.links;
export const meta = BlogPost.meta;
export const indexLoader = BlogPost.indexLoader;
export default BlogPost.default;
