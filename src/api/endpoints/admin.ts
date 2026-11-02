import apiClient from "../apiConfig";
import type { ApiResponse } from "@/types/common";
import type { DashboardStats } from "@/types/dashboard";

/**
 * Get dashboard statistics (Admin)
 * GET /admin/dashboard
 */
export async function getDashboardStats() {
  const response =
    await apiClient.get<ApiResponse<DashboardStats>>("/admin/dashboard");
  return response.data;
}
