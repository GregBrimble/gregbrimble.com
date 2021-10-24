import { useLocation } from "react-router";
import { Outlet } from "remix";
import { Decoration } from "~/components/blog/Decoration";

const IS_BLOG_POST_REGEXP = /^\/blog\/.+/i;

export default function Blog() {
  const location = useLocation();
  const isBlogPost = IS_BLOG_POST_REGEXP.test(location.pathname);

  if (isBlogPost) {
    return (
      <div className="relative py-16 overflow-hidden">
        <Decoration />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    );
  }

  return <div>Blog index</div>;
}
