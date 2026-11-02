import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllBorrowings } from "@/api/endpoints/borrowings";
import { paginate } from "@/lib/utils";
import { toast } from "@/hooks/useToast";
import type { Borrow } from "@/types/borrow";
import type { FilterValue } from "@/components/shared/FilterSheet";
import { useBorrowingMutations } from "./useBorrowingMutations";
import { filterBorrowings } from "./borrowingsFilterConfig";

const PAGE_SIZE = 5;

export function useBorrowingsPageData() {
  const navigate = useNavigate();
  const { data: borrowingsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ["borrowings"], queryFn: () => getAllBorrowings(),
  });
  const borrowings = useMemo(() => borrowingsResponse?.data ?? [], [borrowingsResponse]);
  const { approveAsync, rejectAsync, returnAsync, extendDueDate } = useBorrowingMutations();
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterValue>({});
  const [currentPage, setCurrentPage] = useState(1);
  const handleView = (b: Borrow) => navigate(`/borrowings/${b._id}`);
  const handleStatusChange = async (b: Borrow, status: string) => {
    if (status === "approved") await approveAsync(b._id);
    else if (status === "rejected") await rejectAsync(b._id);
    else if (status === "returned") await returnAsync(b._id);
  };
  const handleExtend = (b: Borrow) =>
    extendDueDate({ id: b._id, currentDueDate: b.dueDate, days: 7 });
  const handleReminder = () =>
    toast({ title: "Reminder sent", description: "A reminder has been sent to the student." });
  const handleContact = () =>
    toast({ title: "Contact initiated", description: "Opening contact dialog..." });
  const filteredBorrowings = useMemo(
    () => filterBorrowings(borrowings, searchQuery, filters),
    [borrowings, searchQuery, filters],
  );
  const { data: paginatedBorrowings, totalItems, totalPages } = paginate(
    filteredBorrowings, currentPage, PAGE_SIZE,
  );
  const [prevFilters, setPrevFilters] = useState(filters);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  if (prevFilters !== filters || prevSearchQuery !== searchQuery) {
    setPrevFilters(filters);
    setPrevSearchQuery(searchQuery);
    setCurrentPage(1);
  }
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return {
    isLoading, error, refetch, paginatedBorrowings, totalItems, totalPages,
    filterSheetOpen, setFilterSheetOpen, searchQuery, setSearchQuery,
    filters, setFilters, currentPage, setCurrentPage, activeFiltersCount,
    handleView, handleStatusChange, handleExtend, handleReminder, handleContact,
  };
}
