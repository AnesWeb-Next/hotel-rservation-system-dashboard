import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface BorrowingPendingActionsProps {
  compact: boolean;
  onApprove: () => void;
  onRejectOpen: () => void;
}

export function BorrowingPendingActions({
  compact,
  onApprove,
  onRejectOpen,
}: BorrowingPendingActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        size={compact ? "sm" : "default"}
        variant="default"
        className="gap-2"
        onClick={onApprove}
        type="button"
      >
        <CheckCircle className="h-4 w-4" />
        Approve
      </Button>
      <Button
        size={compact ? "sm" : "default"}
        variant="destructive"
        className="gap-2"
        onClick={onRejectOpen}
        type="button"
      >
        <XCircle className="h-4 w-4" />
        Reject
      </Button>
    </div>
  );
}
