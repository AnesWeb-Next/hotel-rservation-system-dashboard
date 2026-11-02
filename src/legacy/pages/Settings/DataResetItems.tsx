import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/useToast";

const handleClearData = (): void => {
  toast({
    title: "Data Cleared",
    description: "All mock data has been reset.",
    variant: "destructive",
  });
};

export function DataResetItems() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Refresh Mock Data</Label>
          <p className="text-sm text-muted-foreground">
            Reload the initial mock data set
          </p>
        </div>
        <Button
          variant="outline"
          type="button"
          className="gap-2"
          onClick={() => {
            window.location.reload();
            toast({
              title: "Page Refreshed",
              description: "Mock data has been reloaded.",
            });
          }}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-destructive">Clear Mock Data</Label>
          <p className="text-sm text-muted-foreground">
            Reset all data to initial state (development only)
          </p>
        </div>
        <Button variant="destructive" type="button" onClick={handleClearData}>
          Clear Data
        </Button>
      </div>
    </>
  );
}
