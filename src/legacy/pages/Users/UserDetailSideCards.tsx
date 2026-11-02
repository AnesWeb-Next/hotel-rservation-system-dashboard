import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/user";
import type { Borrow } from "@/types/borrow";
import { BookOpen, DollarSign, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UserDetailSideCardsProps {
  user: User;
  borrowings: Borrow[];
  activeBorrowings: number;
  overdueBorrowings: number;
}

export function getUserDetailSideCards({
  user,
  borrowings,
  activeBorrowings,
  overdueBorrowings,
}: UserDetailSideCardsProps) {
  return [
    <Card key="stats">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Library Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Borrow Limit</span>
          <span className="font-medium">{user.borrowLimit} books</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Active Borrows</span>
          <span className="font-medium">{activeBorrowings}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Overdue</span>
          <span
            className={`font-medium ${overdueBorrowings > 0 ? "text-destructive" : ""}`}
          >
            {overdueBorrowings}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Borrowed</span>
          <span className="font-medium">{borrowings.length}</span>
        </div>
      </CardContent>
    </Card>,
    <Card key="financial">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Financial
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Outstanding Fines</span>
          <span
            className={`font-medium ${user.fines > 0 ? "text-destructive" : ""}`}
          >
            ${user.fines.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>,
    <Card key="account">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Account Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Joined</span>
          <span>{formatDate(user.createdAt)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Updated</span>
          <span>{formatDate(user.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>,
  ];
}
