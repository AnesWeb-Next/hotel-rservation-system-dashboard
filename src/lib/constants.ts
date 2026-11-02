/**
 * Application-wide constants
 */

// Pagination
export const DEFAULT_PAGE_SIZE = 5;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50] as const;

// Status values
export const ROOM_STATUSES = ["in-shelf", "out-of-stock"] as const;

export const BOOKING_STATUSES = [
  "pending",
  "approved",
  "active",
  "returned",
  "overdue",
  "rejected",
  "cancelled",
] as const;

export const USER_ROLES = ["user", "admin"] as const;

// Currency
export const DEFAULT_CURRENCY = "USD";
export const CURRENCY_LOCALE = "en-US";

// Date formats
export const DATE_FORMAT = "MMM d, yyyy";
export const DATE_TIME_FORMAT = "MMM d, yyyy h:mm a";

// Validation limits
export const MAX_BORROW_LIMIT = 10;
export const DEFAULT_BORROW_LIMIT = 5;
export const BORROW_EXTENSION_DAYS = 7;
export const LATE_FEE_PER_DAY = 1.0;

// API simulation delay (for mock data service)
export const API_DELAY_MS = 500;

// Table settings
export const TABLE_EMPTY_STATE_ROWS = 5;

// Toast durations
export const TOAST_DURATION = 5000;
export const TOAST_ERROR_DURATION = 7000;
