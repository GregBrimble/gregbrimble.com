import { forwardRef, AnchorHTMLAttributes } from "react";

export const ExternalLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>((props, forwardedRef) => {
  return (
    <a
      ref={forwardedRef}
      rel={props.rel || "nofollow noopener noreferrer"}
      target={props.target || "_blank"}
      {...props}
    />
  );
});
