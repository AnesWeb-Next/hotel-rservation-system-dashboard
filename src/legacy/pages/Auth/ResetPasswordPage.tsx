import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/useToast";
import { ResetPasswordForm } from "./ResetPasswordForm";

export function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const isValidToken = token && token.length > 10;

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
    toast({
      title: "Password Reset Successful",
      description: "Your password has been reset. You can now log in.",
      variant: "success",
    });
    setTimeout(() => navigate("/login"), 2000);
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold">Invalid or Expired Link</h2>
            <p className="text-muted-foreground">
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
            <Link to="/forgot-password">
              <Button className="w-full mt-4" type="button">
                Request New Link
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold">Password Reset Complete</h2>
            <p className="text-muted-foreground">
              Your password has been successfully reset. Redirecting to login...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <p className="text-muted-foreground mt-2">
              Enter your new password below.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResetPasswordForm onSubmit={handleSubmit} />
          <Link
            to="/login"
            className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
