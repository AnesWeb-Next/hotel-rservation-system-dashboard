import { formatDate } from "@/lib/utils";
import { User } from "lucide-react";
import type { Author } from "@/types/author";

export function getAuthorsColumns(
  getAuthorBooksCount: (authorId: string) => number,
) {
  return [
    {
      key: "name" as const,
      header: "Name",
      sortable: true,
      render: (author: Author) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{author.name}</p>
            {author.bio && (
              <p className="text-sm text-muted-foreground line-clamp-1 max-w-75">
                {author.bio}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "_id" as const,
      header: "Books",
      className: "w-25",
      render: (author: Author) => (
        <span className="font-medium">{getAuthorBooksCount(author._id)}</span>
      ),
    },
    {
      key: "createdAt" as const,
      header: "Created",
      sortable: true,
      className: "w-[120px]",
      render: (author: Author) => formatDate(author.createdAt),
    },
  ];
}
