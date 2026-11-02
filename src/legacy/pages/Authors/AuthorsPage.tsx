import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { DataTable } from "@/components/shared/DataTable";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { ErrorAlert } from "@/components/shared/ErrorDisplay";
import { FilterSheet } from "@/components/shared/FilterSheet";
import { AuthorForm } from "@/features/authors/components/AuthorForm";
import { Plus } from "lucide-react";
import { getAuthorsColumns } from "./authorsColumnsConfig";
import { AuthorRowActions } from "./authorsColumns";
import { useAuthorsPageData } from "./useAuthorsPageData";

export function AuthorsPage() {
  const {
    isLoading, error, refetch, paginatedAuthors, totalPages, totalItems,
    getAuthorBooksCount, formOpen, setFormOpen, editingAuthor, deleteDialogOpen,
    setDeleteDialogOpen, authorToDelete, filterOpen, setFilterOpen,
    searchQuery, setSearchQuery, filters, setFilters, currentPage, setCurrentPage,
    pageSize, setPageSize, activeFiltersCount, authorsFilterConfig,
    handleView, handleEdit, handleDelete, confirmDelete, handleAddNew,
  } = useAuthorsPageData();
  const columns = getAuthorsColumns(getAuthorBooksCount);

  const layoutProps = {
    breadcrumbs: [{ label: "Authors" }] as const,
    title: "Authors Management",
    description: "Manage your library authors",
    action: (
      <Button type="button" onClick={handleAddNew} className="gap-2">
        <Plus className="h-4 w-4" />Add Author
      </Button>
    ),
    searchPlaceholder: "Search authors by name...",
    searchValue: searchQuery,
    onSearch: setSearchQuery,
  };

  if (isLoading) return <PageLayout {...layoutProps}><TableSkeleton rows={5} columns={3} /></PageLayout>;
  if (error) return <PageLayout {...layoutProps}><ErrorAlert error={error.message} retry={refetch} /></PageLayout>;

  return (
    <PageLayout
      {...layoutProps} onFilterClick={() => setFilterOpen(true)}
      activeFiltersCount={activeFiltersCount} showPagination
      currentPage={currentPage} totalPages={totalPages} totalItems={totalItems}
      pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize}
    >
      <DataTable
        data={paginatedAuthors} columns={columns} loading={false}
        emptyMessage="No authors found." onRowClick={handleView}
        actions={(a) => (
          <AuthorRowActions author={a} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      />
      <FilterSheet
        open={filterOpen} onOpenChange={setFilterOpen} title="Filter Authors"
        description="Narrow down your author search" filters={authorsFilterConfig}
        values={filters} onChange={setFilters} onClear={() => setFilters({})}
      />
      <AuthorForm open={formOpen} onOpenChange={setFormOpen} author={editingAuthor} onSuccess={refetch} />
      <ConfirmDialog
        open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Delete Author"
        description={`Are you sure you want to delete "${authorToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete" onConfirm={confirmDelete} variant="destructive"
      />
    </PageLayout>
  );
}
