import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface AnyFieldApi<T = string> {
  name: string;
  state: {
    value: T;
    meta: {
      errors: unknown[];
      isTouched: boolean;
    };
  };
  handleChange(value: T): void;
  handleBlur(): void;
}

interface FieldInfoProps {
  field: AnyFieldApi<unknown>;
}

export function FieldInfo({ field }: FieldInfoProps) {
  const errors = field.state.meta.errors;
  if (errors.length === 0) return null;

  return (
    <p className="text-sm text-destructive mt-1">
      {errors
        .map((error: unknown) => {
          if (typeof error === "string") return error;
          if (error && typeof error === "object" && "message" in error) {
            return String((error as { message: unknown }).message);
          }
          return "";
        })
        .filter(Boolean)
        .join(", ")}
    </p>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  error?: string;
}

export function FormField({
  label,
  required = false,
  className,
  children,
  error,
}: FormFieldProps): React.JSX.Element {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
