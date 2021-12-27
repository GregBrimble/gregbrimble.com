import { useLocation } from "remix";

export const NotFound = () => {
  const { pathname } = useLocation();

  const queryString = new URLSearchParams({
    subject: encodeURIComponent("Not Found on gregbrimble.com"),
    body: encodeURIComponent(
      `The page, https://gregbrimble.com${pathname}, could not found.`
    ),
  }).toString();

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-24 lg:py-32 prose dark:prose-invert prose-lg mx-auto">
      <h1>Not Found</h1>

      <p>
        The page, <code>{pathname}</code>, could not be found.
      </p>

      <p>
        If you think this page should exist, please consider{" "}
        <a href={`mailto:hello@gregbrimble.com?${queryString}`}>
          sending me an email
        </a>
        .
      </p>
    </main>
  );
};
