import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate, formatCurrency, getDisplayName } from "@/lib/utils";
import { getDueDateInfo } from "./borrowingsUtils";
import { AlertTriangle, Clock } from "lucide-react";
import type { Borrow } from "@/types/borrow";
import type { Book } from "@/types/book";
import type { User } from "@/types/user";

export function getBorrowingsColumns() {
  return [
    {
      key: "_id" as const,
      header: "ID",
      className: "w-[100px]",
      render: (b: Borrow) => (
        <span className="font-mono text-xs">#{b._id.slice(-6)}</span>
      ),
    },
    {
      key: "book" as const,
      header: "Book",
      sortable: true,
      render: (b: Borrow) => (
        <span className="font-medium">
          {getDisplayName(b.book as string | Book)}
        </span>
      ),
    },
    {
      key: "user" as const,
      header: "Student",
      sortable: true,
      render: (b: Borrow) => (
        <span>{getDisplayName(b.user as string | User)}</span>
      ),
    },
    {
      key: "borrowDate" as const,
      header: "Borrow Date",
      sortable: true,
      render: (b: Borrow) => formatDate(b.borrowDate),
    },
    {
      key: "dueDate" as const,
      header: "Due Date",
      sortable: true,
      render: (b: Borrow) => {
        const { days, isOverdue } = getDueDateInfo(b.dueDate);
        const isActive = b.status === "active" || b.status === "approved";
        return (
          <div className="flex flex-col">
            <span>{formatDate(b.dueDate)}</span>
            {isActive && (
              <span
                className={`text-xs flex items-center gap-1 ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}
              >
                {isOverdue ? (
                  <>
                    <AlertTriangle className="h-3 w-3" />
                    {days} days overdue
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" />
                    {days} days left
                  </>
                )}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "lateFee" as const,
      header: "Late Fee",
      className: "w-[100px]",
      render: (b: Borrow) => (
        <span
          className={(b.lateFee ?? 0) > 0 ? "text-destructive font-medium" : ""}
        >
          {formatCurrency(b.lateFee ?? 0)}
        </span>
      ),
    },
    {
      key: "status" as const,
      header: "Status",
      sortable: true,
      className: "w-[120px]",
      render: (b: Borrow) => (
        <div className={b.status === "overdue" ? "animate-pulse" : ""}>
          <StatusBadge status={b.status} type="borrow" />
        </div>
      ),
    },
  ];
}
