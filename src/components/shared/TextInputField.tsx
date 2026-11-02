import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "./FormField";
import { FieldInfo } from "./FormField";

interface TextInputFieldProps {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function TextInputField({
  field,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  className,
}: TextInputFieldProps): React.JSX.Element {
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
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        disabled={disabled}
        className={cn(hasError && "border-destructive")}
      />
      <FieldInfo field={field} />
    </div>
  );
}
