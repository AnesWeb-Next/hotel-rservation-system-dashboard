import { DEFAULT_PARAMS, type ParsedSearchParams } from "./searchParamsTypes";

/**
 * Parse URL search parameters into typed values
 *
 * Extracts values from URLSearchParams and converts them to the correct types.
 * Applies default values for missing parameters.
 */
export function parseSearchParams(
  searchParams: URLSearchParams,
): ParsedSearchParams {
  const pageParam = searchParams.get("page");
  const page = Math.max(1, Number(pageParam) || DEFAULT_PARAMS.page);

  const limitParam = searchParams.get("limit");
  const parsedLimit = Number(limitParam) || DEFAULT_PARAMS.limit;
  const limit = Math.min(100, Math.max(1, parsedLimit));

  const sortBy = searchParams.get("sortBy") || DEFAULT_PARAMS.sortBy;
  const sortOrderParam = searchParams.get("sortOrder");
  const sortOrder =
    sortOrderParam === "asc" || sortOrderParam === "desc"
      ? sortOrderParam
      : DEFAULT_PARAMS.sortOrder;

  const search = searchParams.get("search") || DEFAULT_PARAMS.search;

  const hotel = searchParams.get("hotel") || DEFAULT_PARAMS.hotel;
  const status = searchParams.get("status") || DEFAULT_PARAMS.status;

  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;

  return {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    hotel,
    status,
    minPrice,
    maxPrice,
  };
}
