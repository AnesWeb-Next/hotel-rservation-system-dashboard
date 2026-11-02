import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { DataTable } from "@/components/shared/DataTable";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { CategoryForm } from "@/features/categories/components/CategoryForm";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { ErrorAlert } from "@/components/shared/ErrorDisplay";
import { Plus } from "lucide-react";
import { getCategoriesColumns } from "./categoriesColumnsConfig";
import { CategoryRowActions } from "./categoriesColumns";
import { useCategoriesPageData } from "./useCategoriesPageData";

export function CategoriesPage() {
  const {
    isLoading, error, refetch, paginatedCategories, totalPages, totalItems,
    formOpen, setFormOpen, editingCategory, deleteDialogOpen, setDeleteDialogOpen,
    categoryToDelete, setSearchQuery, currentPage, setCurrentPage,
    handleView, handleEdit, handleDelete, confirmDelete, handleAddNew,
  } = useCategoriesPageData();
  const columns = getCategoriesColumns();

  const layoutProps = {
    breadcrumbs: [{ label: "Categories" }] as const,
    title: "Categories",
    action: (
      <Button type="button" onClick={handleAddNew} className="gap-2">
        <Plus className="h-4 w-4" />Add Category
      </Button>
    ),
    searchPlaceholder: "Search categories...",
    onSearch: setSearchQuery,
  };

  if (isLoading) return <PageLayout {...layoutProps}><TableSkeleton rows={5} columns={3} /></PageLayout>;
  if (error) return <PageLayout {...layoutProps}><ErrorAlert error={error.message} retry={refetch} /></PageLayout>;

  return (
    <PageLayout
      {...layoutProps} currentPage={currentPage} totalPages={totalPages}
      totalItems={totalItems} onPageChange={setCurrentPage}
    >
      <DataTable
        data={paginatedCategories} columns={columns} loading={isLoading}
        emptyMessage="No categories found."
        actions={(c) => (
          <CategoryRowActions category={c} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      />
      <CategoryForm
        open={formOpen} onOpenChange={setFormOpen}
        category={editingCategory} onSuccess={() => refetch()}
      />
      <ConfirmDialog
        open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Delete Category"
        description={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete" onConfirm={confirmDelete} variant="destructive"
      />
    </PageLayout>
  );
}
