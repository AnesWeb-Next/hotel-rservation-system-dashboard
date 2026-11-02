import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/types/book";
import type { Category } from "@/types/category";
import { BookOpen } from "lucide-react";

function getCategoryName(category: string | Category | undefined): string {
  if (!category) return "Uncategorized";
  if (typeof category === "string") return category;
  return category.name;
}

interface AuthorBooksListProps {
  books: Book[];
}

export function AuthorBooksList({ books }: AuthorBooksListProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {books.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No books by this author yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {books.map((book) => (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{book.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {book.serialNumber}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryName(book.category as Category)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      book.status === "in-shelf" ? "default" : "destructive"
                    }
                  >
                    {book.status === "in-shelf" ? "Available" : "Out of Stock"}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {book.availableStock}/{book.totalStock} in stock
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
