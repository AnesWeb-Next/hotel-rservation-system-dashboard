import apiClient from "../apiConfig";
import type { Booking, BookingFilterParams } from "@/types/booking";
import type { ApiResponse } from "@/types/common";

/**
 * Request to borrow a book
 * POST /bookings/request
 */
export async function createBooking(data: BookingFilterParams) {
  const response = await apiClient.post<ApiResponse<Booking>>(
    "/bookings/request",
    data,
  );
  return response.data;
}

/**
 * Approve a borrow request (Admin)
 * POST /bookings/:id/approve
 */
export async function approveBooking(id: string) {
  const response = await apiClient.post<ApiResponse<Booking>>(
    `/bookings/${id}/approve`,
  );
  return response.data;
}

/**
 * Reject a borrow request (Admin)
 * POST /bookings/:id/reject
 */
export async function rejectBooking(id: string, reason?: string) {
  const response = await apiClient.post<ApiResponse<Booking>>(
    `/bookings/${id}/reject`,
    { reason },
  );
  return response.data;
}

/**
 * Return a borrowed book
 * POST /bookings/:id/return
 */
export async function returnBooking(id: string) {
  const response = await apiClient.post<ApiResponse<Booking>>(
    `/bookings/${id}/return`,
  );
  return response.data;
}

/**
 * Cancel a borrow request
 * POST /bookings/:id/cancel
 */
export async function cancelBooking(id: string) {
  const response = await apiClient.post<ApiResponse<Booking>>(
    `/bookings/${id}/cancel`,
  );
  return response.data;
}

/**
 * Extend borrow period
 * POST /bookings/:id/extend
 */
export async function extendBooking(id: string, additionalDays: number = 7) {
  const response = await apiClient.post<ApiResponse<Booking>>(
    `/bookings/${id}/extend`,
    { additionalDays },
  );
  return response.data;
}
