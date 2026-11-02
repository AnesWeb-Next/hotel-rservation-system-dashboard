import type { RoomFilterParams } from "@/types/api/apiParams";
import { DEFAULT_PARAMS, type ParsedSearchParams } from "./searchParamsTypes";

/**
 * Build URLSearchParams from a parameters object
 *
 * Converts a typed parameters object into URLSearchParams.
 * Filters out empty/undefined values and defaults to keep URLs clean.
 */
export function buildSearchParams(params: Partial<ParsedSearchParams>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    const defaultValue = DEFAULT_PARAMS[key as keyof typeof DEFAULT_PARAMS];
    if (value === defaultValue) {
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams.toString();
}

/**
 * Convert parsed params to API filter params
 *
 * Transforms the URL params into the format expected by the API.
 */
export function toApiParams(params: ParsedSearchParams): RoomFilterParams {
  const apiParams: RoomFilterParams = {
    page: params.page,
    limit: params.limit,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
  };

  if (params.search) {
    apiParams.search = params.search;
  }

  if (params.hotel) {
    apiParams.hotel = params.hotel;
  }

  if (params.status === "in-shelf" || params.status === "out-of-stock") {
    apiParams.status = params.status;
  }

  if (params.minPrice !== undefined) {
    apiParams.minPrice = params.minPrice;
  }

  if (params.maxPrice !== undefined) {
    apiParams.maxPrice = params.maxPrice;
  }

  return apiParams;
}
