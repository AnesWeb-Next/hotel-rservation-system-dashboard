import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { DataTable } from "@/components/shared/DataTable";
import { ActionsDropdown } from "@/components/shared/ActionsDropdown";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { ErrorAlert } from "@/components/shared/ErrorDisplay";
import { FilterSheet } from "@/components/shared/FilterSheet";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { BookForm } from "@/features/books/components/BookForm";
import { getBooksColumns } from "./booksColumns";
import { useBooksPageData } from "./useBooksPageData";

export function BooksPage() {
  const {
    books, booksLoading, booksError, booksResponse, refetchBooks, pagination, parsedParams,
    searchInput, setSearchInput, formOpen, setFormOpen, editingBook, setEditingBook,
    deleteDialogOpen, setDeleteDialogOpen, bookToDelete, filterOpen, setFilterOpen,
    filterConfig, filterValues, activeFiltersCount, handleFiltersChange, handleFiltersClear,
    handlePageChange, handlePageSizeChange, handleView, handleEdit, handleDelete,
    confirmDelete, invalidateBooks,
  } = useBooksPageData();
  const columns = getBooksColumns();

  if (booksLoading && !booksResponse) return (
    <PageLayout breadcrumbs={[{ label: "Books" }]} title="Books Management">
      <TableSkeleton rows={5} columns={6} />
    </PageLayout>
  );
  if (booksError) return (
    <PageLayout breadcrumbs={[{ label: "Books" }]} title="Books Management">
      <ErrorAlert
        error={booksError instanceof Error ? booksError.message : "Failed to load books"}
        retry={() => refetchBooks()}
      />
    </PageLayout>
  );

  return (
    <PageLayout
      breadcrumbs={[{ label: "Books" }]} title="Books Management"
      description="Manage your book inventory"
      action={
        <Button type="button" onClick={() => { setEditingBook(null); setFormOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" />Add Book
        </Button>
      }
      searchPlaceholder="Search books by title, author, ISBN..."
      searchValue={searchInput} onSearch={setSearchInput}
      onFilterClick={() => setFilterOpen(true)} activeFiltersCount={activeFiltersCount}
      showPagination currentPage={parsedParams.page}
      totalPages={pagination?.totalPages ?? 1} totalItems={pagination?.total ?? 0}
      pageSize={parsedParams.limit} onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    >
      <DataTable
        data={books} columns={columns} loading={booksLoading}
        emptyMessage="No books found." onRowClick={handleView}
        actions={(book) => (
          <ActionsDropdown actions={[
            { label: "View Details", icon: <Eye className="h-4 w-4" />, onClick: () => handleView(book) },
            { label: "Edit", icon: <Pencil className="h-4 w-4" />, onClick: () => handleEdit(book) },
            { label: "Delete", icon: <Trash2 className="h-4 w-4" />, onClick: () => handleDelete(book), variant: "destructive" },
          ]} />
        )}
      />
      <FilterSheet
        open={filterOpen} onOpenChange={setFilterOpen} title="Filter Books"
        description="Narrow down your book search" filters={filterConfig}
        values={filterValues} onChange={handleFiltersChange}
        onApply={() => setFilterOpen(false)} onClear={handleFiltersClear}
      />
      <BookForm open={formOpen} onOpenChange={setFormOpen} book={editingBook} onSuccess={invalidateBooks} />
      <ConfirmDialog
        open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Delete Book"
        description={`Are you sure you want to delete "${bookToDelete?.title}"?`}
        onConfirm={confirmDelete} confirmLabel="Delete" variant="destructive"
      />
    </PageLayout>
  );
}
