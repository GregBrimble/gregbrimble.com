import { ExternalLink } from "~/components/ExternalLink";
import { OpenSourceProject } from "~/components/OpenSourceProject";
import { openSourceProjects } from "../../content/openSourceProjects";

export default function OpenSource() {
  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 dark:divide-gray-700 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Open Source
          </h2>
          <p className="mt-3 sm:mt-4 text-xl text-gray-500 dark:text-gray-400">
            This is a selection of my projects on{" "}
            <ExternalLink
              href="https://github.com/GregBrimble"
              className="underline text-blue-600"
            >
              GitHub
            </ExternalLink>{" "}
            and elsewhere across the internet. I welcome any questions or
            comments over{" "}
            <ExternalLink
              href="mailto:hello@gregbrimble.com"
              className="underline text-blue-600"
            >
              email
            </ExternalLink>{" "}
            or as a GitHub issue.
          </p>
        </div>
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {openSourceProjects.map((openSourceProject) => (
            <OpenSourceProject
              {...openSourceProject}
              key={openSourceProject.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
