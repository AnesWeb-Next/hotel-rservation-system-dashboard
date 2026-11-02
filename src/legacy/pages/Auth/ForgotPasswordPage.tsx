import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema } from "@/validations/auth";
import { ForgotPasswordSuccess } from "./ForgotPasswordSuccess";

export function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async () => {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
    },
  });

  if (isSuccess) return <ForgotPasswordSuccess />;

  return (
    <>
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Forgot Password?</h2>
        <p className="text-gray-400 mt-2">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-6"
      >
        <form.Field
          name="email"
          validators={{ onChange: forgotPasswordSchema.shape.email }}
        >
          {(field) => (
            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@library.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={cn(
                  field.state.meta.errors.length > 0 &&
                    field.state.meta.isTouched &&
                    "border-destructive",
                )}
                disabled={isSubmitting}
                autoComplete="email"
              />
              {field.state.meta.errors.length > 0 &&
                field.state.meta.isTouched && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
            </div>
          )}
        </form.Field>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </form>
    </>
  );
}
