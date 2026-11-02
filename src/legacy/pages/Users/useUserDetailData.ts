import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/endpoints/users";
import { getAllBorrowings } from "@/api/endpoints/borrowings";
import type { User } from "@/types/user";
import type { Borrow } from "@/types/borrow";
import { useUserDetailMutations } from "./useUserDetailMutations";

export function useUserDetailData() {
  const { id } = useParams<{ id: string }>();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);

  const { data: userResponse, isLoading } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id!),
    enabled: Boolean(id),
  });
  const user = userResponse?.data ?? null;

  const { data: borrowingsResponse } = useQuery({
    queryKey: ["borrowings"],
    queryFn: () => getAllBorrowings(),
  });
  const allBorrowings = borrowingsResponse?.data ?? [];
  const borrowings: Borrow[] = allBorrowings.filter((b: Borrow) => {
    const userId =
      typeof b.user === "object" && b.user !== null
        ? (b.user as User)._id
        : String(b.user);
    return userId === id;
  });

  const activeBorrowings = borrowings.filter(
    (b) => b.status === "active" || b.status === "approved",
  ).length;
  const overdueBorrowings = borrowings.filter(
    (b) => b.status === "overdue",
  ).length;

  const { handleDelete, handleToggleActive, handleFormSuccess } =
    useUserDetailMutations(id, user, setDeactivateDialogOpen);

  return {
    id,
    user,
    isLoading,
    borrowings,
    activeBorrowings,
    overdueBorrowings,
    formOpen,
    setFormOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deactivateDialogOpen,
    setDeactivateDialogOpen,
    handleDelete,
    handleToggleActive,
    handleFormSuccess,
  };
}
