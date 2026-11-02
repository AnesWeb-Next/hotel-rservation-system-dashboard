import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, updateUser } from "@/api/endpoints/users";
import { toast } from "@/hooks/useToast";
import type { User, UserFormInput } from "@/types/user";

export function useUserDetailMutations(
  id: string | undefined,
  user: User | null,
  setDeactivateDialogOpen: (open: boolean) => void,
) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User deleted",
        description: `${user?.firstName} ${user?.lastName} has been removed.`,
        variant: "success",
      });
      navigate("/users");
    },
  });

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: Partial<UserFormInput>;
    }) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });

  const handleDelete = (): void => {
    if (user) deleteUserMutation(user._id);
  };

  const handleToggleActive = (): void => {
    if (!user) return;
    updateUserMutation(
      { userId: user._id, data: { isActive: !user.isActive } },
      {
        onSuccess: () => {
          toast({
            title: user.isActive ? "User deactivated" : "User activated",
            description: `${user.firstName} ${user.lastName} has been ${user.isActive ? "deactivated" : "activated"}.`,
            variant: "success",
          });
          setDeactivateDialogOpen(false);
        },
      },
    );
  };

  const handleFormSuccess = (): void => {
    if (id) queryClient.invalidateQueries({ queryKey: ["users", id] });
  };

  return { handleDelete, handleToggleActive, handleFormSuccess };
}
