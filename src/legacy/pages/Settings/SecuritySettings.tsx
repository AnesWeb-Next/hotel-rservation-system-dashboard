import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
import { toast } from "@/hooks/useToast";

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("60");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security
            </p>
          </div>
          <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Session Timeout</Label>
          <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
              <SelectItem value="480">8 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() =>
            toast({
              title: "Coming Soon",
              description:
                "Password change functionality will be available soon.",
            })
          }
        >
          Change Password
        </Button>
      </CardContent>
    </Card>
  );
}
