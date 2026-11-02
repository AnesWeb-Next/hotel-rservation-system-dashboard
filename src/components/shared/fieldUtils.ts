export function getErrorMessage(errors: unknown[]): string | undefined {
  const error = errors[0];
  if (!error) return undefined;
  if (typeof error === "string") return error;
  if (typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return undefined;
}
