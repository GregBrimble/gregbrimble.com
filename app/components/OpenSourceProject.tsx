import type { FC } from "react";
import { ExternalLink } from "./ExternalLink";

export enum OpenSourceProjectStatus {
  "active" = "Active",
  "maintained" = "Maintained",
  "completed" = "Completed",
  "archived" = "Archived",
  "icebox" = "On Ice",
}

export const OpenSourceProject: FC<{
  status: OpenSourceProjectStatus;
  href: string;
  date: string;
  title: string;
  description: string;
}> = ({ status, href, date, title, description }) => {
  let statusColors = "";

  switch (status) {
    case OpenSourceProjectStatus.active: {
      statusColors =
        "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100";
      break;
    }
    case OpenSourceProjectStatus.maintained: {
      statusColors =
        "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100";
      break;
    }
    case OpenSourceProjectStatus.completed: {
      statusColors =
        "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100";
      break;
    }
    case OpenSourceProjectStatus.archived: {
      statusColors =
        "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100";
      break;
    }
    case OpenSourceProjectStatus.icebox: {
      statusColors =
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100";
      break;
    }
  }

  return (
    <ExternalLink href={href}>
      <div>
        <div>
          <span
            className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${statusColors}`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        {date}
      </div>
    </ExternalLink>
  );
};
