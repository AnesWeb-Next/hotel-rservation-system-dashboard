import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/useToast";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  const navigate = useNavigate();
  const { isLoading, error, login, clearAuthError } = useAuth();

  useEffect(() => {
    if (error) {
      toast({
        title: "Login Failed",
        description: error,
        variant: "destructive",
      });
      clearAuthError();
    }
  }, [error, clearAuthError]);

  const handleSubmit = async (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    const success = await login(values);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
        variant: "success",
      });
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <div className="text-center my-6">
        <h2 className="text-xl">Welcome Back !</h2>
        <p className="text-gray-400">
          Sign in to continue to your Digital Library
        </p>
      </div>
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
