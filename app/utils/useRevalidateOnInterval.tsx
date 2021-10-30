// https://sergiodxa.com/articles/automatic-revalidation-in-remix

import { useEffect } from "react";
import { useRevalidate } from "./useRevalidate";

export const useRevalidateOnInterval = ({
  enabled = false,
  interval = 5000,
}: {
  enabled?: boolean;
  interval?: number;
}) => {
  const revalidate = useRevalidate();

  useEffect(() => {
    if (!enabled) return;
    let intervalId = setInterval(revalidate, interval);
    return () => clearInterval(intervalId);
  }, [revalidate]);
};
