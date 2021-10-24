import { forwardRef, AnchorHTMLAttributes } from "react";
import { Link } from "remix";
import type { LinkProps } from "remix";
import { ExternalLink } from "./ExternalLink";

export const SmartLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> | LinkProps
>((props, forwardedRef) => {
  if ("to" in props && props.to) return <Link ref={forwardedRef} {...props} />;

  return <ExternalLink ref={forwardedRef} {...props} />;
});
