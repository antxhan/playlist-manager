import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

export function useNavigateWithTransition() {
  const navigate = useNavigate();

  // can be refactored to
  return useCallback(
    (to, options = {}) => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          flushSync(() => navigate(to, options));
        });
      } else {
        navigate(to, options);
      }
    },
    [navigate]
  );
}
