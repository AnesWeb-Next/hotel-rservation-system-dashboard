/**
 * HTTP Error status messages
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check your input.",
  401: "You are not authorized. Please log in again.",
  403: "You don't have permission to perform this action.",
  404: "The requested resource was not found.",
  408: "Request timeout. Please try again.",
  409: "A conflict occurred. The resource may have been modified.",
  422: "Invalid data. Please check your input.",
  429: "Too many requests. Please wait a moment.",
  500: "Server error. Please try again later.",
  502: "Server is temporarily unavailable. Please try again.",
  503: "Service unavailable. Please try again later.",
  504: "Request timeout. Please try again.",
};

/**
 * Extract user-friendly message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (error === null || error === undefined) {
    return "An unknown error occurred";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return "Request was cancelled";
    }
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return "Network error. Please check your connection.";
    }
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as Record<string, unknown>).status === "number"
  ) {
    const status = (error as Record<string, unknown>).status as number;
    const message =
      HTTP_ERROR_MESSAGES[status] ?? `Request failed with status ${status}`;
    return message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  ) {
    return (error as Record<string, unknown>).message as string;
  }

  return "An unexpected error occurred";
}
