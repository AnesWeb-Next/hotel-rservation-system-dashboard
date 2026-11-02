import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { FilterOption, FilterValue } from "./filterTypes";

interface ActiveFilterBadgesProps {
  filters: FilterOption[];
  values: FilterValue;
  onClearFilter: (key: string) => void;
}

export function ActiveFilterBadges({
  filters,
  values,
  onClearFilter,
}: ActiveFilterBadgesProps) {
  const activeFiltersCount = Object.values(values).filter(
    (v) => v !== undefined && v !== "",
  ).length;

  if (activeFiltersCount === 0) return null;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {filters.map((filter) => {
        const value = values[filter.key];
        if (value === undefined || value === "") return null;

        const displayValue =
          filter.type === "select"
            ? (filter.options?.find((o) => o.value === String(value))?.label ??
              value)
            : value;

        return (
          <Badge key={filter.key} variant="secondary" className="gap-1 pr-1">
            {filter.label}: {displayValue}
            <button
              type="button"
              onClick={() => onClearFilter(filter.key)}
              className="ml-1 hover:bg-muted rounded-full p-0.5"
              aria-label={`Clear ${filter.label} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}
    </div>
  );
}
