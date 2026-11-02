import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "@/api/endpoints/orders";
import { toast } from "@/hooks/useToast";
import type { OrderStatus } from "@/types/order";

export function useOrderStatusMutation(id: string | undefined) {
  const queryClient = useQueryClient();

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: (data: { status: OrderStatus; note?: string }) =>
      updateOrderStatus(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      toast({
        title: "Order updated",
        description: "The order status has been updated.",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update order status",
        variant: "destructive",
      });
    },
  });

  return { updateStatus };
}
