import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@/components/shared/FormFields";
import { getErrorMessage } from "@/components/shared/FormFields";

interface LoginPasswordFieldProps {
  field: AnyFieldApi;
  disabled?: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export function LoginPasswordField({
  field,
  disabled,
  showPassword,
  setShowPassword,
}: LoginPasswordFieldProps) {
  return (
    <>
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={field.state.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            field.handleChange(e.target.value)
          }
          onBlur={field.handleBlur}
          className={cn(
            "pr-10",
            field.state.meta.errors.length > 0 &&
              field.state.meta.isTouched &&
              "border-destructive",
          )}
          disabled={disabled}
          autoComplete="current-password"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      {field.state.meta.errors.length > 0 && field.state.meta.isTouched && (
        <p className="text-sm text-destructive">
          {getErrorMessage(field.state.meta.errors)}
        </p>
      )}
    </>
  );
}
