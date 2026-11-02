import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { FilterValue } from "@/components/shared/FilterPanel";
import type { UseUrlFiltersOptions, UseUrlFiltersReturn } from "./urlFilterTypes";
import {
  parseFiltersFromUrl,
  parseCurrentPage,
  parsePageSize,
} from "./urlFilterParsers";
export function useUrlFilters(
  options: UseUrlFiltersOptions = {},
): UseUrlFiltersReturn {
  const { defaultPageSize = 10 } = options;
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(
    () => parseFiltersFromUrl(searchParams),
    [searchParams],
  );
  const currentPage = useMemo(
    () => parseCurrentPage(searchParams),
    [searchParams],
  );

  const pageSize = useMemo(
    () => parsePageSize(searchParams, defaultPageSize),
    [searchParams, defaultPageSize],
  );

  const setFilters = useCallback(
    (newFilters: FilterValue): void => {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(newFilters)) {
        if (value !== undefined && value !== "") {
          params.set(key, String(value));
        }
      }
      params.set("page", "1");
      const currentPageSize = searchParams.get("pageSize");
      if (currentPageSize) {
        params.set("pageSize", currentPageSize);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const updateFilter = useCallback(
    (key: string, value: string | number | undefined): void => {
      const params = new URLSearchParams(searchParams);
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
      params.set("page", "1");
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const clearFilters = useCallback((): void => {
    const params = new URLSearchParams();
    const currentPageSize = searchParams.get("pageSize");
    if (currentPageSize) {
      params.set("pageSize", currentPageSize);
    }
    setSearchParams(params, { replace: true });
  }, [searchParams, setSearchParams]);

  const setPage = useCallback(
    (page: number): void => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(page));
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const setPageSize = useCallback(
    (size: number): void => {
      const params = new URLSearchParams(searchParams);
      params.set("pageSize", String(size));
      params.set("page", "1");
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  return {
    filters,
    currentPage,
    pageSize,
    setFilters,
    updateFilter,
    clearFilters,
    setPage,
    setPageSize,
  };
}
