import { useState, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBooks, deleteBook } from "@/api/endpoints/books";
import { getAllCategories } from "@/api/endpoints/categories";
import { getAllAuthors } from "@/api/endpoints/authors";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "@/hooks/useToast";
import {
  parseSearchParams, updateSearchParams, getActiveFiltersCount, toApiParams,
  type ParsedSearchParams,
} from "@/utils/searchParams";
import { useBooksFilterConfig, getFilterValues } from "./booksFilterConfig";
import type { Book } from "@/types/book";
import type { FilterValue } from "@/components/shared/FilterSheet";

export function useBooksPageData() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedParams = useMemo(() => parseSearchParams(searchParams), [searchParams]);
  const [searchInput, setSearchInput] = useState(parsedParams.search);
  const debouncedSearch = useDebounce(searchInput, 300);
  const apiParams = useMemo(() => toApiParams({ ...parsedParams, search: debouncedSearch }), [parsedParams, debouncedSearch]);
  const {
    data: booksResponse, isLoading: booksLoading, error: booksError, refetch: refetchBooks,
  } = useQuery({
    queryKey: ["books", apiParams],
    queryFn: () => getAllBooks(apiParams),
    placeholderData: (prev) => prev,
  });
  const { data: categoriesResponse } = useQuery({
    queryKey: ["categories"], queryFn: () => getAllCategories(),
  });
  const { data: authorsResponse } = useQuery({
    queryKey: ["authors"], queryFn: () => getAllAuthors(),
  });
  const books = booksResponse?.data ?? [];
  const pagination = booksResponse?.pagination;
  const deleteBookMutation = useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({ title: "Book deleted", description: "The book has been removed.", variant: "success" });
    },
    onError: (err: Error) => {
      toast({ title: "Error deleting book", description: err.message || "Failed to delete book.", variant: "destructive" });
    },
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterConfig = useBooksFilterConfig(categoriesResponse?.data ?? [], authorsResponse?.data ?? []);
  const filterValues = useMemo(() => getFilterValues(parsedParams), [parsedParams]);
  const activeFiltersCount = getActiveFiltersCount(parsedParams);
  const handleFiltersChange = useCallback((f: FilterValue) => {
    const updates: Partial<ParsedSearchParams> = {
      category: (f.category as string) || "", author: (f.author as string) || "",
      status: (f.status as string) || "", minPrice: f.minPrice ? Number(f.minPrice) : undefined,
      maxPrice: f.maxPrice ? Number(f.maxPrice) : undefined,
    };
    updateSearchParams(setSearchParams, parsedParams, updates);
  }, [setSearchParams, parsedParams]);
  const handleFiltersClear = useCallback(() => { setSearchParams({}); setSearchInput(""); }, [setSearchParams]);
  const handlePageChange = useCallback((p: number) => updateSearchParams(setSearchParams, parsedParams, { page: p }, false), [setSearchParams, parsedParams]);
  const handlePageSizeChange = useCallback((l: number) => updateSearchParams(setSearchParams, parsedParams, { limit: l, page: 1 }), [setSearchParams, parsedParams]);
  const handleView = useCallback((book: Book) => navigate(`/books/${book._id}`), [navigate]);
  const handleEdit = useCallback((book: Book) => { setEditingBook(book); setFormOpen(true); }, []);
  const handleDelete = useCallback((book: Book) => { setBookToDelete(book); setDeleteDialogOpen(true); }, []);
  const confirmDelete = useCallback(() => {
    if (bookToDelete) { deleteBookMutation.mutate(bookToDelete._id); setBookToDelete(null); }
  }, [bookToDelete, deleteBookMutation]);
  const invalidateBooks = useCallback(() => queryClient.invalidateQueries({ queryKey: ["books"] }), [queryClient]);

  return {
    books, booksLoading, booksError, booksResponse, refetchBooks, pagination, parsedParams,
    searchInput, setSearchInput, formOpen, setFormOpen, editingBook, setEditingBook,
    deleteDialogOpen, setDeleteDialogOpen, bookToDelete, filterOpen, setFilterOpen,
    filterConfig, filterValues, activeFiltersCount, handleFiltersChange, handleFiltersClear,
    handlePageChange, handlePageSizeChange, handleView, handleEdit, handleDelete,
    confirmDelete, invalidateBooks,
  };
}
