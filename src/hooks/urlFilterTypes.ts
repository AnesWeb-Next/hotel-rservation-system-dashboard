import type { FilterValue } from "@/components/shared/FilterPanel";

export interface UseUrlFiltersOptions {
  defaultPageSize?: number;
}

export interface UseUrlFiltersReturn {
  filters: FilterValue;
  currentPage: number;
  pageSize: number;
  setFilters: (filters: FilterValue) => void;
  updateFilter: (key: string, value: string | number | undefined) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}
