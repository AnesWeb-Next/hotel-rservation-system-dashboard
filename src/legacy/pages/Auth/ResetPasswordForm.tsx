import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { passwordSchema } from "@/validations/auth";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { usePasswordStrength } from "./usePasswordStrength";
import { ResetPasswordField } from "./ResetPasswordField";

interface ResetPasswordFormProps {
  onSubmit: () => Promise<void>;
}

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { score: strengthScore } = usePasswordStrength(password);

  const form = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    onSubmit: async () => {
      setIsSubmitting(true);
      await onSubmit();
      setIsSubmitting(false);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="password" validators={{ onChange: passwordSchema }}>
        {(field) => (
          <ResetPasswordField
            id="password"
            label="New Password"
            field={field}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            disabled={isSubmitting}
            placeholder="Enter new password"
            showErrors={false}
            onValueChange={setPassword}
          />
        )}
      </form.Field>

      <PasswordStrengthIndicator password={password} />

      <form.Field
        name="confirmPassword"
        validators={{
          onChangeListenTo: ["password"],
          onChange: ({ value, fieldApi }) => {
            if (value !== fieldApi.form.getFieldValue("password"))
              return "Passwords don't match";
            return undefined;
          },
        }}
      >
        {(field) => (
          <ResetPasswordField
            id="confirmPassword"
            label="Confirm Password"
            field={field}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            disabled={isSubmitting}
            placeholder="Confirm new password"
          />
        )}
      </form.Field>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || strengthScore < 5}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
