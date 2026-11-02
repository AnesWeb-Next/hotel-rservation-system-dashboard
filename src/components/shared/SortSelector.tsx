import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface SortOption {
  value: string;
  label: string;
}

interface SortSelectorProps {
  options: SortOption[];
  value: string;
  order: "asc" | "desc";
  onSortChange: (value: string, order: "asc" | "desc") => void;
  className?: string;
}

export function SortSelector({
  options,
  value,
  order,
  onSortChange,
  className,
}: SortSelectorProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  const handleOptionClick = (optionValue: string): void => {
    if (optionValue === value) {
      // Toggle order if same field
      onSortChange(optionValue, order === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending
      onSortChange(optionValue, "desc");
    }
  };

  const toggleOrder = (): void => {
    onSortChange(value, order === "asc" ? "desc" : "asc");
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2" type="button">
            <ArrowUpDown className="h-4 w-4" />
            Sort by: {selectedOption?.label ?? "Select"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={cn(
                "cursor-pointer",
                value === option.value && "font-medium"
              )}
            >
              {option.label}
              {value === option.value && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleOrder}
        aria-label={`Sort ${order === "asc" ? "ascending" : "descending"}`}
        type="button"
      >
        {order === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
