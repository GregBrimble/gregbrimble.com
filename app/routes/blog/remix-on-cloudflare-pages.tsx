import { generateBlogPost } from "~/utils/blog/generateBlogPost";
import * as RemixOnCloudflarePages from "~/content/blog/remix-on-cloudflare-pages/index.mdx";
import Image from "~/content/blog/remix-on-cloudflare-pages/hero.png";

const BlogPost = generateBlogPost(RemixOnCloudflarePages, Image);

export const links = BlogPost.links;
export const meta = BlogPost.meta;
export const indexLoader = BlogPost.indexLoader;
export default BlogPost.default;
