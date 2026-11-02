// API Endpoints - Export all API modules
export * as authApi from "./endpoints/auth";
export * as usersApi from "./endpoints/users";
export * as bookingsApi from "./endpoints/bookings";

// Export the configured axios instance for custom requests
export { default as apiClient } from "./apiConfig";
