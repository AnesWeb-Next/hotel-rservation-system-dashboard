import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "./FormField";
import { FieldInfo } from "./FormField";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function SelectField({
  field,
  label,
  placeholder = "Select an option",
  options,
  required = false,
  disabled = false,
  className,
}: SelectFieldProps): React.JSX.Element {
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select
        value={field.state.value}
        onValueChange={field.handleChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={field.name}
          className={cn(hasError && "border-destructive")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldInfo field={field} />
    </div>
  );
}
