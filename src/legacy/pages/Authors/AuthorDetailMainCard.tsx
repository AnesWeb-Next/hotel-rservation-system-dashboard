import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Author } from "@/types/author";
import { User, Calendar } from "lucide-react";

interface AuthorDetailMainCardProps {
  author: Author;
}

export function AuthorDetailMainCard({ author }: AuthorDetailMainCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Author Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Author info */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center shrink-0">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-bold">{author.name}</h2>
            {author.bio && (
              <p className="text-muted-foreground whitespace-pre-wrap">
                {author.bio}
              </p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Created: {formatDate(author.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Updated: {formatDate(author.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
