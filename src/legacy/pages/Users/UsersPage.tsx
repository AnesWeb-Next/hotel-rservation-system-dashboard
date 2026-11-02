import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { DataTable } from "@/components/shared/DataTable";
import { UserForm } from "@/features/users/components/UserForm";
import { UserActions } from "@/features/users/components/UserActions";
import { FilterSheet } from "@/components/shared/FilterSheet";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { ErrorAlert } from "@/components/shared/ErrorDisplay";
import { Plus } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getUsersColumns } from "./usersColumns";
import { usersFilterOptions } from "./usersFilterConfig";
import { useUsersPageData } from "./useUsersPageData";

export function UsersPage() {
  const {
    isLoading, error, refetch, paginatedUsers, totalItems, totalPages,
    getUserBorrowingStats, formOpen, setFormOpen, editingUser,
    filterSheetOpen, setFilterSheetOpen, filters,
    currentPage, setCurrentPage, activeFiltersCount,
    handleSearch, handleFilterChange, handleAddNew,
  } = useUsersPageData();
  const columns = getUsersColumns(getUserBorrowingStats);

  const layoutProps = {
    breadcrumbs: [{ label: "Users" }] as const,
    title: "Users Management",
    searchPlaceholder: "Search users...",
    onSearch: handleSearch,
    action: (
      <Button type="button" onClick={handleAddNew} className="gap-2">
        <Plus className="h-4 w-4" />Add User
      </Button>
    ),
  };

  if (isLoading) return (
    <TooltipProvider><PageLayout {...layoutProps}><TableSkeleton rows={5} columns={7} /></PageLayout></TooltipProvider>
  );
  if (error) return (
    <TooltipProvider><PageLayout {...layoutProps}><ErrorAlert error={error.message} retry={refetch} /></PageLayout></TooltipProvider>
  );

  return (
    <TooltipProvider>
      <PageLayout
        {...layoutProps} onFilterClick={() => setFilterSheetOpen(true)}
        activeFiltersCount={activeFiltersCount} currentPage={currentPage}
        totalPages={totalPages} totalItems={totalItems} onPageChange={setCurrentPage}
      >
        <DataTable
          data={paginatedUsers} columns={columns} loading={isLoading}
          emptyMessage="No users found."
          actions={(user) => <UserActions user={user} compact />}
        />
        <FilterSheet
          open={filterSheetOpen} onOpenChange={setFilterSheetOpen} title="Filter Users"
          filters={usersFilterOptions} values={filters}
          onChange={handleFilterChange} onClear={() => handleFilterChange({})}
        />
        <UserForm open={formOpen} onOpenChange={setFormOpen} user={editingUser} onSuccess={() => refetch()} />
      </PageLayout>
    </TooltipProvider>
  );
}
