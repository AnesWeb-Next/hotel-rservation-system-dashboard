import { PageLayout } from "@/components/layout/PageLayout";
import { DataTable } from "@/components/shared/DataTable";
import { FilterSheet } from "@/components/shared/FilterSheet";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { ErrorAlert } from "@/components/shared/ErrorDisplay";
import { getOrdersColumns } from "./ordersColumns";
import { OrderRowActions } from "./OrderRowActions";
import { ordersFilterOptions } from "./ordersFilterConfig";
import { useOrdersPageData } from "./useOrdersPageData";

export function OrdersPage() {
  const {
    isLoading, error, refetch, paginatedOrders, totalPages, totalItems,
    filterSheetOpen, setFilterSheetOpen, setSearchQuery,
    filters, setFilters, currentPage, setCurrentPage, activeFiltersCount,
    handleView, handleStatusChange,
  } = useOrdersPageData();
  const columns = getOrdersColumns();

  const layoutProps = {
    breadcrumbs: [{ label: "Orders" }] as const,
    title: "Orders Management",
    searchPlaceholder: "Search orders...",
    onSearch: setSearchQuery,
  };

  if (isLoading) return <PageLayout {...layoutProps}><TableSkeleton rows={5} columns={6} /></PageLayout>;
  if (error) return <PageLayout {...layoutProps}><ErrorAlert error={error.message} retry={refetch} /></PageLayout>;

  return (
    <PageLayout
      {...layoutProps} onFilterClick={() => setFilterSheetOpen(true)}
      activeFiltersCount={activeFiltersCount} currentPage={currentPage}
      totalPages={totalPages} totalItems={totalItems} onPageChange={setCurrentPage}
    >
      <DataTable
        data={paginatedOrders} columns={columns} loading={isLoading}
        emptyMessage="No orders found."
        actions={(order) => (
          <OrderRowActions order={order} onView={handleView} onStatusChange={handleStatusChange} />
        )}
      />
      <FilterSheet
        open={filterSheetOpen} onOpenChange={setFilterSheetOpen} title="Filter Orders"
        filters={ordersFilterOptions} values={filters}
        onChange={setFilters} onClear={() => setFilters({})}
      />
    </PageLayout>
  );
}
