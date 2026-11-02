import apiClient from "../apiConfig";
import type { Booking, BookingFilterParams } from "@/types/booking";
import type { PaginatedResponse, ApiResponse } from "@/types/common";

// Re-export action functions for backward compatibility
export {
  createBooking,
  approveBooking,
  rejectBooking,
  returnBooking,
  cancelBooking,
  extendBooking,
} from "./bookingActions";

/**
 * Get all borrowings with pagination, search, and filters
 * GET /borrows
 */
export async function getAllBookings(params?: BookingFilterParams) {
  const response = await apiClient.get<PaginatedResponse<Booking>>("/borrows", {
    params,
  });
  return response.data;
}

/**
 * Get a single borrowing by ID
 * GET /borrows/:id
 */
export async function getBookingsById(id: string) {
  const response = await apiClient.get<ApiResponse<Booking>>(`/borrows/${id}`);
  return response.data;
}

/**
 * Get overdue borrowings
 */
export async function getOverdueBookings(params?: BookingFilterParams) {
  const response = await apiClient.get<PaginatedResponse<Booking>>(
    "/bookings/overdue",
    { params },
  );
  return response.data;
}
