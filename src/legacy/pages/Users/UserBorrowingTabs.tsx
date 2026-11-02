import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate } from "@/lib/utils";
import type { Borrow } from "@/types/borrow";
import { BookOpen } from "lucide-react";

export function getUserBorrowingTabs(borrowings: Borrow[]) {
  return [
    {
      value: "borrowings",
      label: "Borrowing History",
      content: (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Borrowing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {borrowings.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No borrowing history found
              </p>
            ) : (
              <div className="space-y-3">
                {borrowings.slice(0, 5).map((borrowing) => (
                  <div
                    key={borrowing._id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        {typeof borrowing.book === "object"
                          ? (borrowing.book as { title?: string }).title
                          : "Unknown Book"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Due: {formatDate(borrowing.dueDate)}
                      </p>
                    </div>
                    <StatusBadge status={borrowing.status} type="borrow" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ),
    },
  ];
}
