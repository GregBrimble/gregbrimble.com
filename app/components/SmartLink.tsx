import { forwardRef, AnchorHTMLAttributes } from "react";
import { Link } from "remix";
import type { LinkProps } from "remix";
import { ExternalLink } from "./ExternalLink";

export const SmartLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement> | LinkProps
>(function SmartLink(props, forwardedRef) {
  if ("to" in props && props.to) {
    return <Link ref={forwardedRef} {...props} />;
  } else if ("href" in props && props.href) {
    const url = new URL(props.href, "relative://");
    if (url.protocol === "relative:" && url.hostname === "") {
      return <Link ref={forwardedRef} to={url.pathname} {...props} />;
    }
  }

  return <ExternalLink ref={forwardedRef} {...props} />;
});
