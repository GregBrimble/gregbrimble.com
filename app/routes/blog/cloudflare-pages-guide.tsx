import { generateBlogPost } from "~/utils/blog/generateBlogPost";
import * as CloudflarePagesGuide from "~/content/blog/cloudflare-pages-guide/index.mdx";
import Image from "~/content/blog/cloudflare-pages-guide/hero.jpg";

const BlogPost = generateBlogPost(CloudflarePagesGuide, Image);

export const links = BlogPost.links;
export const meta = BlogPost.meta;
export const indexLoader = BlogPost.indexLoader;
export default BlogPost.default;
