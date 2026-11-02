import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { User } from "@/types/user";
import {
  type BorrowingStats,
  UserNameCell,
  BorrowLimitCell,
} from "./usersColumnCells";

export function getUsersColumns(
  getUserBorrowingStats: (userId: string) => BorrowingStats,
) {
  return [
    {
      key: "name" as const,
      header: "Name",
      sortable: true,
      render: (user: User) => {
        const stats = getUserBorrowingStats(user._id);
        return <UserNameCell user={user} stats={stats} />;
      },
    },
    {
      key: "email" as const,
      header: "Email",
      sortable: true,
      render: (user: User) => (
        <span className="font-mono text-sm">{user.email}</span>
      ),
    },
    {
      key: "role" as const,
      header: "Role",
      sortable: true,
      className: "w-[100px]",
      render: (user: User) => (
        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
          {user.role}
        </Badge>
      ),
    },
    {
      key: "borrowLimit" as const,
      header: "Limit",
      className: "w-[100px]",
      render: (user: User) => <BorrowLimitCell user={user} />,
    },
    {
      key: "fines" as const,
      header: "Fines",
      sortable: true,
      className: "w-[100px]",
      render: (user: User) => (
        <span
          className={
            user.fines > 0
              ? "text-destructive font-medium"
              : "text-muted-foreground"
          }
        >
          {formatCurrency(user.fines)}
        </span>
      ),
    },
    {
      key: "isActive" as const,
      header: "Status",
      className: "w-[100px]",
      render: (user: User) => (
        <Badge variant={user.isActive ? "success" : "destructive"}>
          {user.isActive ? "Active" : "Suspended"}
        </Badge>
      ),
    },
    {
      key: "createdAt" as const,
      header: "Joined",
      sortable: true,
      render: (user: User) => formatDate(user.createdAt),
    },
  ];
}
