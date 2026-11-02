import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Database } from "lucide-react";
import { DataExportItems } from "@/pages/Settings/DataExportItems";
import { DataResetItems } from "@/pages/Settings/DataResetItems";

export function DataManagementSettings() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <DataExportItems />
        <Separator />
        <DataResetItems />
      </CardContent>
    </Card>
  );
}
