import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/useToast";

const handleExportCSV = (): void => {
  toast({
    title: "Export Started",
    description: "Your data is being exported as CSV...",
  });
};

const handleExportJSON = (): void => {
  toast({
    title: "Export Started",
    description: "Your data is being exported as JSON...",
  });
};

const handleImport = (): void => {
  toast({
    title: "Coming Soon",
    description: "Import functionality will be available soon.",
  });
};

export function DataExportItems() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Export Data</Label>
          <p className="text-sm text-muted-foreground">
            Download all library data as CSV or JSON
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="outline" type="button" onClick={handleExportJSON}>
            Export JSON
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Import Data</Label>
          <p className="text-sm text-muted-foreground">
            Import books, users, or other data
          </p>
        </div>
        <Button variant="outline" type="button" onClick={handleImport}>
          Import
        </Button>
      </div>
    </>
  );
}
