import type { FilterOption } from "@/components/shared/FilterSheet";
import type { FilterValue } from "@/components/shared/filterTypes";
import type { Order } from "@/types/order";

export const ordersFilterOptions: FilterOption[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "All statuses",
    options: [
      { value: "pending", label: "Pending" },
      { value: "processing", label: "Processing" },
      { value: "shipped", label: "Shipped" },
      { value: "delivered", label: "Delivered" },
      { value: "completed", label: "Completed" },
      { value: "cancelled", label: "Cancelled" },
    ],
  },
  {
    key: "deliveryMethod",
    label: "Delivery Method",
    type: "select",
    placeholder: "All methods",
    options: [
      { value: "pickup", label: "Pickup" },
      { value: "delivery", label: "Delivery" },
    ],
  },
  { key: "minTotal", label: "Min Total", type: "number", placeholder: "0" },
  { key: "maxTotal", label: "Max Total", type: "number", placeholder: "Any" },
];

export function filterOrders(
  orders: Order[],
  searchQuery: string,
  filters: FilterValue,
): Order[] {
  return orders.filter((order) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!order._id.toLowerCase().includes(query)) return false;
    }
    if (filters.status && order.status !== filters.status) return false;
    if (
      filters.deliveryMethod &&
      order.deliveryMethod !== filters.deliveryMethod
    )
      return false;
    if (
      filters.minTotal !== undefined &&
      order.totalPrice < Number(filters.minTotal)
    )
      return false;
    if (
      filters.maxTotal !== undefined &&
      order.totalPrice > Number(filters.maxTotal)
    )
      return false;
    return true;
  });
}
