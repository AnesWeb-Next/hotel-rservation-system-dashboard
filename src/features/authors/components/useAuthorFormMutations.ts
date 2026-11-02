import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAuthor, updateAuthor } from "@/api/endpoints/authors";
import { toast } from "@/hooks/useToast";
import type { Author, AuthorFormInput } from "@/types/author";

interface UseAuthorFormMutationsOptions {
  author?: Author | null;
  onSuccess?: () => void;
  onOpenChange: (open: boolean) => void;
}

export function useAuthorFormMutations({
  author,
  onSuccess,
  onOpenChange,
}: UseAuthorFormMutationsOptions) {
  const queryClient = useQueryClient();
  const isEditing = Boolean(author);

  const { mutate: createAuthorMutation, isPending: isCreating } = useMutation({
    mutationFn: (authorData: AuthorFormInput) => createAuthor(authorData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast({
        title: "Author added",
        description: `"${response.data?.name}" has been added.`,
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add author",
        variant: "destructive",
      });
    },
  });

  const { mutate: updateAuthorMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      author: authorData,
    }: {
      id: string;
      author: Partial<AuthorFormInput>;
    }) => updateAuthor(id, authorData),
    onSuccess: (response, { id }) => {
      queryClient.setQueryData(["authors", id], response);
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast({
        title: "Author updated",
        description: `"${response.data?.name}" has been updated.`,
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update author",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async ({
    value,
  }: {
    value: { name: string; bio?: string };
  }) => {
    const authorData = { name: value.name, bio: value.bio || undefined };

    if (isEditing && author) {
      updateAuthorMutation(
        { id: author._id, author: authorData },
        {
          onSuccess: () => {
            onSuccess?.();
            onOpenChange(false);
          },
        },
      );
    } else {
      createAuthorMutation(
        authorData as Parameters<typeof createAuthorMutation>[0],
        {
          onSuccess: () => {
            onSuccess?.();
            onOpenChange(false);
          },
        },
      );
    }
  };

  return { handleSubmit, isCreating, isUpdating, isEditing };
}
