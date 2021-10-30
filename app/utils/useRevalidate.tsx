// https://sergiodxa.com/articles/automatic-revalidation-in-remix

import { useCallback } from "react";
import { useNavigate } from "react-router";

export const useRevalidate = () => {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(".", { replace: true });
  }, [navigate]);
};
