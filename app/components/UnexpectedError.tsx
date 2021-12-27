import { useLocation } from "remix";
import { CodeBlock } from "./CodeBlock";

export const UnexpectedError = ({ error }: { error: Error }) => {
  console.error(error);

  const { pathname } = useLocation();

  const queryString = new URLSearchParams({
    subject: encodeURIComponent("Unexpected Error on gregbrimble.com"),
    body: encodeURIComponent(`An unexpected error (${error.name}) occurred at https://gregbrimble.com${pathname}. The stack follows:
  
${error.stack}`),
  }).toString();

  // TODO: Sentry

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-24 lg:py-32 prose dark:prose-invert prose-lg mx-auto">
      <h1>Unexpected Error</h1>

      <details open>
        <summary>
          An unexpected error has occurred. I haven&apos;t hooked up Sentry yet,
          so I haven&apos;t been notified. I&apos;ll add this soon. In the
          meantime, and in case you&apos;re curious...
        </summary>

        <div className="mt-6">
          <CodeBlock lineNumbers={false} filename={error.name}>
            <code>{error.stack}</code>
          </CodeBlock>
        </div>
      </details>

      <p>
        Please consider{" "}
        <a href={`mailto:hello@gregbrimble.com?${queryString}`}>
          sending me an email about it
        </a>
        .
      </p>
    </main>
  );
};
