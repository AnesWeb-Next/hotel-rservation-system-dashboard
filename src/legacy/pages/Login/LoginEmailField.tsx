import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@/components/shared/FormFields";
import { getErrorMessage } from "@/components/shared/FormFields";

interface LoginEmailFieldProps {
  field: AnyFieldApi;
  disabled?: boolean;
}

export function LoginEmailField({ field, disabled }: LoginEmailFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="admin@library.com"
        value={field.state.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          field.handleChange(e.target.value)
        }
        onBlur={field.handleBlur}
        className={cn(
          field.state.meta.errors.length > 0 &&
            field.state.meta.isTouched &&
            "border-destructive",
        )}
        disabled={disabled}
        autoComplete="email"
      />
      {field.state.meta.errors.length > 0 && field.state.meta.isTouched && (
        <p className="text-sm text-destructive">
          {getErrorMessage(field.state.meta.errors)}
        </p>
      )}
    </div>
  );
}
