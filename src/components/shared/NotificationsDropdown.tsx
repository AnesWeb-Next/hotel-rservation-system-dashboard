import { useNavigate } from "react-router";
import { Bell, ShoppingCart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";

export function NotificationsDropdown() {
  const navigate = useNavigate();
  const { pendingOrders, overdueBorrowings, notificationCount } =
    useNotifications();

  const items = [
    {
      condition: pendingOrders > 0,
      icon: ShoppingCart,
      text: `${pendingOrders} pending orders`,
      path: "/orders",
    },
    {
      condition: overdueBorrowings > 0,
      icon: FileText,
      text: `${overdueBorrowings} overdue borrowings`,
      path: "/borrowings",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9"
          aria-label="View notifications"
          type="button"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map(
          (item) =>
            item.condition && (
              <DropdownMenuItem
                key={item.path}
                className="cursor-pointer"
                onClick={() => navigate(item.path)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(item.path);
                }}
              >
                <item.icon className="h-4 w-4 mr-2" />
                <span>{item.text}</span>
              </DropdownMenuItem>
            ),
        )}
        {notificationCount === 0 && (
          <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
