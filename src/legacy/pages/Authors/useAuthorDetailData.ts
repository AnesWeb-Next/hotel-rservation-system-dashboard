import { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthorById, deleteAuthor } from "@/api/endpoints/authors";
import { getAllBooks } from "@/api/endpoints/books";
import { toast } from "@/hooks/useToast";
import type { Book } from "@/types/book";

export function useAuthorDetailData() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: authorResponse, isLoading, error: authorError } = useQuery({
    queryKey: ["authors", id], queryFn: () => getAuthorById(id!), enabled: Boolean(id),
  });
  const author = authorResponse?.data ?? null;
  const { data: booksResponse } = useQuery({
    queryKey: ["books"], queryFn: () => getAllBooks(),
  });
  const authorBooks = useMemo(
    () => (booksResponse?.data ?? []).filter((book: Book) =>
      (typeof book.author === "string" ? book.author : book.author?._id) === id,
    ),
    [booksResponse, id],
  );
  const { mutate: deleteAuthorMutation } = useMutation({
    mutationFn: (authorId: string) => deleteAuthor(authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast({ title: "Author deleted", description: `"${author?.name}" has been removed.`, variant: "success" });
      navigate("/authors");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete author. Please try again.", variant: "destructive" });
    },
  });
  const handleDelete = useCallback(
    (): void => { if (author) deleteAuthorMutation(author._id); },
    [author, deleteAuthorMutation],
  );
  const handleAuthorUpdate = useCallback(
    (): void => { if (id) queryClient.invalidateQueries({ queryKey: ["authors", id] }); },
    [id, queryClient],
  );
  const availableCount = authorBooks.filter((b) => b.status === "in-shelf").length;

  return {
    author, isLoading, authorError, authorBooks, availableCount,
    formOpen, setFormOpen, deleteDialogOpen, setDeleteDialogOpen,
    handleDelete, handleAuthorUpdate,
  };
}
