import { Component, DetailedHTMLProps, HTMLAttributes, useState } from "react";
import copy from "copy-to-clipboard";
import hljs from "highlight.js";
import ClipboardCopyIcon from "@heroicons/react/outline/ClipboardCopyIcon";
import ClipboardCheckIcon from "@heroicons/react/outline/ClipboardCheckIcon";

export const CodeBlock = ({
  filename,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  filename?: string;
}) => {
  if (filename) {
    const { children, ...codeProps } = (props.children as Component).props;

    const code = children?.toString() || "";
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
      copy(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    };

    return (
      <div>
        <div className="bg-[color:var(--tw-prose-pre-bg)] text-gray-200 dark:text-gray-300 rounded-t-md flex">
          <div className="px-6 py-4 text-sm border-b-2 border-blue-300 dark:border-blue-600">
            {filename}
          </div>
          <div className="flex-1"></div>
          <div
            className={`my-auto mr-4 cursor-pointer flex items-center ${
              copied
                ? "text-green-400"
                : "transition duration-700 ease-in-out text-gray-200 dark:text-gray-300 hover:text-white"
            }`}
            onClick={copyCode}
          >
            <span className="text-xs mr-2">
              {copied ? "Copied to clipboard" : "Copy to clipboard"}
            </span>
            {copied ? (
              <ClipboardCheckIcon className="w-6" />
            ) : (
              <ClipboardCopyIcon className="w-6" />
            )}
          </div>
        </div>

        <pre className="mt-0 rounded-t-none">
          <code
            {...codeProps}
            dangerouslySetInnerHTML={{
              __html: hljs.highlightAuto(code).value,
            }}
          />
        </pre>
      </div>
    );
  }

  return <pre {...props} />;
};
