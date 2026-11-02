import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { StatusAction } from "@/lib/status-transitions";

interface StatusConfirmDialogProps {
  action: StatusAction | null;
  loading: boolean;
  onConfirm: (action: StatusAction) => void;
  onCancel: () => void;
}

export function StatusConfirmDialog({
  action,
  loading,
  onConfirm,
  onCancel,
}: StatusConfirmDialogProps) {
  return (
    <AlertDialog
      open={action !== null}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            {action?.confirmMessage ?? "Are you sure you want to proceed?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={() => {
              if (action) {
                onConfirm(action);
              }
            }}
            className={
              action?.variant === "destructive"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : undefined
            }
          >
            {loading ? "Processing..." : (action?.label ?? "Confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
