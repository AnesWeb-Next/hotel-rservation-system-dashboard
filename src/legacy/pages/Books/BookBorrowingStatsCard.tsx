import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import type { Borrow } from "@/types/borrow";

export function BookBorrowingStatsCard({ borrowings }: { borrowings: Borrow[] }) {
  const activeBorrowings = borrowings.filter(
    (b) => b.status === "active" || b.status === "overdue",
  );
  const returnedBorrowings = borrowings.filter((b) => b.status === "returned");

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Users className="h-4 w-4 text-primary" />
          Borrowing Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Times Borrowed</span>
          <span className="font-medium">{borrowings.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Currently Borrowed</span>
          <Badge variant={activeBorrowings.length > 0 ? "default" : "secondary"}>
            {activeBorrowings.length}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Returned</span>
          <span>{returnedBorrowings.length}</span>
        </div>
      </CardContent>
    </Card>
  );
}
