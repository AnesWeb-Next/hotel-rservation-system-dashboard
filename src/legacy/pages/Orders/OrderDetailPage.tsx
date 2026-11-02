import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { StatusActions } from "@/components/shared/StatusActions";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { getOrderById } from "@/api/endpoints/orders";
import { getOrderActions } from "@/lib/status-transitions";
import { formatDate } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";
import { OrderDetailMainCard } from "@/pages/Orders/OrderDetailMainCard";
import { getOrderDetailSideCards } from "@/pages/Orders/OrderDetailSideCards";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useOrderStatusMutation } from "./useOrderStatusMutation";

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: orderResponse, isLoading: loading } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id!),
    enabled: Boolean(id),
  });
  const order = orderResponse?.data ?? null;

  const { updateStatus } = useOrderStatusMutation(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <DetailPageLayout
        breadcrumbs={[
          { label: "Orders", href: "/orders" },
          { label: "Not Found" },
        ]}
        title="Order not found"
        backHref="/orders"
        mainCard={
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Order not found</h2>
              <p className="text-muted-foreground mt-2">
                The order you&apos;re looking for doesn&apos;t exist.
              </p>
            </CardContent>
          </Card>
        }
      />
    );
  }

  const orderActions = getOrderActions(order.status);

  const actions =
    orderActions.length > 0 ? (
      <StatusActions
        actions={orderActions}
        onStatusChange={async (newStatus) => {
          await updateStatus({ status: newStatus as OrderStatus });
        }}
      />
    ) : undefined;

  return (
    <DetailPageLayout
      breadcrumbs={[
        { label: "Orders", href: "/orders" },
        { label: `#${order._id.slice(-6).toUpperCase()}` },
      ]}
      title={`Order #${order._id.slice(-6).toUpperCase()}`}
      subtitle={`Placed on ${formatDate(order.createdAt)}`}
      backHref="/orders"
      actions={actions}
      mainCard={<OrderDetailMainCard order={order} />}
      sideCards={getOrderDetailSideCards(order)}
    />
  );
}
