import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

export function useNavigateWithTransition() {
  const navigate = useNavigate();

  const navigateWithTransition = useCallback(
    (to, options = {}) => {
      if (!document.startViewTransition) {
        navigate(to, options);
        return;
      }

      document.startViewTransition(() => {
        flushSync(() => {
          navigate(to, options);
        });
      });
    },
    [navigate]
  );

  return navigateWithTransition;
}
