/**
 * Standard error response structure
 */
export interface AppError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  /** Don't show toast notification */
  silent?: boolean;
  /** Log error to console */
  logToConsole?: boolean;
  /** Custom message to display instead of error message */
  customMessage?: string;
  /** Toast variant */
  variant?: "destructive" | "default";
}
