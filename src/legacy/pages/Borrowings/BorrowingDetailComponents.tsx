import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function OverdueNoticeCard() {
  return (
    <Card className="border-destructive bg-destructive/10">
      <CardContent className="p-4 flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <div>
          <p className="font-medium text-destructive">Overdue Notice</p>
          <p className="text-sm text-muted-foreground">
            This book is overdue. Late fee applies.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
