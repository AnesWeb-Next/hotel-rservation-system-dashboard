import { useQuery } from "@tanstack/react-query";
import { getAllBorrowings } from "@/api/endpoints/bookings";

export function useNotifications() {
  const { data: borrowingsData } = useQuery({
    queryKey: ["borrowings"],
    queryFn: () => getAllBorrowings(),
  });

  const overdueBorrowings =
    borrowingsData?.data?.filter(
      (b: { status: string }) => b.status === "overdue",
    ).length ?? 0;

  const notificationCount = overdueBorrowings;

  return { overdueBorrowings, notificationCount };
}
