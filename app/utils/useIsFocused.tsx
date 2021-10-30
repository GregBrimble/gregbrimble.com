import { useEffect, useState } from "react";

export const useIsFocused = () => {
  const [isFocused, setIsFocused] = useState(true);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);
  const onVisibilityChange = () =>
    setIsFocused(document.visibilityState === "visible");

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  });

  return isFocused;
};
