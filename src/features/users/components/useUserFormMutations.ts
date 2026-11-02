import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createUser, updateUser } from "@/api/endpoints/users";
import { userFormSchema } from "@/validations/user";
import { toast } from "@/hooks/useToast";
import type { User, UserFormInput, UserRole } from "@/types/user";
type UserFormValues = z.infer<typeof userFormSchema>;

interface UseUserFormMutationsOptions {
  user?: User | null;
  onSuccess?: () => void;
  onOpenChange: (open: boolean) => void;
}
export function useUserFormMutations({
  user,
  onSuccess,
  onOpenChange,
}: UseUserFormMutationsOptions) {
  const queryClient = useQueryClient();
  const isEditing = Boolean(user);
  const { mutate: createUserMutation, isPending: isCreating } = useMutation({
    mutationFn: (userData: UserFormInput) => createUser(userData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User added",
        description: `${response.data?.firstName} ${response.data?.lastName} has been added.`,
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add user",
        variant: "destructive",
      });
    },
  });
  const { mutate: updateUserMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      user: userData,
    }: {
      id: string;
      user: Partial<UserFormInput>;
    }) => updateUser(id, userData),
    onSuccess: (response, { id }) => {
      queryClient.setQueryData(["users", id], response);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User updated",
        description: `${response.data?.firstName} ${response.data?.lastName} has been updated.`,
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
    },
  });
  const handleSubmit = async ({ value }: { value: UserFormValues }) => {
    const userData: UserFormInput = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      role: value.role as UserRole,
      borrowLimit: value.borrowLimit,
    };

    // Only include password when creating a new user
    if (!isEditing && value.password) {
      userData.password = value.password;
    }

    if (isEditing && user) {
      updateUserMutation(
        { id: user._id, user: userData },
        {
          onSuccess: () => {
            onOpenChange(false);
            onSuccess?.();
          },
        },
      );
    } else {
      createUserMutation(userData, {
        onSuccess: () => {
          onOpenChange(false);
          onSuccess?.();
        },
      });
    }
  };

  return { handleSubmit, isCreating, isUpdating, isEditing };
}
