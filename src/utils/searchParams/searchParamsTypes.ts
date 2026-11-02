/**
 * Search parameter types and defaults for URL-based filtering
 */

export const DEFAULT_PARAMS = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc" as const,
  search: "",
  hotel: "",
  status: "",
  minPrice: undefined,
  maxPrice: undefined,
} as const;

/**
 * Parsed search parameters type
 * All values are typed and have defaults applied
 */
export interface ParsedSearchParams {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  hotel: string;
  status: string;
  minPrice?: number;
  maxPrice?: number;
}
