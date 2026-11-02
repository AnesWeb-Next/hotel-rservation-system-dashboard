import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { AnyFieldApi } from "@/components/shared/FormFields";

interface LoginRememberMeFieldProps {
  field: AnyFieldApi<boolean>;
  disabled?: boolean;
}

export function LoginRememberMeField({
  field,
  disabled,
}: LoginRememberMeFieldProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={field.state.value}
          onCheckedChange={(checked: boolean | "indeterminate") =>
            field.handleChange(checked === true)
          }
          disabled={disabled}
        />
        <Label htmlFor="rememberMe" className="text-sm font-normal">
          Remember me
        </Label>
      </div>
      <Button type="button" variant="link" className="px-0 text-sm" asChild>
        <Link to="/auth/forgot-password">Forgot password?</Link>
      </Button>
    </div>
  );
}
