import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "./FormField";
import { FieldInfo } from "./FormField";

interface TextareaFieldProps {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function TextareaField({
  field,
  label,
  placeholder,
  rows = 3,
  required = false,
  disabled = false,
  className,
}: TextareaFieldProps): React.JSX.Element {
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        id={field.name}
        name={field.name}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        rows={rows}
        disabled={disabled}
        className={cn(hasError && "border-destructive")}
      />
      <FieldInfo field={field} />
    </div>
  );
}
