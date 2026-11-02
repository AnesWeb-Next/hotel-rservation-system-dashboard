/**
 * Handle axios response errors with structured error objects
 */
export function handleResponseError(error: {
  response?: { status: number; data?: { message?: string; errors?: string[] } };
  request?: unknown;
  message?: string;
}) {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 401) {
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");

      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }

    if (status === 403) {
      console.error("Access forbidden:", data?.message || "Permission denied");
    }

    if (status === 404) {
      console.error("Resource not found:", data?.message || "Not found");
    }

    if (status === 400) {
      console.error("Validation error:", data?.message || "Bad request");
    }

    if (status >= 500) {
      console.error(
        "Server error:",
        data?.message || "Internal server error",
      );
    }

    return Promise.reject({
      status,
      message: data?.message || "An error occurred",
      errors: data?.errors || [],
    });
  }

  if (error.request) {
    console.error("Network error: No response received");
    return Promise.reject({
      status: 0,
      message: "Network error. Please check your connection.",
      errors: [],
    });
  }

  return Promise.reject({
    status: -1,
    message: error.message || "An unexpected error occurred",
    errors: [],
  });
}
