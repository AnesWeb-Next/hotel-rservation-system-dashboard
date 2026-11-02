import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBorrowings } from "@/api/endpoints/borrowings";

export function useUserBorrowingStats() {
  const { data: borrowingsResponse } = useQuery({
    queryKey: ["borrowings"],
    queryFn: () => getAllBorrowings(),
  });
  const borrowings = borrowingsResponse?.data ?? [];

  const getUserBorrowingStats = useCallback(
    (userId: string) => {
      const userBorrowings = borrowings.filter((b) => {
        const borrowUserId = typeof b.user === "string" ? b.user : b.user?._id;
        return borrowUserId === userId;
      });
      const active = userBorrowings.filter(
        (b) => b.status === "active" || b.status === "approved",
      ).length;
      const overdue = userBorrowings.filter(
        (b) => b.status === "overdue",
      ).length;
      return { active, overdue, total: userBorrowings.length };
    },
    [borrowings],
  );

  return getUserBorrowingStats;
}
