import type { FilterValue } from "@/components/shared/FilterPanel";

export function parseFiltersFromUrl(
  searchParams: URLSearchParams,
): FilterValue {
  const result: FilterValue = {};
  for (const [key, value] of searchParams.entries()) {
    if (key !== "page" && key !== "pageSize") {
      const numValue = Number(value);
      result[key] = Number.isNaN(numValue) ? value : numValue;
    }
  }
  return result;
}

export function parseCurrentPage(searchParams: URLSearchParams): number {
  const page = searchParams.get("page");
  const parsed = page ? Number.parseInt(page, 10) : 1;
  return parsed > 0 ? parsed : 1;
}

export function parsePageSize(
  searchParams: URLSearchParams,
  defaultPageSize: number,
): number {
  const size = searchParams.get("pageSize");
  const parsed = size ? Number.parseInt(size, 10) : defaultPageSize;
  return parsed > 0 ? parsed : defaultPageSize;
}
