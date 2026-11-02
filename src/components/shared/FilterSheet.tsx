import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilterSheetForm } from "./FilterSheetForm";
import type { FilterOption, FilterValue } from "./filterTypes";

export type { FilterOption, FilterValue };

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  filters: FilterOption[];
  values: FilterValue;
  onChange: (values: FilterValue) => void;
  onApply?: () => void;
  onClear: () => void;
}

export function FilterSheet({
  open,
  onOpenChange,
  title = "Filters",
  description = "Apply filters to narrow down results",
  filters,
  values,
  onChange,
  onApply,
  onClear,
}: FilterSheetProps) {
  const activeFiltersCount = Object.values(values).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const handleApply = (): void => {
    onApply?.();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-6 ">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <FilterSheetForm filters={filters} values={values} onChange={onChange} />

        <SheetFooter className="shrink-0 border-t pt-4 gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={onClear}
            disabled={activeFiltersCount === 0}
            className="flex-1"
            type="button"
          >
            Clear All
            {activeFiltersCount > 0 && (
              <span className="ml-1 text-muted-foreground">
                ({activeFiltersCount})
              </span>
            )}
          </Button>
          <Button onClick={handleApply} className="flex-1" type="button">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
