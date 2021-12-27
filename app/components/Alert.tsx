import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

import { ComponentType, FC } from "react";

type AlertType = "success" | "info" | "warning" | "error";

export const Alert: FC<{
  type: AlertType;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}> = ({ type, icon: Icon, children }) => {
  let containerColors = "";
  let iconColors = "";
  let childColors = "";

  switch (type) {
    case "success": {
      containerColors =
        "bg-green-50 dark:bg-green-900 border-green-400 dark:border-green-500";
      iconColors = "text-green-400";
      childColors = "prose-green";
      Icon = Icon ?? CheckCircleIcon;
      break;
    }
    case "info": {
      containerColors =
        "bg-blue-50 dark:bg-blue-900 border-blue-400 dark:border-blue-500";
      iconColors = "text-blue-400";
      childColors = "prose-blue";
      Icon = Icon ?? InformationCircleIcon;
      break;
    }
    case "warning": {
      containerColors =
        "bg-yellow-50 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-500";
      iconColors = "text-yellow-400";
      childColors = "prose-yellow";
      Icon = Icon ?? ExclamationIcon;
      break;
    }
    case "error": {
      containerColors =
        "bg-red-50 dark:bg-red-900 border-red-400 dark:border-red-500";
      iconColors = "text-red-400 dark:text-red-500";
      childColors = "prose-red";
      Icon = Icon ?? XCircleIcon;
      break;
    }
  }

  return (
    <div className={`border-l-4 p-4 ${containerColors}`}>
      <div className="flex">
        {Icon ? (
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${iconColors}`} aria-hidden="true" />
          </div>
        ) : undefined}
        <div className="ml-3">
          <p
            className={`text-sm prose dark:prose-invert my-0 py-0 ${childColors}`}
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};
