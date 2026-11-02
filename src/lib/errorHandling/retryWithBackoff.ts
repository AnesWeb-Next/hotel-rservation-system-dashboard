import { isAuthError } from "./errorTypeGuards";
import type { ErrorHandlerOptions } from "./errorTypes";
import { handleError } from "./handleError";

/**
 * Retry an async operation with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (isAuthError(error)) {
        throw error;
      }

      const delay = baseDelay * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Wrap an async function with automatic error handling
 */
export function withErrorHandling<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options?: ErrorHandlerOptions,
): (...args: TArgs) => Promise<TReturn | null> {
  return async (...args: TArgs): Promise<TReturn | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, options);
      return null;
    }
  };
}
