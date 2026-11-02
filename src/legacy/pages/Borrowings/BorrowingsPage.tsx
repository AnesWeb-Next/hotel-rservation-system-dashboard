import { PageLayout } from "@/components/layout/PageLayout";
import { DataTable } from "@/components/shared/DataTable";
import { FilterSheet } from "@/components/shared/FilterSheet";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { ErrorAlert } from "@/components/shared/ErrorDisplay";
import type { Borrow } from "@/types/borrow";
import { getBorrowingsColumns } from "./borrowingsColumns";
import { renderBorrowingActions } from "./BorrowingRowActions";
import { borrowingsFilterOptions } from "./borrowingsFilterConfig";
import { useBorrowingsPageData } from "./useBorrowingsPageData";

export function BorrowingsPage() {
  const {
    isLoading, error, refetch, paginatedBorrowings, totalItems, totalPages,
    filterSheetOpen, setFilterSheetOpen, setSearchQuery,
    filters, setFilters, currentPage, setCurrentPage, activeFiltersCount,
    handleView, handleStatusChange, handleExtend, handleReminder, handleContact,
  } = useBorrowingsPageData();
  const columns = getBorrowingsColumns();

  const layoutProps = {
    breadcrumbs: [{ label: "Borrowings" }] as const,
    title: "Borrowings Management",
    searchPlaceholder: "Search borrowings...",
    onSearch: setSearchQuery,
  };

  if (isLoading) return <PageLayout {...layoutProps}><TableSkeleton rows={5} columns={7} /></PageLayout>;
  if (error) return <PageLayout {...layoutProps}><ErrorAlert error={error.message} retry={refetch} /></PageLayout>;

  return (
    <PageLayout
      {...layoutProps} onFilterClick={() => setFilterSheetOpen(true)}
      activeFiltersCount={activeFiltersCount} currentPage={currentPage}
      totalPages={totalPages} totalItems={totalItems} onPageChange={setCurrentPage}
    >
      <DataTable
        data={paginatedBorrowings} columns={columns} loading={isLoading}
        emptyMessage="No borrowings found." onRowClick={handleView}
        actions={(b: Borrow) =>
          renderBorrowingActions(b, {
            onView: handleView, onStatusChange: handleStatusChange,
            onExtend: handleExtend, onSendReminder: handleReminder, onContact: handleContact,
          })
        }
      />
      <FilterSheet
        open={filterSheetOpen} onOpenChange={setFilterSheetOpen} title="Filter Borrowings"
        filters={borrowingsFilterOptions} values={filters}
        onChange={setFilters} onClear={() => setFilters({})}
      />
    </PageLayout>
  );
}
