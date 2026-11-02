import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { Order } from "@/types/order";
import { Calendar, DollarSign, Truck } from "lucide-react";
export function getOrderDetailSideCards(order: Order) {
  return [
    <Card key="status">
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatusBadge status={order.status} type="order" />
        <div className="flex items-center gap-2 text-sm">
          <Badge
            variant={order.paymentStatus === "paid" ? "default" : "secondary"}
          >
            Payment: {order.paymentStatus}
          </Badge>
        </div>
      </CardContent>
    </Card>,
    <Card key="payment">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {order.shippingFee > 0 ? formatCurrency(order.shippingFee) : "Free"}
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t">
          <span className="font-medium">Total</span>
          <span className="font-bold text-lg">
            {formatCurrency(order.totalPrice)}
          </span>
        </div>
      </CardContent>
    </Card>,
    <Card key="delivery">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Delivery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Method</span>
          <Badge variant="outline">
            {order.deliveryMethod === "pickup"
              ? "Store Pickup"
              : "Home Delivery"}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment</span>
          <span className="capitalize">
            {order.paymentMethod.replace(/_/g, " ")}
          </span>
        </div>
        {order.trackingNumber && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tracking</span>
            <span className="font-mono">{order.trackingNumber}</span>
          </div>
        )}
      </CardContent>
    </Card>,
    <Card key="dates">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Placed</span>
          <span>{formatDate(order.createdAt)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Updated</span>
          <span>{formatDate(order.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>,
  ];
}
