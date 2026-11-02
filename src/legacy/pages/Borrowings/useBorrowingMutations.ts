import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveBorrowing,
  rejectBorrowing,
  returnBorrowing,
  extendBorrowing,
} from "@/api/endpoints/borrowings";
import { toast } from "@/hooks/useToast";

export function useBorrowingMutations() {
  const queryClient = useQueryClient();

  const { mutateAsync: approveAsync } = useMutation({
    mutationFn: (id: string) => approveBorrowing(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["borrowings"] });
      queryClient.invalidateQueries({ queryKey: ["borrowings", id] });
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
    mutationFn: (id: string) => rejectBorrowing(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["borrowings"] });
      queryClient.invalidateQueries({ queryKey: ["borrowings", id] });
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
    mutationFn: (id: string) => returnBorrowing(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["borrowings"] });
      queryClient.invalidateQueries({ queryKey: ["borrowings", id] });
      toast({
        title: "Book returned",
        description: "The book has been marked as returned.",
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

  const { mutate: extendDueDate } = useMutation({
    mutationFn: ({
      id,
      days = 7,
    }: {
      id: string;
      currentDueDate: string;
      days?: number;
    }) => extendBorrowing(id, days),
    onSuccess: (_, { id, days = 7 }) => {
      queryClient.invalidateQueries({ queryKey: ["borrowings"] });
      queryClient.invalidateQueries({ queryKey: ["borrowings", id] });
      toast({
        title: "Due date extended",
        description: `The due date has been extended by ${days} days.`,
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to extend due date",
        variant: "destructive",
      });
    },
  });

  return { approveAsync, rejectAsync, returnAsync, extendDueDate };
}
