import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createBook, updateBook } from "@/api/endpoints/books";
import { bookFormSchema } from "@/validations/book";
import { toast } from "@/hooks/useToast";
import { generateSerialNumber } from "@/lib/utils";
import type { Book, BookFormInput } from "@/types/book";

type BookFormValues = z.infer<typeof bookFormSchema>;

interface UseBookFormMutationsOptions {
  book?: Book | null;
  onSuccess?: () => void;
  onOpenChange: (open: boolean) => void;
}

export function useBookFormMutations({
  book,
  onSuccess,
  onOpenChange,
}: UseBookFormMutationsOptions) {
  const queryClient = useQueryClient();
  const isEditing = Boolean(book);

  const { mutate: createBookMutation, isPending: isCreating } = useMutation({
    mutationFn: (bookData: BookFormInput) => createBook(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const { mutate: updateBookMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, book: bookData }: { id: string; book: Partial<BookFormInput> }) =>
      updateBook(id, bookData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", id] });
    },
  });

  const mutationCallbacks = (
    successTitle: string,
    successDesc: string,
    errorDesc: string,
  ) => ({
    onSuccess: () => {
      toast({ title: successTitle, description: successDesc, variant: "success" as const });
      onSuccess?.();
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Error", description: errorDesc, variant: "destructive" as const });
    },
  });

  const handleSubmit = async ({ value }: { value: BookFormValues }) => {
    const serialNumber = isEditing ? undefined : generateSerialNumber();

    const bookData = {
      title: value.title,
      author: value.author,
      category: value.category || undefined,
      ...(serialNumber ? { serialNumber } : {}),
      description: value.description,
      cover: value.cover || undefined,
      keywords: value.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      totalStock: value.totalStock,
      availableStock: value.availableStock,
      price: { original: value.priceOriginal, current: value.priceCurrent },
      rentalPrice: value.rentalPrice,
      lateFeePerDay: value.lateFeePerDay,
      status: value.availableStock > 0 ? "in-shelf" : "out-of-stock",
    } as const;

    if (isEditing && book) {
      updateBookMutation(
        { id: book._id, book: bookData },
        mutationCallbacks(
          "Book updated",
          `"${value.title}" has been updated successfully.`,
          "Failed to update book. Please try again.",
        ),
      );
    } else {
      createBookMutation(
        bookData as Parameters<typeof createBookMutation>[0],
        mutationCallbacks(
          "Book added",
          `"${value.title}" has been added to the library. Serial number: ${serialNumber}`,
          "Failed to add book. Please try again.",
        ),
      );
    }
  };

  return { handleSubmit, isCreating, isUpdating, isEditing };
}
