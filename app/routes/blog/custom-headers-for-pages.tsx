import { generateBlogPost } from "~/utils/blog/generateBlogPost";
import * as CustomHeadersForPages from "../../content/blog/custom-headers-for-pages/index.mdx";
import Image from "../../content/blog/custom-headers-for-pages/hero.png";

const BlogPost = generateBlogPost(CustomHeadersForPages, Image);

export const links = BlogPost.links;
export const meta = BlogPost.meta;
export const indexLoader = BlogPost.indexLoader;
export default BlogPost.default;
