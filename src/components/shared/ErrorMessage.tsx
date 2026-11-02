import React from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <Card className="border-destructive bg-destructive/10">
      <CardContent className="flex items-center gap-3 p-4">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
        <p className="text-sm text-destructive">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto text-sm text-destructive hover:underline"
          >
            Dismiss
          </button>
        )}
      </CardContent>
    </Card>
  );
}
