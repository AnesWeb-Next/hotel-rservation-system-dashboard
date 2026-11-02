import { useNavigate } from "react-router";
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

interface UserMenuDropdownProps {
  triggerClassName?: string;
  nameClassName?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function UserMenuDropdown({
  triggerClassName = "gap-3 h-auto py-2",
  nameClassName = "flex flex-col items-start text-left",
}: UserMenuDropdownProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={triggerClassName} type="button">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={fullName} />
            <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
          </Avatar>
          <div className={nameClassName}>
            <span className="text-sm font-medium">{fullName}</span>
            <span className="text-xs text-muted-foreground capitalize">
              {user.role}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate("/profile")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate("/profile");
          }}
        >
          <User className="h-4 w-4 mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate("/settings")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate("/settings");
          }}
        >
          <Settings className="h-4 w-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={handleLogout}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleLogout();
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
