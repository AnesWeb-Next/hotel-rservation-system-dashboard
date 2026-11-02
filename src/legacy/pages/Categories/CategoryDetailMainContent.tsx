import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { CategoryDetailStats } from "@/pages/Categories/CategoryDetailStats";
import { categoryBooksColumns } from "@/pages/Categories/categoryBooksColumns";
import { Book } from "lucide-react";
import type { Book as BookType } from "@/types/book";

interface CategoryDetailMainContentProps {
  categoryBooks: BookType[];
  stats: { total: number; available: number; outOfStock: number; totalCopies: number; availableCopies: number };
  onBookClick: (bookId: string) => void;
  onAddBooks: () => void;
}

export function CategoryDetailMainContent({
  categoryBooks, stats, onBookClick, onAddBooks,
}: CategoryDetailMainContentProps) {
  return (
    <div className="space-y-6">
      <CategoryDetailStats stats={stats} />
      <Card>
        <CardHeader>
          <CardTitle>Books in this Category ({categoryBooks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {categoryBooks.length > 0 ? (
            <DataTable
              data={categoryBooks}
              columns={categoryBooksColumns}
              emptyMessage="No books in this category."
              onRowClick={(book) => onBookClick(book._id)}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No books in this category yet.</p>
              <Button type="button" variant="outline" className="mt-4" onClick={onAddBooks}>
                Add Books
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
