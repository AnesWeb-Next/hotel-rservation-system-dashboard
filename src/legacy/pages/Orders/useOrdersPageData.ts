import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, updateOrderStatus } from "@/api/endpoints/orders";
import { paginate } from "@/lib/utils";
import { toast } from "@/hooks/useToast";
import type { Order, OrderStatus } from "@/types/order";
import type { FilterValue } from "@/components/shared/FilterSheet";
import { filterOrders } from "./ordersFilterConfig";

const PAGE_SIZE = 5;

export function useOrdersPageData() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: ordersResponse, isLoading, error, refetch } = useQuery({
    queryKey: ["orders"], queryFn: () => getAllOrders(),
  });
  const orders = useMemo(() => ordersResponse?.data ?? [], [ordersResponse]);
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { status: OrderStatus; note?: string } }) =>
      updateOrderStatus(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      toast({ title: "Order updated", description: "The order status has been updated.", variant: "success" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to update order status", variant: "destructive" });
    },
  });
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterValue>({});
  const [currentPage, setCurrentPage] = useState(1);
  const handleView = (order: Order) => navigate(`/orders/${order._id}`);
  const handleStatusChange = async (id: string, status: OrderStatus) => {
    await updateStatus({ id, data: { status } });
  };
  const filteredOrders = useMemo(
    () => filterOrders(orders, searchQuery, filters),
    [orders, searchQuery, filters],
  );
  const { data: paginatedOrders, totalPages, totalItems } = paginate(
    filteredOrders, currentPage, PAGE_SIZE,
  );
  const [prevFilters, setPrevFilters] = useState(filters);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  if (prevFilters !== filters || prevSearchQuery !== searchQuery) {
    setPrevFilters(filters);
    setPrevSearchQuery(searchQuery);
    setCurrentPage(1);
  }
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return {
    isLoading, error, refetch, paginatedOrders, totalPages, totalItems,
    filterSheetOpen, setFilterSheetOpen, searchQuery, setSearchQuery,
    filters, setFilters, currentPage, setCurrentPage, activeFiltersCount,
    handleView, handleStatusChange,
  };
}
