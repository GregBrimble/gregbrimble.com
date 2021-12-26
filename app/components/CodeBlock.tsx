import { Component, DetailedHTMLProps, HTMLAttributes, useState } from "react";
import copy from "copy-to-clipboard";
import hljs from "highlight.js";
import ClipboardCopyIcon from "@heroicons/react/outline/ClipboardCopyIcon";
import ClipboardCheckIcon from "@heroicons/react/outline/ClipboardCheckIcon";
import ArrowsExpandIcon from "@heroicons/react/outline/ArrowsExpandIcon";

export const CodeBlock = ({
  filename,
  terminal = false,
  lineNumbers = true,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  filename?: string;
  terminal?: boolean;
  lineNumbers?: boolean;
}) => {
  const { children, ...codeProps } = (props.children as Component).props;

  const [expanded, setExpanded] = useState(false);

  const code = children?.toString().trimEnd() || "";
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    copy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const matches = /language-(\w+)/.exec((codeProps as any).className);
  const language = matches ? matches[1] : "txt";

  const label = filename ? filename : terminal ? "Terminal" : undefined;

  const highlightedCode = hljs.highlight(code, { language }).value;
  const lines = highlightedCode.split("\n");
  const numLines = lines.length;
  const maxDigits = numLines.toString().length;

  return (
    <div
      className={`transition-all motion-reduce:transition-none delay-50 duration-300 ease-in-out ${
        expanded && "lg:-mx-24 xl:-mx-52 2xl:-mx-72"
      }`}
    >
      <div className="bg-[color:var(--tw-prose-pre-bg)] text-gray-200 dark:text-gray-300 rounded-t-md flex items-center">
        {label ? (
          <div className="px-6 py-4 text-sm border-b-2 border-blue-300 dark:border-blue-600 break-all">
            {label}
          </div>
        ) : undefined}
        <div className="flex-1" />
        <div
          className="no-js:!hidden hidden py-4 pl-6 pr-4 lg:flex items-center text-gray-200 dark:text-gray-300 hover:text-white cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="mr-2 text-xs select-none">
            {expanded ? "Collapse" : "Expand"}
          </span>
          {expanded ? (
            <ArrowsExpandIcon className="w-6" />
          ) : (
            <ArrowsExpandIcon className="w-6" />
          )}
        </div>
        <div
          className={`no-js:hidden py-4 pr-4 flex items-center ${
            copied
              ? "text-green-400"
              : "text-gray-200 dark:text-gray-300 hover:text-white cursor-pointer"
          }`}
          onClick={copyCode}
        >
          <span className="hidden md:block mr-2 text-xs select-none">
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
          className={"hljs " + (codeProps as any).className || ""}
          dangerouslySetInnerHTML={{
            __html: lines
              .map((line, i) => {
                if (terminal) {
                  if (line && !line.startsWith("<span"))
                    return `<span class="before:content-['$_'] before:text-pink-300 dark:before:text-pink-400" />${line}`;

                  return `<span class="before:content-['__']" />${line}`;
                }

                if (numLines > 1 && lineNumbers) {
                  return `<span class="md:before:content-[attr(data-line-number)] before:text-gray-600 dark:before:text-gray-700" data-line-number="${(
                    i + 1
                  )
                    .toString()
                    .padStart(maxDigits, " ")}  ">${line}</span>`;
                }

                return line;
              })
              .join("\n"),
          }}
        />
      </pre>
    </div>
  );
};