import { ComponentType, FC } from "react";
import { CodeBlock } from "./CodeBlock";
import { SmartLink } from "./SmartLink";

export const Markdown: FC<{ contents: ComponentType }> = ({
  contents: Component,
}) => {
  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Bug in Remix. They didn't grab the full types from xdm.
      components={{
        a: SmartLink,
        pre: CodeBlock,
      }}
    />
  );
};
