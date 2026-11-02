import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Book } from "@/types/book";

export function BookPricingCard({ book }: { book: Book }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <DollarSign className="h-4 w-4 text-primary" />
          Pricing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Current Price</span>
          <span className="font-bold text-lg text-primary">
            {formatCurrency(book.price.current)}
          </span>
        </div>
        {book.price.original && (
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Original</span>
            <span className="line-through text-muted-foreground">
              {formatCurrency(book.price.original)}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Rental</span>
          <span>{formatCurrency(book.rentalPrice)}/day</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Late Fee</span>
          <span className="text-destructive">
            {formatCurrency(book.lateFeePerDay)}/day
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
