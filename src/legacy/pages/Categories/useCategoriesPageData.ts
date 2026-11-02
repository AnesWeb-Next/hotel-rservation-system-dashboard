import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCategories, deleteCategory } from "@/api/endpoints/categories";
import { getAllBooks } from "@/api/endpoints/books";
import { toast } from "@/hooks/useToast";
import { paginate } from "@/lib/utils";
import type { Category } from "@/types/category";
import type { Book } from "@/types/book";

const PAGE_SIZE = 5;

export function useCategoriesPageData() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categoriesResponse, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"], queryFn: () => getAllCategories(),
  });
  const categories = useMemo(() => categoriesResponse?.data ?? [], [categoriesResponse]);
  const { data: booksResponse } = useQuery({
    queryKey: ["books"], queryFn: () => getAllBooks(),
  });
  const books = useMemo(() => booksResponse?.data ?? [], [booksResponse]);
  const getCategoryBooksCount = useCallback(
    (categoryId: string): number =>
      books.filter((book: Book) => {
        const id = typeof book.category === "string" ? book.category : book.category?._id;
        return id === categoryId;
      }).length,
    [books],
  );
  const { mutate: deleteCategoryMutation } = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Category deleted", description: "Category has been removed.", variant: "success" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message || "Failed to delete category", variant: "destructive" });
    },
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const handleView = (c: Category) => navigate(`/categories/${c._id}`);
  const handleEdit = (c: Category) => { setEditingCategory(c); setFormOpen(true); };
  const handleDelete = (c: Category) => { setCategoryToDelete(c); setDeleteDialogOpen(true); };
  const confirmDelete = () => {
    if (categoryToDelete) { deleteCategoryMutation(categoryToDelete._id); setCategoryToDelete(null); }
  };
  const handleAddNew = () => { setEditingCategory(null); setFormOpen(true); };
  const categoriesWithBookCount = useMemo(
    () => categories.map((c: Category) => ({ ...c, bookCount: getCategoryBooksCount(c._id) })),
    [categories, getCategoryBooksCount],
  );
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categoriesWithBookCount;
    const q = searchQuery.toLowerCase();
    return categoriesWithBookCount.filter((c) => c.name.toLowerCase().includes(q));
  }, [categoriesWithBookCount, searchQuery]);
  const { data: paginatedCategories, totalPages, totalItems } = paginate(
    filteredCategories, currentPage, PAGE_SIZE,
  );
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  if (prevSearchQuery !== searchQuery) {
    setPrevSearchQuery(searchQuery);
    setCurrentPage(1);
  }

  return {
    isLoading, error, refetch, paginatedCategories, totalPages, totalItems,
    formOpen, setFormOpen, editingCategory, deleteDialogOpen, setDeleteDialogOpen,
    categoryToDelete, searchQuery, setSearchQuery, currentPage, setCurrentPage,
    handleView, handleEdit, handleDelete, confirmDelete, handleAddNew,
  };
}
