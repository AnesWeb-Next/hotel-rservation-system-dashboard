/**
 * API Response Types - Aligned with Backend
 */

/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string | string[] | Record<string, unknown>;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Paginated API response
 */
export interface ApiPaginatedResponse<T = unknown> {
  success: true;
  message: string;
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Union type for any API response
 */
export type ApiResponseType<T> =
  | ApiSuccessResponse<T>
  | ApiPaginatedResponse<T>
  | ApiErrorResponse;

/**
 * Generic error type for API errors
 */
export interface ApiError {
  status: number;
  message: string;
  errors: string[];
}

/**
 * Query key type for TanStack Query
 */
export type QueryKeyType = readonly unknown[];
