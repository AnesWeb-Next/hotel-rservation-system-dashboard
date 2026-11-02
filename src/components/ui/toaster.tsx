import React from "react";
import { useToast } from "@/hooks/useToast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id} variant={toastItem.variant}>
          <div className="grid gap-1">
            {toastItem.title ? (
              <ToastTitle>{toastItem.title}</ToastTitle>
            ) : null}
            {toastItem.description ? (
              <ToastDescription>{toastItem.description}</ToastDescription>
            ) : null}
          </div>
          {toastItem.action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
