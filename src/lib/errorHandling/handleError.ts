import { toast } from "@/hooks/useToast";
import type { AppError, ErrorHandlerOptions } from "./errorTypes";
import { getErrorMessage } from "./errorMessages";

/**
 * Centralized error handler.
 * Extracts user-friendly message, optionally logs, and shows toast.
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {},
): string {
  const {
    silent = false,
    logToConsole = true,
    customMessage,
    variant = "destructive",
  } = options;

  const message = customMessage ?? getErrorMessage(error);

  if (logToConsole && import.meta.env.MODE !== "production") {
    // biome-ignore lint/suspicious/noConsole: intentional error logging in development
    console.error("Error:", error);
  }

  if (!silent) {
    toast({
      title: "Error",
      description: message,
      variant,
    });
  }

  return message;
}

/**
 * Create a typed error with additional context
 */
export function createAppError(
  message: string,
  code?: string,
  details?: Record<string, unknown>,
): AppError {
  return { message, code, details };
}
