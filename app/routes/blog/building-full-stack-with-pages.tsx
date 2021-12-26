import { generateBlogPost } from "~/utils/blog/generateBlogPost";
import * as BuildFullStackWithPages from "~/content/blog/building-full-stack-with-pages/index.mdx";
import Image from "~/content/blog/building-full-stack-with-pages/hero.png";

const BlogPost = generateBlogPost(BuildFullStackWithPages, Image);

export const links = BlogPost.links;
export const meta = BlogPost.meta;
export const indexLoader = BlogPost.indexLoader;
export default BlogPost.default;
