import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveBorrowing,
  rejectBorrowing,
  returnBorrowing,
} from "@/api/endpoints/borrowings";
import { toast } from "@/hooks/useToast";

export function useBorrowingDetailMutations(id: string | undefined) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["borrowings"] });
    queryClient.invalidateQueries({ queryKey: ["borrowings", id] });
  };

  const { mutateAsync: approveAsync } = useMutation({
    mutationFn: (borrowId: string) => approveBorrowing(borrowId),
    onSuccess: () => {
      invalidate();
      toast({
        title: "Borrowing approved",
        description: "The borrowing request has been approved.",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to approve borrowing",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: rejectAsync } = useMutation({
    mutationFn: (borrowId: string) => rejectBorrowing(borrowId),
    onSuccess: () => {
      invalidate();
      toast({
        title: "Borrowing rejected",
        description: "The borrowing request has been rejected.",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reject borrowing",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: returnAsync } = useMutation({
    mutationFn: (borrowId: string) => returnBorrowing(borrowId),
    onSuccess: () => {
      invalidate();
      toast({
        title: "Book returned",
        description: "The borrowing has been marked as returned.",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark as returned",
        variant: "destructive",
      });
    },
  });

  return { approveAsync, rejectAsync, returnAsync };
}
