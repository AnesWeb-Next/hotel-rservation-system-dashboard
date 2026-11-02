import { useEffect, useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  TextInputField,
  TextareaField,
  type AnyFieldApi,
} from "@/components/shared/FormFields";
import { authorFormSchema } from "@/validations/author";
import type { Author } from "@/types/author";
import { useAuthorFormMutations } from "./useAuthorFormMutations";

type AuthorFormValues = z.infer<typeof authorFormSchema>;

interface AuthorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  author?: Author | null;
  onSuccess?: () => void;
}

export function AuthorForm({
  open,
  onOpenChange,
  author,
  onSuccess,
}: AuthorFormProps) {
  const { handleSubmit, isCreating, isUpdating, isEditing } =
    useAuthorFormMutations({ author, onSuccess, onOpenChange });

  const defaultValues = useMemo<AuthorFormValues>(
    () => ({ name: author?.name ?? "", bio: author?.bio ?? "" }),
    [author],
  );

  const form = useForm({ defaultValues, onSubmit: handleSubmit });

  // Reset form when author changes or dialog opens/closes
  useEffect(() => {
    if (open) form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, author?._id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Author" : "Add New Author"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the author details below."
              : "Fill in the details to add a new author."}
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
          <form.Field
            name="name"
            validators={{ onChange: authorFormSchema.shape.name }}
          >
            {(field) => (
              <TextInputField
                field={field}
                label="Name"
                placeholder="Enter author name"
                required
              />
            )}
          </form.Field>
          <form.Field
            name="bio"
            validators={{ onChange: authorFormSchema.shape.bio }}
          >
            {(field) => (
              <TextareaField
                field={field as AnyFieldApi<string>}
                label="Biography"
                placeholder="Author biography..."
                rows={4}
              />
            )}
          </form.Field>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={
                    !canSubmit || isSubmitting || isCreating || isUpdating
                  }
                >
                  {isSubmitting || isCreating || isUpdating
                    ? "Saving..."
                    : isEditing
                      ? "Update Author"
                      : "Add Author"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
