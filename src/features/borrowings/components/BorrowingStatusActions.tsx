import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import type { Borrow } from "@/types/borrow";
import { BorrowingPendingActions } from "./BorrowingPendingActions";
import { BorrowingActiveActions } from "./BorrowingActiveActions";

interface BorrowingStatusActionsProps {
  borrowing: Borrow;
  compact: boolean;
  onApprove: () => void;
  onRejectOpen: () => void;
  onReturnOpen: () => void;
  onExtendOpen: () => void;
  onReminderOpen: () => void;
  onContactOpen: () => void;
}

export function BorrowingStatusActions(props: BorrowingStatusActionsProps) {
  const {
    borrowing,
    compact,
    onApprove,
    onRejectOpen,
    onReturnOpen,
    onExtendOpen,
    onReminderOpen,
    onContactOpen,
  } = props;

  switch (borrowing.status) {
    case "pending":
      return (
        <BorrowingPendingActions
          compact={compact}
          onApprove={onApprove}
          onRejectOpen={onRejectOpen}
        />
      );
    case "approved":
    case "active":
      return (
        <BorrowingActiveActions
          compact={compact}
          isOverdue={false}
          onReturnOpen={onReturnOpen}
          onExtendOpen={onExtendOpen}
          onReminderOpen={onReminderOpen}
          onContactOpen={onContactOpen}
        />
      );
    case "overdue":
      return (
        <BorrowingActiveActions
          compact={compact}
          isOverdue
          onReturnOpen={onReturnOpen}
          onExtendOpen={onExtendOpen}
          onReminderOpen={onReminderOpen}
          onContactOpen={onContactOpen}
        />
      );
    case "returned":
      return (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Returned on{" "}
            {borrowing.returnedAt ? formatDate(borrowing.returnedAt) : "N/A"}
          </Badge>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        </div>
      );
    default:
      return <div />;
  }
}
