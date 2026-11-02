import apiClient from "../apiConfig";
import type { User, UserFormInput, UserFilterParams } from "@/types/user";
import type { ApiResponse } from "@/types/common";

/**
 * Get all users (Admin)
 * GET /users → returns all users (no pagination)
 */
export async function getAllUsers(params?: UserFilterParams) {
  const response = await apiClient.get<ApiResponse<User[]>>("/users", {
    params,
  });
  return response.data;
}

/**
 * Get a single user by ID
 * GET /users/:id
 */
export async function getUserById(id: string) {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return response.data;
}

/**
 * Create a new user (Admin)
 * POST /users
 */
export async function createUser(data: UserFormInput) {
  const response = await apiClient.post<ApiResponse<User>>("/users", data);
  return response.data;
}

/**
 * Update an existing user (Admin)
 * PUT /users/:id
 */
export async function updateUser(id: string, data: Partial<UserFormInput>) {
  const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
  return response.data;
}

/**
 * Delete a user (Admin)
 * DELETE /users/:id
 */
export async function deleteUser(id: string) {
  const response = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
  return response.data;
}
