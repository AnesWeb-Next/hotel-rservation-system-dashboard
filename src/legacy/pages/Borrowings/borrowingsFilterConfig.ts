import type { FilterOption } from "@/components/shared/FilterSheet";
import type { FilterValue } from "@/components/shared/filterTypes";
import type { Borrow } from "@/types/borrow";
import type { Book } from "@/types/book";
import type { User } from "@/types/user";
import { getDisplayName } from "@/lib/utils";

export const borrowingsFilterOptions: FilterOption[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "All statuses",
    options: [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "active", label: "Active" },
      { value: "returned", label: "Returned" },
      { value: "overdue", label: "Overdue" },
      { value: "rejected", label: "Rejected" },
    ],
  },
  {
    key: "hasLateFee",
    label: "Late Fee",
    type: "select",
    placeholder: "All",
    options: [
      { value: "yes", label: "Has Late Fee" },
      { value: "no", label: "No Late Fee" },
    ],
  },
];

export function filterBorrowings(
  borrowings: Borrow[],
  searchQuery: string,
  filters: FilterValue,
): Borrow[] {
  return borrowings.filter((borrowing) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const bookTitle = getDisplayName(
        borrowing.book as string | Book,
      ).toLowerCase();
      const userName = getDisplayName(
        borrowing.user as string | User,
      ).toLowerCase();
      if (!bookTitle.includes(query) && !userName.includes(query)) return false;
    }
    if (filters.status && borrowing.status !== filters.status) return false;
    if (filters.hasLateFee === "yes" && (borrowing.lateFee ?? 0) <= 0)
      return false;
    if (filters.hasLateFee === "no" && (borrowing.lateFee ?? 0) > 0)
      return false;
    return true;
  });
}
