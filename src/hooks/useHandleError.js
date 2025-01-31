import { useCallback } from "react";
import { useNavigateWithTransition } from "./useNavigateWithTransition";
import { errorResponseMessages } from "../utils/fetchError";

export function useHandleError() {
  const navigateWithTransition = useNavigateWithTransition();

  const handleError = useCallback(
    (error, additionalMessage = null) => {
      const errorMessage =
        errorResponseMessages[error.statusCode] ??
        "An unexpected error occured.";

      navigateWithTransition("/error", {
        state: {
          message: additionalMessage
            ? additionalMessage + " " + errorMessage
            : errorMessage,
          statusCode: error.statusCode,
        },
      });
    },
    [navigateWithTransition]
  );

  return handleError;
}
