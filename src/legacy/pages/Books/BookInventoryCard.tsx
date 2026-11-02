import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import type { Book } from "@/types/book";

export function BookInventoryCard({ book }: { book: Book }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4 text-primary" />
          Inventory
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Total Stock</span>
          <span className="font-medium">{book.totalStock}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Available</span>
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            {book.availableStock}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Borrowed</span>
          <Badge variant="secondary">{book.totalStock - book.availableStock}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
