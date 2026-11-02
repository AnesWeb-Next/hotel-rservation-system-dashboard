import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Order } from "@/types/order";
import { MapPin, Clock } from "lucide-react";

export function OrderDetailInfoCards({ order }: { order: Order }) {
  return (
    <>
      {order.deliveryMethod === "delivery" && order.shippingAddress && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {order.shippingAddress.fullName && (
                <p className="font-medium">{order.shippingAddress.fullName}</p>
              )}
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}
                {order.shippingAddress.state
                  ? `, ${order.shippingAddress.state}`
                  : ""}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="text-muted-foreground">
                Phone: {order.shippingAddress.phone}
              </p>
              {order.shippingAddress.instructions && (
                <p className="text-sm text-muted-foreground mt-2">
                  Note: {order.shippingAddress.instructions}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {order.orderNotes && (
        <Card>
          <CardHeader>
            <CardTitle>Order Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{order.orderNotes}</p>
          </CardContent>
        </Card>
      )}

      {order.statusHistory && order.statusHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Status History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.statusHistory.map((history, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{history.status}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(history.changedAt)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
