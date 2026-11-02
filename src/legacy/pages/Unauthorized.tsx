import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ShieldX, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Unauthorized() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
          <ShieldX className="h-10 w-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access the admin dashboard. Only
            administrators can access this area.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)} type="button">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button variant="destructive" onClick={handleLogout} type="button">
            <LogOut className="h-4 w-4 mr-2" />
            Logout & Switch Account
          </Button>
        </div>
      </div>
    </div>
  );
}
