import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function ForgotPasswordSuccess() {
  return (
    <div className="flex flex-col gap-6 text-center">
      <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      <h2 className="text-xl font-semibold">Check your email</h2>
      <p className="text-muted-foreground">
        We've sent a password reset link to your email address. Please check
        your inbox and follow the instructions.
      </p>
      <Link to="/auth/login">
        <Button className="w-full mt-4" type="button">
          Back to Login
        </Button>
      </Link>
    </div>
  );
}
