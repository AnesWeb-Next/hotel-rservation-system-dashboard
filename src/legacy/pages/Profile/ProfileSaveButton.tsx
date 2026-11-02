import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

export function ProfileSaveButton({ isPending }: { isPending: boolean }) {
  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={isPending} className="gap-2">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
