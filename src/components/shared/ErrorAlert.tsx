import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/lib/errorHandling";

interface ErrorAlertProps {
  error: unknown;
  retry?: () => void;
  className?: string;
  retrying?: boolean;
}

export function ErrorAlert({
  error,
  retry,
  className,
  retrying = false,
}: ErrorAlertProps) {
  const message = getErrorMessage(error);

  return (
    <Alert variant="destructive" className={cn("my-4", className)}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-4">
        <span>{message}</span>
        {retry && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={retry}
            disabled={retrying}
            className="shrink-0"
          >
            {retrying ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </>
            )}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
