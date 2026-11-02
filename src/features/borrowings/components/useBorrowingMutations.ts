import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveBorrowing,
  rejectBorrowing,
  returnBorrowing,
  extendBorrowing,
} from "@/api/endpoints/borrowings";

export function useBorrowingMutations() {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: (id: string) => approveBorrowing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borrowings"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      rejectBorrowing(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borrowings"] });
    },
  });

  const returnMutation = useMutation({
    mutationFn: (id: string) => returnBorrowing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borrowings"] });
    },
  });

  const extendMutation = useMutation({
    mutationFn: ({ id, days }: { id: string; days: number }) =>
      extendBorrowing(id, days),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borrowings"] });
    },
  });

  return { approveMutation, rejectMutation, returnMutation, extendMutation };
}
