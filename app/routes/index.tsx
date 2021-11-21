import type { MetaFunction } from "remix";
import type { AnchorHTMLAttributes } from "react";
import { SmartLink } from "~/components/SmartLink";
import Biography from "../components/Biography.mdx";
import { GregBrimble } from "~/schema.org/gregbrimble";

export let meta: MetaFunction = () => {
  return {
    title: "Greg Brimble",
    description: "Personal website of Greg Brimble, Technological Engineer",
  };
};

export default function Index() {
  return (
    <>
      <main className="overflow-hidden">
        <div className="py-24 lg:py-32">
          <div className="relative z-10 max-w-7xl mx-auto pl-4 pr-8 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Greg Brimble
            </h1>
            <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
              Technological Engineer
            </p>
          </div>
        </div>
        <section aria-labelledby="about-me">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
            <div className="max-w-7xl mx-auto lg:ml-auto">
              <h2
                id="about-me"
                className="text-3xl font-extrabold text-gray-900 dark:text-white"
              >
                About Me
              </h2>
              <div className="mt-6 prose prose-blue dark:prose-@light dark:prose-blue@light prose-lg text-gray-500 dark:text-gray-400">
                <Biography
                  // @ts-ignore: Bug in Remix. They didn't grab the full types from xdm.
                  components={{
                    a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
                      <SmartLink {...props} />
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json">${JSON.stringify(GregBrimble)}</script>
    </>
  );
}
