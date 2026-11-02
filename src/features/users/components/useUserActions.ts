import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBorrowings } from "@/api/endpoints/borrowings";
import { updateUser } from "@/api/endpoints/users";
import { toast } from "@/hooks/useToast";
import type { User, UserFormInput } from "@/types/user";
export function useUserActions(user: User) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: borrowingsResponse } = useQuery({
    queryKey: ["borrowings"],
    queryFn: () => getAllBorrowings(),
  });
  const borrowings = borrowingsResponse?.data ?? [];
  const { mutate: updateUserMutation } = useMutation({
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
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
    },
  });
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [reactivateDialogOpen, setReactivateDialogOpen] = useState(false);
  const userBorrowings = borrowings.filter((b) => {
    const userId = typeof b.user === "string" ? b.user : b.user?._id;
    return userId === user._id;
  });
  const activeBorrowings = userBorrowings.filter(
    (b) => b.status === "active" || b.status === "approved",
  );
  const overdueBorrowings = userBorrowings.filter(
    (b) => b.status === "overdue",
  );
  const handleViewProfile = () => navigate(`/users/${user._id}`);
  const handleViewHistory = () => navigate(`/users/${user._id}?tab=history`);
  const handleEdit = () => navigate(`/users/${user._id}?edit=true`);
  const handleNewBorrowing = () =>
    navigate(`/borrowings/new?userId=${user._id}`);
  const handleToggleActive = (activate: boolean) => {
    const action = activate ? "reactivated" : "suspended";
    updateUserMutation(
      { id: user._id, user: { isActive: activate } },
      {
        onSuccess: () => {
          toast({
            title: `Account ${action}`,
            description: `${user.firstName} ${user.lastName}'s account has been ${action}.`,
            variant: "success",
          });
          if (activate) setReactivateDialogOpen(false);
          else setSuspendDialogOpen(false);
        },
        onError: () => {
          toast({
            title: "Error",
            description: `Failed to ${activate ? "reactivate" : "suspend"} account. Please try again.`,
            variant: "destructive",
          });
        },
      },
    );
  };

  return {
    activeBorrowings,
    overdueBorrowings,
    contactDialogOpen,
    setContactDialogOpen,
    reminderDialogOpen,
    setReminderDialogOpen,
    suspendDialogOpen,
    setSuspendDialogOpen,
    reactivateDialogOpen,
    setReactivateDialogOpen,
    handleViewProfile,
    handleViewHistory,
    handleEdit,
    handleNewBorrowing,
    handleSuspend: () => handleToggleActive(false),
    handleReactivate: () => handleToggleActive(true),
  };
}
