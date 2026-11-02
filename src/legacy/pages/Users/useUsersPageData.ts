import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/endpoints/users";
import { paginate } from "@/lib/utils";
import type { User } from "@/types/user";
import type { FilterValue } from "@/components/shared/FilterSheet";
import { filterUsers } from "./usersFilterConfig";
import { useUserBorrowingStats } from "./useUserBorrowingStats";

const PAGE_SIZE = 5;

export function useUsersPageData() {
  const {
    data: usersResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  const users = usersResponse?.data ?? [];
  const getUserBorrowingStats = useUserBorrowingStats();
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterValue>({});
  const [currentPage, setCurrentPage] = useState(1);
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };
  const handleFilterChange = (f: FilterValue) => {
    setFilters(f);
    setCurrentPage(1);
  };
  const handleAddNew = () => {
    setEditingUser(null);
    setFormOpen(true);
  };
  const filteredUsers = useMemo(
    () => filterUsers(users, searchQuery, filters as Record<string, string>),
    [users, searchQuery, filters],
  );
  const {
    data: paginatedUsers,
    totalItems,
    totalPages,
  } = paginate(filteredUsers, currentPage, PAGE_SIZE);
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return {
    isLoading,
    error,
    refetch,
    paginatedUsers,
    totalItems,
    totalPages,
    getUserBorrowingStats,
    formOpen,
    setFormOpen,
    editingUser,
    filterSheetOpen,
    setFilterSheetOpen,
    searchQuery,
    filters,
    currentPage,
    setCurrentPage,
    activeFiltersCount,
    handleSearch,
    handleFilterChange,
    handleAddNew,
  };
}
