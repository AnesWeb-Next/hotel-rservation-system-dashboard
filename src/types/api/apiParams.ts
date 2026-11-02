/**
 * Query Parameter Types for API Requests
 */

/**
 * Base pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Search parameters
 */
export interface SearchParams {
  search?: string;
}

/**
 * Combined filter parameters
 */
export interface BaseFilterParams
  extends PaginationParams, SortParams, SearchParams {
  hotel?: string;
}

/**
 * Book-specific filter parameters
 */
export interface RoomFilterParams extends BaseFilterParams {
  status?: "in-shelf" | "out-of-stock";
  minPrice?: number;
  maxPrice?: number;
}

/**
 * User filter parameters
 */
export interface UserFilterParams extends BaseFilterParams {
  role?: "Admin" | "User";
  isActive?: boolean;
}

/**
 * Booking filter parameters
 */
export interface BookingFilterParams extends BaseFilterParams {
  status?:
    | "pending"
    | "approved"
    | "rejected"
    | "active"
    | "returned"
    | "overdue"
    | "cancelled";
  userId?: string;
  roomId?: string;
  overdue?: boolean;
}
