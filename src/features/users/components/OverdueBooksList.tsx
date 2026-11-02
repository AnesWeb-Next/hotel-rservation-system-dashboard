import { BookOpen } from "lucide-react";
import type { Borrow } from "@/types/borrow";

interface OverdueBooksListProps {
  overdueBorrowings: Borrow[];
}

export function OverdueBooksList({ overdueBorrowings }: OverdueBooksListProps) {
  if (overdueBorrowings.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Overdue Books:</p>
      <ul className="text-sm text-muted-foreground space-y-1">
        {overdueBorrowings.slice(0, 5).map((b) => (
          <li key={b._id} className="flex items-center gap-2">
            <BookOpen className="h-3 w-3" />
            {typeof b.book === "string" ? b.book : (b.book?.title ?? "Unknown")}
          </li>
        ))}
        {overdueBorrowings.length > 5 && (
          <li className="text-muted-foreground">
            ...and {overdueBorrowings.length - 5} more
          </li>
        )}
      </ul>
    </div>
  );
}
