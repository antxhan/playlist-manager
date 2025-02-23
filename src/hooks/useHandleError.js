import { useCallback } from "react";
import { useNavigateWithTransition } from "./useNavigateWithTransition";
import { errorResponseMessages } from "../utils/fetchError";

export function useHandleError() {
  const navigateWithTransition = useNavigateWithTransition();

  // can be refactored to
  return useCallback(
    (error, additionalMessage = null) => {
      // update to include all falsy values
      const errorMessage =
        errorResponseMessages[error.statusCode] ||
        "An unexpected error occured.";
      const message = additionalMessage
        ? `${additionalMessage} ${errorMessage}`
        : errorMessage;

      navigateWithTransition("/error", {
        state: {
          message,
          statusCode: error.statusCode,
        },
      });
    },
    [navigateWithTransition]
  );
}
