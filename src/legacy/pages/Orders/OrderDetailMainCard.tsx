import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "@/types/order";
import type { User } from "@/types/user";
import { OrderDetailInfoCards } from "@/pages/Orders/OrderDetailInfoCards";
import { ShoppingCart, User as UserIcon } from "lucide-react";

function getUserName(user: string | User | undefined): string {
  if (!user) return "Unknown User";
  if (typeof user === "string") return user;
  return `${user.firstName} ${user.lastName}`;
}

export function OrderDetailMainCard({ order }: { order: Order }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Items ({order.books.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.books.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="font-medium">
                  {formatCurrency(item.quantity * item.price)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">
              {getUserName(order.userId as User)}
            </span>
          </div>
          {typeof order.userId === "object" && order.userId && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{(order.userId as User).email}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <OrderDetailInfoCards order={order} />
    </div>
  );
}
