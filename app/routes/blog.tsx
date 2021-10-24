import { Outlet } from "remix";

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <Outlet />
    </div>
  );
}
