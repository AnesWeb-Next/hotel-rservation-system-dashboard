import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveBorrowing,
  rejectBorrowing,
  returnBorrowing,
} from "@/api/endpoints/borrowings";
import { toast } from "@/hooks/useToast";

interface UseProcessBorrowMutationsOptions {
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function useProcessBorrowMutations({
  onOpenChange,
  onSuccess,
}: UseProcessBorrowMutationsOptions) {
  const queryClient = useQueryClient();

  const invalidateBorrowing = (id: string) => {
    queryClient.invalidateQueries({ queryKey: ["borrowings", id] });
    queryClient.invalidateQueries({ queryKey: ["borrowings"] });
  };

  const approveMutation = useMutation({
    mutationFn: (id: string) => approveBorrowing(id),
    onSuccess: (_, id) => {
      invalidateBorrowing(id);
      toast({
        title: "Borrowing approved",
        description: "Status changed to approved.",
        variant: "success",
      });
      onOpenChange(false);
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to approve borrowing.",
        variant: "destructive",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      rejectBorrowing(id, reason),
    onSuccess: (_, { id }) => {
      invalidateBorrowing(id);
      toast({
        title: "Borrowing rejected",
        description: "Status changed to rejected.",
        variant: "success",
      });
      onOpenChange(false);
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reject borrowing.",
        variant: "destructive",
      });
    },
  });

  const returnMutation = useMutation({
    mutationFn: (id: string) => returnBorrowing(id),
    onSuccess: (_, id) => {
      invalidateBorrowing(id);
      toast({
        title: "Book returned",
        description: "Status changed to returned.",
        variant: "success",
      });
      onOpenChange(false);
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to mark as returned.",
        variant: "destructive",
      });
    },
  });

  const isPending =
    approveMutation.isPending ||
    rejectMutation.isPending ||
    returnMutation.isPending;

  return { approveMutation, rejectMutation, returnMutation, isPending };
}
