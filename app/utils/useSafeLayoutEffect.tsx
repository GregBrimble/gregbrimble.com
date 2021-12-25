import { useLayoutEffect } from "react";

export const useSafeLayoutEffect =
  typeof window === "undefined" ? () => undefined : useLayoutEffect;
