import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NotificationsDropdown } from "@/components/shared/NotificationsDropdown";
import { UserMenuDropdown } from "@/components/shared/UserMenuDropdown";
import { SidebarTrigger } from "../ui/sidebar";

export function Navbar() {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side - can be used for breadcrumbs or page title */}
        <div className="flex items-center gap-4">
          {/* Placeholder for page-specific content */}
          <SidebarTrigger />
        </div>

        {/* Right side - Actions and User Menu */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NotificationsDropdown />
          <UserMenuDropdown
            nameClassName="hidden md:flex flex-col items-start text-left"
          />
        </div>
      </div>
    </header>
  );
}
