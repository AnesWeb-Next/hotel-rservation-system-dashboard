import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { loginSchema } from "@/validations/auth";
import { LoginEmailField } from "./LoginEmailField";
import { LoginPasswordField } from "./LoginPasswordField";
import { LoginRememberMeField } from "./LoginRememberMeField";

interface LoginFormProps {
  onSubmit: (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<void>;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: { email: "", password: "", rememberMe: false },
    onSubmit: async ({ value }) => onSubmit(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <form.Field
        name="email"
        validators={{ onChange: loginSchema.shape.email }}
      >
        {(field) => <LoginEmailField field={field} disabled={isLoading} />}
      </form.Field>
      <form.Field
        name="password"
        validators={{ onChange: loginSchema.shape.password }}
      >
        {(field) => (
          <LoginPasswordField
            field={field}
            disabled={isLoading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
      </form.Field>
      <form.Field name="rememberMe">
        {(field) => (
          <LoginRememberMeField field={field} disabled={isLoading} />
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || isSubmitting || isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
