import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User as UserIcon } from "lucide-react";
import type { Borrow } from "@/types/borrow";
import type { Book } from "@/types/book";
import type { User } from "@/types/user";
import { getBookTitle, getUserName } from "./borrowingDetailUtils";
import { OverdueNoticeCard } from "./BorrowingDetailComponents";

export function BorrowingDetailMainCard(props: {
  borrowing: Borrow;
  isOverdue: boolean;
}) {
  const { borrowing, isOverdue } = props;
  return (
    <div className="space-y-6">
      {isOverdue && <OverdueNoticeCard />}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Book Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Title</span>
            <span className="font-medium">
              {getBookTitle(borrowing.book as Book)}
            </span>
          </div>
          {typeof borrowing.book === "object" && borrowing.book && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Serial Number</span>
              <Badge variant="outline">
                {(borrowing.book as Book).serialNumber}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Borrower Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">
              {getUserName(borrowing.user as User)}
            </span>
          </div>
          {typeof borrowing.user === "object" && borrowing.user && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{(borrowing.user as User).email}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {borrowing.comments && (
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{borrowing.comments}</p>
          </CardContent>
        </Card>
      )}

      {borrowing.rejectionReason && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Rejection Reason</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{borrowing.rejectionReason}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
