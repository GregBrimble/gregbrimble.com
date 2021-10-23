import { forwardRef, AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { ExternalLink } from "./ExternalLink";

export const SmartLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> | LinkProps
>((props, forwardedRef) => {
  if ("to" in props && props.to) return <Link ref={forwardedRef} {...props} />;

  return <ExternalLink ref={forwardedRef} {...props} />;
});
