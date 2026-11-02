import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@/components/shared/FormFields";

interface ResetPasswordFieldProps {
  id: string;
  label: string;
  field: AnyFieldApi;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
  showErrors?: boolean;
  onValueChange?: (value: string) => void;
}

export function ResetPasswordField({
  id,
  label,
  field,
  showPassword,
  setShowPassword,
  disabled,
  placeholder,
  showErrors = true,
  onValueChange,
}: ResetPasswordFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={field.state.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            field.handleChange(e.target.value);
            onValueChange?.(e.target.value);
          }}
          onBlur={field.handleBlur}
          className={cn(
            "pr-10",
            field.state.meta.errors.length > 0 &&
              field.state.meta.isTouched &&
              "border-destructive",
          )}
          disabled={disabled}
          autoComplete="new-password"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      {showErrors &&
        field.state.meta.errors.length > 0 &&
        field.state.meta.isTouched && (
          <p className="text-sm text-destructive">
            {field.state.meta.errors.join(", ")}
          </p>
        )}
    </div>
  );
}
