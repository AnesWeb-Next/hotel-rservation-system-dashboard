import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { Save } from "lucide-react";
import { toast } from "@/hooks/useToast";
import { AppearanceSettings } from "@/pages/Settings/AppearanceSettings";
import { NotificationSettings } from "@/pages/Settings/NotificationSettings";
import { LibrarySettings } from "@/pages/Settings/LibrarySettings";
import { SecuritySettings } from "@/pages/Settings/SecuritySettings";
import { DataManagementSettings } from "@/pages/Settings/DataManagementSettings";

export function SettingsPage() {
  const handleSaveSettings = (): void => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
      variant: "success",
    });
  };

  const pageActions = (
    <Button type="button" onClick={handleSaveSettings} className="gap-2">
      <Save className="h-4 w-4" />
      Save Changes
    </Button>
  );

  return (
    <PageLayout
      breadcrumbs={[{ label: "Settings" }]}
      title="Settings"
      description="Manage your admin dashboard preferences"
      action={pageActions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppearanceSettings />
        <NotificationSettings />
        <LibrarySettings />
        <SecuritySettings />
        <DataManagementSettings />
      </div>
    </PageLayout>
  );
}
