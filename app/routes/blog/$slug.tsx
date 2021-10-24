import { useParams } from "react-router";
import { BlogPost as BlogPostComponent } from "~/components/blog/BlogPost";
// import * as Blog from "../../content/blog/optimizing-images.mdx";

export default function BlogPost() {
  const { slug } = useParams();
  const Blog = require("../../content/blog/optimizing-images.mdx");
  return <BlogPostComponent blog={Blog} />;
}
