import { Badge } from "@/components/ui/badge";
import { BookOpen, AlertTriangle } from "lucide-react";
import type { User } from "@/types/user";

export type BorrowingStats = { active: number; overdue: number; total: number };

export function UserNameCell({
  user,
  stats,
}: {
  user: User;
  stats: BorrowingStats;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-medium">
        {user.firstName} {user.lastName}
      </span>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <BookOpen className="h-3 w-3" />
          {stats.active} active
        </span>
        {stats.overdue > 0 && (
          <span className="flex items-center gap-1 text-destructive">
            <AlertTriangle className="h-3 w-3" />
            {stats.overdue} overdue
          </span>
        )}
      </div>
    </div>
  );
}

export function BorrowLimitCell({ user }: { user: User }) {
  const borrowed = user.books.borrowed.length;
  const limit = user.borrowLimit;
  const isNearLimit = borrowed >= limit * 0.8;
  const isAtLimit = borrowed >= limit;
  return (
    <Badge
      variant={
        isAtLimit ? "destructive" : isNearLimit ? "outline" : "secondary"
      }
      className={
        isNearLimit && !isAtLimit
          ? "border-orange-500 text-orange-600"
          : ""
      }
    >
      {borrowed}/{limit}
    </Badge>
  );
}
