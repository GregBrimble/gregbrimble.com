import { generateBlogPost } from "~/utils/blog/generateBlogPost";
import * as OptimizingImages from "../../content/blog/optimizing-images.mdx";

const BlogPost = generateBlogPost(OptimizingImages);

export const links = BlogPost.links;
export const meta = BlogPost.meta;
export default BlogPost.default;

// export default function OptimizingImages() {
//   return <div>Hello!</div>;
// }
