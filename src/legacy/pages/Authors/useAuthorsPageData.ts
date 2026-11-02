import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllAuthors, deleteAuthor } from "@/api/endpoints/authors";
import { getAllBooks } from "@/api/endpoints/books";
import { toast } from "@/hooks/useToast";
import { paginate } from "@/lib/utils";
import type { Author } from "@/types/author";
import type { Book } from "@/types/book";
import type { FilterValue } from "@/components/shared/FilterSheet";
import { authorsFilterConfig, filterAuthors } from "./authorsFilterConfig";

const DEFAULT_PAGE_SIZE = 5;

export function useAuthorsPageData() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authorsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ["authors"], queryFn: () => getAllAuthors(),
  });
  const authors = useMemo(() => authorsResponse?.data ?? [], [authorsResponse]);
  const { data: booksResponse } = useQuery({
    queryKey: ["books"], queryFn: () => getAllBooks(),
  });
  const books = useMemo(() => booksResponse?.data ?? [], [booksResponse]);
  const getAuthorBooksCount = useCallback(
    (authorId: string): number =>
      books.filter((book: Book) => {
        const id = typeof book.author === "string" ? book.author : book.author?._id;
        return id === authorId;
      }).length,
    [books],
  );
  const { mutate: deleteAuthorMutation } = useMutation({
    mutationFn: (id: string) => deleteAuthor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast({ title: "Author deleted", description: "Author has been removed.", variant: "success" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message || "Failed to delete author", variant: "destructive" });
    },
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterValue>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const handleView = useCallback((a: Author) => navigate(`/authors/${a._id}`), [navigate]);
  const handleEdit = useCallback((a: Author) => { setEditingAuthor(a); setFormOpen(true); }, []);
  const handleDelete = useCallback((a: Author) => { setAuthorToDelete(a); setDeleteDialogOpen(true); }, []);
  const confirmDelete = useCallback(() => {
    if (authorToDelete) { deleteAuthorMutation(authorToDelete._id); setAuthorToDelete(null); }
  }, [authorToDelete, deleteAuthorMutation]);
  const handleAddNew = useCallback(() => { setEditingAuthor(null); setFormOpen(true); }, []);
  const filteredAuthors = useMemo(
    () => filterAuthors(authors, searchQuery, filters, getAuthorBooksCount),
    [authors, searchQuery, filters, getAuthorBooksCount],
  );
  const { data: paginatedAuthors, totalPages, totalItems } = useMemo(
    () => paginate(filteredAuthors, currentPage, pageSize),
    [filteredAuthors, currentPage, pageSize],
  );
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [prevFilters, setPrevFilters] = useState(filters);
  if (prevSearchQuery !== searchQuery || prevFilters !== filters) {
    setPrevSearchQuery(searchQuery);
    setPrevFilters(filters);
    setCurrentPage(1);
  }
  const activeFiltersCount = useMemo(
    () => Object.values(filters).filter((v) => v !== undefined && v !== "").length,
    [filters],
  );

  return {
    isLoading, error, refetch, paginatedAuthors, totalPages, totalItems,
    getAuthorBooksCount, formOpen, setFormOpen, editingAuthor, deleteDialogOpen,
    setDeleteDialogOpen, authorToDelete, filterOpen, setFilterOpen,
    searchQuery, setSearchQuery, filters, setFilters, currentPage, setCurrentPage,
    pageSize, setPageSize, activeFiltersCount, authorsFilterConfig,
    handleView, handleEdit, handleDelete, confirmDelete, handleAddNew,
  };
}
