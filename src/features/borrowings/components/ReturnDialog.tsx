import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { Borrow } from "@/types/borrow";

interface ReturnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  borrowing: Borrow;
  bookName: string;
  userName: string;
  onConfirm: () => void;
}

export function ReturnDialog({
  open,
  onOpenChange,
  borrowing,
  bookName,
  userName,
  onConfirm,
}: ReturnDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Mark as Returned"
      description={
        <div className="space-y-2">
          <p>Confirm that the following book has been returned:</p>
          <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
            <p>
              <strong>Book:</strong> {bookName}
            </p>
            <p>
              <strong>Student:</strong> {userName}
            </p>
            <p>
              <strong>Due Date:</strong> {formatDate(borrowing.dueDate)}
            </p>
            {(borrowing.lateFee ?? 0) > 0 && (
              <p className="text-destructive">
                <strong>Late Fee:</strong>{" "}
                {formatCurrency(borrowing.lateFee ?? 0)}
              </p>
            )}
          </div>
        </div>
      }
      confirmLabel="Confirm Return"
      onConfirm={onConfirm}
      variant="default"
    />
  );
}
