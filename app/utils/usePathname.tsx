import { useMatches } from "remix";

export const usePathname = () => {
  const matches = useMatches();
  return matches[matches.length - 1].pathname;
};
