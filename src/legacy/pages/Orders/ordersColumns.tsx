import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { Order } from "@/types/order";

export function getOrdersColumns() {
  return [
    {
      key: "_id" as const,
      header: "Order ID",
      className: "w-[100px]",
      render: (order: Order) => (
        <span className="font-mono text-xs">#{order._id.slice(-6)}</span>
      ),
    },
    {
      key: "books" as const,
      header: "Items",
      className: "w-[80px]",
      render: (order: Order) => <span>{order.books.length} book(s)</span>,
    },
    {
      key: "totalPrice" as const,
      header: "Total",
      sortable: true,
      className: "w-[100px]",
      render: (order: Order) => (
        <span className="font-medium">{formatCurrency(order.totalPrice)}</span>
      ),
    },
    {
      key: "deliveryMethod" as const,
      header: "Delivery",
      className: "w-[100px]",
      render: (order: Order) => (
        <span className="capitalize">{order.deliveryMethod}</span>
      ),
    },
    {
      key: "createdAt" as const,
      header: "Date",
      sortable: true,
      render: (order: Order) => formatDate(order.createdAt),
    },
    {
      key: "status" as const,
      header: "Status",
      sortable: true,
      className: "w-[120px]",
      render: (order: Order) => (
        <StatusBadge status={order.status} type="order" />
      ),
    },
  ];
}
