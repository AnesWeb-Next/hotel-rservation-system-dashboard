import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Settings } from "lucide-react";

export function LibrarySettings() {
  const [borrowDuration, setBorrowDuration] = useState("14");
  const [maxBooks, setMaxBooks] = useState("3");
  const [autoApprove, setAutoApprove] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Library Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Default Borrow Duration (days)</Label>
          <Select value={borrowDuration} onValueChange={setBorrowDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="21">21 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Max Books Per User</Label>
          <Select value={maxBooks} onValueChange={setMaxBooks}>
            <SelectTrigger>
              <SelectValue placeholder="Select limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 books</SelectItem>
              <SelectItem value="5">5 books</SelectItem>
              <SelectItem value="10">10 books</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto-approve Borrowings</Label>
            <p className="text-sm text-muted-foreground">
              Automatically approve borrow requests
            </p>
          </div>
          <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
        </div>
      </CardContent>
    </Card>
  );
}
