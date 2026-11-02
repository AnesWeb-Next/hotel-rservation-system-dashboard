/**
 * Check if an error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return true;
  }
  if (error instanceof Error && error.name === "AbortError") {
    return true;
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (typeof error === "object" && error !== null && "status" in error) {
    const status = (error as Record<string, unknown>).status;
    return status === 401 || status === 403;
  }
  return false;
}
