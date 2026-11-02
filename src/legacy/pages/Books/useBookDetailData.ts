import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookById, deleteBook } from "@/api/endpoints/books";
import { getAllBorrowings } from "@/api/endpoints/borrowings";
import { toast } from "@/hooks/useToast";
import type { Author } from "@/types/author";

export function getAuthorName(author: string | Author | undefined): string {
  if (!author) return "Unknown Author";
  return typeof author === "string" ? author : author.name;
}

export function getAuthorId(author: string | Author | undefined): string | null {
  if (!author) return null;
  return typeof author === "string" ? author : author._id;
}

export function useBookDetailData() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: bookResponse, isLoading, error: bookError } = useQuery({
    queryKey: ["books", id],
    queryFn: () => {
      if (!id) throw new Error("Book ID is required");
      return getBookById(id);
    },
    enabled: Boolean(id),
  });
  const { data: borrowingsResponse } = useQuery({
    queryKey: ["borrowings", { book: id }],
    queryFn: () => getAllBorrowings({ book: id }),
    enabled: Boolean(id),
  });
  const book = bookResponse?.data ?? null;
  const borrowings = borrowingsResponse?.data ?? [];
  const deleteBookMutation = useMutation({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({ title: "Book deleted", description: "The book has been removed.", variant: "success" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message || "Failed to delete book.", variant: "destructive" });
    },
  });
  const handleDelete = () => {
    deleteBookMutation.mutate(book!._id, { onSuccess: () => navigate("/books") });
  };
  const invalidateBook = () => queryClient.invalidateQueries({ queryKey: ["books", id] });

  return {
    id, book, isLoading, bookError, borrowings,
    formOpen, setFormOpen, deleteDialogOpen, setDeleteDialogOpen,
    handleDelete, invalidateBook,
  };
}
