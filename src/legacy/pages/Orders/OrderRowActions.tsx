import { StatusActions } from "@/components/shared/StatusActions";
import { ActionsDropdown } from "@/components/shared/ActionsDropdown";
import { getOrderActions } from "@/lib/status-transitions";
import { Eye } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";

interface OrderRowActionsProps {
  order: Order;
  onView: (order: Order) => void;
  onStatusChange: (id: string, status: OrderStatus) => Promise<void>;
}

export function OrderRowActions({
  order,
  onView,
  onStatusChange,
}: OrderRowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <StatusActions
        actions={getOrderActions(order.status)}
        onStatusChange={async (newStatus) => {
          await onStatusChange(order._id, newStatus as OrderStatus);
        }}
        size="sm"
      />
      <ActionsDropdown
        actions={[
          {
            label: "View Details",
            icon: <Eye className="h-4 w-4" />,
            onClick: () => onView(order),
          },
        ]}
      />
    </div>
  );
}
