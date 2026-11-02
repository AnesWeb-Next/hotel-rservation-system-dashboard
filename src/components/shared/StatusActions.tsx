import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { StatusAction } from "@/lib/status-transitions";
import { StatusConfirmDialog } from "./StatusConfirmDialog";

interface StatusActionsProps {
  actions: StatusAction[];
  onStatusChange: (newStatus: string) => Promise<void>;
  size?: "default" | "sm";
}

export function StatusActions({
  actions,
  onStatusChange,
  size = "default",
}: StatusActionsProps) {
  const [loading, setLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<StatusAction | null>(null);

  if (actions.length === 0) return null;

  const handleAction = async (action: StatusAction) => {
    if (action.requiresConfirmation) {
      setConfirmAction(action);
      return;
    }
    await executeAction(action);
  };

  const executeAction = async (action: StatusAction) => {
    setLoading(true);
    try {
      await onStatusChange(action.newStatus);
    } finally {
      setLoading(false);
      setConfirmAction(null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {actions.map((action) => (
          <Button
            key={action.newStatus}
            type="button"
            variant={action.variant}
            size={size}
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              handleAction(action);
            }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {action.label}
          </Button>
        ))}
      </div>

      <StatusConfirmDialog
        action={confirmAction}
        loading={loading}
        onConfirm={executeAction}
        onCancel={() => setConfirmAction(null)}
      />
    </>
  );
}
