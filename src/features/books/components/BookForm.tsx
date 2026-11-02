import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/book";
import { useBookFormData } from "./useBookFormData";
import { useBookFormMutations } from "./useBookFormMutations";
import { BookFormBasicFields } from "./BookFormBasicFields";
import { BookFormDetailFields } from "./BookFormDetailFields";
import { BookFormPriceFields } from "./BookFormPriceFields";

interface BookFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book?: Book | null;
  onSuccess?: () => void;
}

export function BookForm({
  open,
  onOpenChange,
  book,
  onSuccess,
}: BookFormProps) {
  const { defaultValues, authorOptions, categoryOptions } = useBookFormData(book);
  const { handleSubmit, isCreating, isUpdating, isEditing } =
    useBookFormMutations({ book, onSuccess, onOpenChange });

  const form = useForm({ defaultValues, onSubmit: handleSubmit });

  // Reset form when book changes or dialog opens/closes
  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, book?._id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Book" : "Add New Book"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the book details below."
              : "Fill in the details to add a new book to the library."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <BookFormBasicFields
              form={form}
              authorOptions={authorOptions}
              categoryOptions={categoryOptions}
            />
            <BookFormDetailFields form={form} />
            <BookFormPriceFields form={form} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isCreating || isUpdating}
                >
                  {isSubmitting || isCreating || isUpdating
                    ? "Saving..."
                    : isEditing ? "Update Book" : "Add Book"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
