import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { FilterInput } from "./FilterInput";
import type { FilterOption, FilterValue } from "./filterTypes";

interface FilterSheetFormProps {
  filters: FilterOption[];
  values: FilterValue;
  onChange: (values: FilterValue) => void;
}

export function FilterSheetForm({
  filters,
  values,
  onChange,
}: FilterSheetFormProps) {
  const handleFilterChange = (key: string, value: string | number): void => {
    onChange({ ...values, [key]: value === "" ? undefined : value });
  };

  return (
    <div className="flex-1 overflow-y-auto py-6 px-2 flex flex-col gap-4">
      {filters.map((filter) => (
        <div key={filter.key} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={filter.key} className="text-sm font-medium">
              {filter.label}
            </Label>
            {values[filter.key] !== undefined &&
              values[filter.key] !== "" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    onChange({ ...values, [filter.key]: undefined })
                  }
                  type="button"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
          </div>
          <FilterInput
            filter={filter}
            value={values[filter.key]}
            onChange={handleFilterChange}
            filterEmptyOptions
            selectTriggerClassName="w-full"
          />
        </div>
      ))}
    </div>
  );
}
