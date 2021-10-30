// https://sergiodxa.com/articles/automatic-revalidation-in-remix

import { useEffect } from "react";
import { useIsFocused } from "./useIsFocused";
import { useRevalidate } from "./useRevalidate";

export const useRevalidateOnInterval = ({
  always = false,
  interval = 5000,
}: {
  always?: boolean;
  interval?: number;
} = {}) => {
  const revalidate = useRevalidate();

  const isFocused = useIsFocused();
  const enabled = always || isFocused;

  useEffect(() => {
    if (!enabled) return;
    const intervalId = setInterval(() => {
      if (enabled) revalidate();
    }, interval);
    return () => clearInterval(intervalId);
  }, [revalidate, enabled]);
};
