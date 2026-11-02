import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/lib/errorHandling";
import { useNavigate } from "react-router";

interface ErrorPageProps {
  error?: unknown;
  title?: string;
  onRetry?: () => void;
  showGoHome?: boolean;
  className?: string;
}

export function ErrorPage({
  error,
  title = "Something went wrong",
  onRetry,
  showGoHome = true,
  className,
}: ErrorPageProps) {
  const navigate = useNavigate();
  const message = error
    ? getErrorMessage(error)
    : "An unexpected error occurred. Please try again.";

  return (
    <div
      className={cn(
        "flex min-h-100 items-center justify-center p-8",
        className,
      )}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">{message}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            {onRetry && (
              <Button type="button" onClick={onRetry} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            {showGoHome && (
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
