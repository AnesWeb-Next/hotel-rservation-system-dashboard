import { DEFAULT_PARAMS, type ParsedSearchParams } from "./searchParamsTypes";

/**
 * Update search parameters with new values
 *
 * Merges new values with existing params and optionally resets page to 1.
 * Useful when applying filters or search that should reset pagination.
 */
export function updateSearchParams(
  setSearchParams: (params: URLSearchParams | Record<string, string>) => void,
  currentParams: ParsedSearchParams,
  updates: Partial<ParsedSearchParams>,
  resetPage = true,
): void {
  const newParams = {
    ...currentParams,
    ...updates,
    page:
      resetPage && !("page" in updates)
        ? 1
        : (updates.page ?? currentParams.page),
  };

  const cleanParams: Record<string, string> = {};

  Object.entries(newParams).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    const defaultValue = DEFAULT_PARAMS[key as keyof typeof DEFAULT_PARAMS];
    if (value === defaultValue && key !== "page") {
      return;
    }

    if (key === "page" && value === 1 && !("page" in updates)) {
      return;
    }

    cleanParams[key] = String(value);
  });

  setSearchParams(cleanParams);
}

/**
 * Clear all filters while keeping pagination
 */
export function clearFilters(
  setSearchParams: (params: URLSearchParams | Record<string, string>) => void,
): void {
  setSearchParams({});
}
