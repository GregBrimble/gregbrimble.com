import { AnchorHTMLAttributes, forwardRef } from "react";

export const ExternalLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(function ExternalLink(props, forwardedRef) {
  return (
    <a
      ref={forwardedRef}
      rel={props.rel ?? "noopener noreferrer"}
      target={props.target ?? "_blank"}
      {...props}
    />
  );
});
