import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterInput } from "./FilterInput";
import { ActiveFilterBadges } from "./ActiveFilterBadges";
import type { FilterOption, FilterValue } from "./filterTypes";
export type { FilterOption, FilterValue };

interface FilterPanelProps {
  filters: FilterOption[];
  values: FilterValue;
  onChange: (values: FilterValue) => void;
  onClear: () => void;
}

export function FilterPanel({
  filters,
  values,
  onChange,
  onClear,
}: FilterPanelProps) {
  const [open, setOpen] = useState(false);

  const activeFiltersCount = Object.values(values).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const handleFilterChange = (key: string, value: string | number): void => {
    onChange({
      ...values,
      [key]: value === "" ? undefined : value,
    });
  };

  const handleClearFilter = (key: string): void => {
    const newValues = { ...values };
    delete newValues[key];
    onChange(newValues);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2" type="button">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClear}
                  className="h-8 px-2 text-xs"
                  type="button"
                >
                  Clear all
                </Button>
              )}
            </div>
            {filters.map((filter) => (
              <div key={filter.key} className="space-y-2">
                <Label htmlFor={filter.key}>{filter.label}</Label>
                <FilterInput
                  filter={filter}
                  value={values[filter.key]}
                  onChange={handleFilterChange}
                />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <ActiveFilterBadges
        filters={filters}
        values={values}
        onClearFilter={handleClearFilter}
      />
    </div>
  );
}
