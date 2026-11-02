import { useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "@/api/endpoints/categories";
import { getAllBooks } from "@/api/endpoints/books";
import type { Category } from "@/types/category";

export function useCategoryDetailData() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: categoryResponse, isLoading } = useQuery({
    queryKey: ["categories", id], queryFn: () => getCategoryById(id!), enabled: Boolean(id),
  });
  const category = categoryResponse?.data ?? null;
  const { data: booksResponse } = useQuery({
    queryKey: ["books"], queryFn: () => getAllBooks(),
  });
  const books = booksResponse?.data ?? [];
  const categoryBooks = useMemo(() => {
    if (!category) return [];
    return books.filter((book) =>
      (typeof book.category === "string"
        ? book.category
        : (book.category as Category | undefined)?._id) === category._id,
    );
  }, [books, category]);
  const stats = useMemo(() => {
    const total = categoryBooks.length;
    const available = categoryBooks.filter((b) => b.status === "in-shelf").length;
    const totalCopies = categoryBooks.reduce((sum, b) => sum + b.totalStock, 0);
    return {
      total, available, outOfStock: total - available, totalCopies,
      availableCopies: categoryBooks.reduce((sum, b) => sum + b.availableStock, 0),
    };
  }, [categoryBooks]);

  return { id, category, isLoading, categoryBooks, stats, navigate };
}
