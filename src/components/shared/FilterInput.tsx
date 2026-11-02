import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOption } from "./filterTypes";

interface FilterInputProps {
  filter: FilterOption;
  value: string | number | undefined;
  onChange: (key: string, value: string | number) => void;
  filterEmptyOptions?: boolean;
  selectTriggerClassName?: string;
}

export function FilterInput({
  filter,
  value,
  onChange,
  filterEmptyOptions = false,
  selectTriggerClassName,
}: FilterInputProps) {
  switch (filter.type) {
    case "select": {
      const options = filterEmptyOptions
        ? filter.options?.filter((option) => option.value !== "")
        : filter.options;
      return (
        <Select
          value={String(value ?? "")}
          onValueChange={(v) => onChange(filter.key, v)}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder={filter.placeholder ?? "Select..."} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    case "number":
      return (
        <Input
          type="number"
          placeholder={filter.placeholder}
          value={value ?? ""}
          onChange={(e) =>
            onChange(filter.key, e.target.value ? Number(e.target.value) : "")
          }
        />
      );
    case "date":
      return (
        <Input
          type="date"
          placeholder={filter.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(filter.key, e.target.value)}
        />
      );
    default:
      return (
        <Input
          type="text"
          placeholder={filter.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(filter.key, e.target.value)}
        />
      );
  }
}
