import moment from "moment";
import type { Commit } from "~/data/code";
import { truncate } from "~/utils/truncate";
import { ExternalLink } from "../ExternalLink";

export const RecentCommits = ({ commits }: { commits: Commit[] }) => {
  return (
    <div>
      <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Code
        </h3>
      </div>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {commits.map((commit) => (
          <li key={commit.date} className="py-4 space-y-1">
            <div className="flex justify-between">
              <ExternalLink
                href={commit.repository.url}
                className="text-sm font-medium dark:text-white hover:underline"
              >
                {commit.repository.name}
              </ExternalLink>

              <time
                className="text-sm text-gray-500 dark:text-gray-400 ml-2 min-w-max"
                dateTime={commit.date}
              >
                {moment(commit.date).fromNow()}
              </time>
            </div>
            <ExternalLink
              href={commit.url}
              className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
            >
              {truncate(commit.message, 80)}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
