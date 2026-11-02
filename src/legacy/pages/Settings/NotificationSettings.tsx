import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [overdueAlerts, setOverdueAlerts] = useState(true);
  const [newOrderAlerts, setNewOrderAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive email alerts for important events
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Overdue Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about overdue borrowings
            </p>
          </div>
          <Switch checked={overdueAlerts} onCheckedChange={setOverdueAlerts} />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>New Order Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified when new orders are placed
            </p>
          </div>
          <Switch
            checked={newOrderAlerts}
            onCheckedChange={setNewOrderAlerts}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Low Stock Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified when book stock is low
            </p>
          </div>
          <Switch
            checked={lowStockAlerts}
            onCheckedChange={setLowStockAlerts}
          />
        </div>
      </CardContent>
    </Card>
  );
}
