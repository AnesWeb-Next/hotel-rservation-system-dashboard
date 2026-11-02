import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Book } from "@/types/book";

export function BookDatesCard({ book }: { book: Book }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Calendar className="h-4 w-4 text-primary" />
          Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Created</span>
          <span className="text-sm">{formatDate(book.createdAt)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Updated</span>
          <span className="text-sm">{formatDate(book.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
