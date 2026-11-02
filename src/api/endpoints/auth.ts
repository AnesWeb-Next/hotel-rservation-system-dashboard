import apiClient from "../apiConfig";
import type { ApiResponse } from "@/types/common";
import type { AuthUser, LoginCredentials, AuthResponse } from "@/types/auth";

// Backend login response structure
interface LoginApiResponse {
  success: boolean;
  message?: string;
  data?: AuthUser;
  token?: string;
  error?: string;
}

/**
 * Login with email and password
 * POST /auth/login → { success, data: user, token }
 */
export async function login(
  credentials: LoginCredentials,
): Promise<ApiResponse<AuthResponse>> {
  const response = await apiClient.post<LoginApiResponse>(
    "/auth/login",
    credentials,
  );

  const { success, message, data, token, error } = response.data;

  if (success && data && token) {
    return {
      success: true,
      message,
      data: {
        user: data,
        token,
      },
    };
  }

  return {
    success: false,
    message: message || "Login failed",
    error,
  };
}

/**
 * Logout — backend has no logout endpoint, just clear local state
 */
export async function logout() {
  // No server-side session to clear; auth is stateless JWT
  return { success: true, message: "Logged out" };
}

/**
 * Get current authenticated user
 * GET /auth/check → { success, data: user }
 */
export async function getProfile() {
  const response = await apiClient.get<ApiResponse<AuthUser>>("/auth/check");
  return response.data;
}

/**
 * Change password for authenticated user
 * PUT /users/change-password → { success, message }
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const response = await apiClient.put<ApiResponse<null>>(
    "/users/change-password",
    { currentPassword, newPassword },
  );
  return response.data;
}
