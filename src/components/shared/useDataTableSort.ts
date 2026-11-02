import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { createElement } from "react";

type SortDirection = "asc" | "desc" | null;

interface SortState {
  key: string | null;
  direction: SortDirection;
}

export function useDataTableSort<T>(data: T[]) {
  const [sortState, setSortState] = useState<SortState>({
    key: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortState.key as string];
      const bValue = (b as Record<string, unknown>)[sortState.key as string];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortState.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortState]);

  const handleSort = (key: string): void => {
    setSortState((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key: null, direction: null };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortState.key !== key) {
      return createElement(ArrowUpDown, { className: "ml-2 h-4 w-4" });
    }
    if (sortState.direction === "asc") {
      return createElement(ArrowUp, { className: "ml-2 h-4 w-4" });
    }
    return createElement(ArrowDown, { className: "ml-2 h-4 w-4" });
  };

  return { sortedData, handleSort, getSortIcon };
}
