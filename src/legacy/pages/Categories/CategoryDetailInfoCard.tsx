import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Category } from "@/types/category";

interface CategoryDetailInfoCardProps {
  category: Category;
}

export function CategoryDetailInfoCard({ category }: CategoryDetailInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Category ID</p>
          <p className="font-mono text-sm">{category._id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Created</p>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p>{formatDate(category.createdAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
