import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "./FormField";
import { FieldInfo } from "./FormField";

interface NumberInputFieldProps {
  field: AnyFieldApi<number>;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function NumberInputField({
  field,
  label,
  placeholder,
  min,
  max,
  step = 1,
  required = false,
  disabled = false,
  className,
}: NumberInputFieldProps): React.JSX.Element {
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={field.name}
        name={field.name}
        type="number"
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(hasError && "border-destructive")}
      />
      <FieldInfo field={field} />
    </div>
  );
}
