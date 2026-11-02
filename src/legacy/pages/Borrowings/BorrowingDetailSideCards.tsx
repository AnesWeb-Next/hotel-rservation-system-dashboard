import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { Borrow } from "@/types/borrow";

export function buildBorrowingSideCards(borrowing: Borrow, isOverdue: boolean) {
  return [
    <Card key="status">
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent>
        <StatusBadge status={borrowing.status} type="borrow" />
      </CardContent>
    </Card>,
    <Card key="dates">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Borrowed</span>
          <span>{formatDate(borrowing.borrowDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Due Date</span>
          <span className={isOverdue ? "text-destructive font-medium" : ""}>
            {formatDate(borrowing.dueDate)}
          </span>
        </div>
        {borrowing.returnedAt && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Returned</span>
            <span>{formatDate(borrowing.returnedAt)}</span>
          </div>
        )}
      </CardContent>
    </Card>,
    ...(borrowing.lateFee && borrowing.lateFee > 0
      ? [
          <Card key="fee">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Late Fee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">
                {formatCurrency(borrowing.lateFee ?? 0)}
              </p>
              {borrowing.daysOverdue && (
                <p className="text-sm text-muted-foreground">
                  {borrowing.daysOverdue} days overdue
                </p>
              )}
            </CardContent>
          </Card>,
        ]
      : []),
    <Card key="info">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Record Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created</span>
          <span>{formatDate(borrowing.createdAt)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Updated</span>
          <span>{formatDate(borrowing.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>,
  ];
}
