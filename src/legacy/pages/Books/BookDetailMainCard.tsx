import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { BookOpen, Tag, Copy } from "lucide-react";
import { toast } from "@/hooks/useToast";
import type { Book } from "@/types/book";
import type { Category } from "@/types/category";

function getCategoryName(category: string | Category | undefined): string {
  if (!category) return "Uncategorized";
  if (typeof category === "string") return category;
  return category.name;
}

export function BookDetailMainCard({ book }: { book: Book }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Book Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {book.cover && (
            <img
              src={book.cover}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md"
            />
          )}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={book.status} type="book" />
              <div className="flex items-center gap-1">
                <span className="text-sm font-mono text-muted-foreground">
                  {book.serialNumber}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(book.serialNumber);
                    toast({
                      title: "Copied",
                      description: "Serial number copied to clipboard.",
                    });
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <Badge variant="secondary">
                {getCategoryName(book.category as Category)}
              </Badge>
            </div>
            <p className="text-muted-foreground">{book.description}</p>
          </div>
        </div>
        {book.keywords && book.keywords.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 text-sm text-muted-foreground">
              Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {book.keywords.map((keyword: string) => (
                <Badge key={keyword} variant="outline" className="gap-1">
                  <Tag className="h-3 w-3" />
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
