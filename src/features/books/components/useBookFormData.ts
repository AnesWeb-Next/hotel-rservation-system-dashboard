import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getAllAuthors } from "@/api/endpoints/authors";
import { getAllCategories } from "@/api/endpoints/categories";
import { bookFormSchema } from "@/validations/book";
import { getIdFromRef } from "@/lib/utils";
import type { Book } from "@/types/book";
import type { Author } from "@/types/author";
import type { Category } from "@/types/category";

type BookFormValues = z.infer<typeof bookFormSchema>;

export function useBookFormData(book?: Book | null) {
  const { data: authorsResponse } = useQuery({
    queryKey: ["authors"],
    queryFn: () => getAllAuthors(),
  });
  const { data: categoriesResponse } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const categories: Category[] = categoriesResponse?.data ?? [];
  const authors: Author[] = authorsResponse?.data ?? [];

  const defaultValues = useMemo<BookFormValues>(
    () => ({
      title: book?.title ?? "",
      author: getIdFromRef(book?.author as string | Author | undefined),
      category: getIdFromRef(book?.category as string | Category | undefined),
      description: book?.description ?? "",
      cover: book?.cover ?? "",
      keywords: book?.keywords?.join(", ") ?? "",
      totalStock: book?.totalStock ?? 0,
      availableStock: book?.availableStock ?? 0,
      priceOriginal: book?.price?.original,
      priceCurrent: book?.price?.current ?? 0,
      rentalPrice: book?.rentalPrice ?? 0,
      lateFeePerDay: book?.lateFeePerDay ?? 0,
    }),
    [book],
  );

  const categoryOptions = categories.map((cat: Category) => ({
    value: cat._id,
    label: cat.name,
  }));

  const authorOptions = authors.map((auth: Author) => ({
    value: auth._id,
    label: auth.name,
  }));

  return { defaultValues, authorOptions, categoryOptions };
}
