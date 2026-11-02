import { formatDate, getDisplayName } from "@/lib/utils";
import type { Borrow } from "@/types/borrow";
import type { Book } from "@/types/book";
import type { User } from "@/types/user";

interface ProcessBorrowSummaryProps {
  borrowing: Borrow;
}

export function ProcessBorrowSummary({ borrowing }: ProcessBorrowSummaryProps) {
  const bookName = getDisplayName(borrowing.book as string | Book);
  const userName = getDisplayName(borrowing.user as string | User);

  return (
    <div className="space-y-2 text-sm border-b pb-4 mb-4">
      <p>
        <span className="text-muted-foreground">Book:</span>{" "}
        <span className="font-medium">{bookName}</span>
      </p>
      <p>
        <span className="text-muted-foreground">User:</span>{" "}
        <span className="font-medium">{userName}</span>
      </p>
      <p>
        <span className="text-muted-foreground">Borrow Date:</span>{" "}
        {formatDate(borrowing.borrowDate)}
      </p>
      <p>
        <span className="text-muted-foreground">Due Date:</span>{" "}
        {formatDate(borrowing.dueDate)}
      </p>
      {(borrowing.lateFee ?? 0) > 0 && (
        <p className="text-destructive">
          <span className="text-muted-foreground">Late Fee:</span> $
          {borrowing.lateFee?.toFixed(2)}
        </p>
      )}
    </div>
  );
}
