import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookOpen, BookX } from "lucide-react";

interface CategoryDetailStatsProps {
  stats: {
    total: number;
    available: number;
    outOfStock: number;
    totalCopies: number;
    availableCopies: number;
  };
}

export function CategoryDetailStats({ stats }: CategoryDetailStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Books
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{stats.total}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold">{stats.available}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Out of Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <BookX className="h-5 w-5 text-destructive" />
            <span className="text-2xl font-bold">{stats.outOfStock}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Copies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.availableCopies}/{stats.totalCopies}
          </div>
          <p className="text-xs text-muted-foreground">Available / Total</p>
        </CardContent>
      </Card>
    </div>
  );
}
