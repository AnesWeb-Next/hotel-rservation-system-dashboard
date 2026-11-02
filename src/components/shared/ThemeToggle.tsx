import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "Light" : "Dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${nextTheme} mode`}
          className="h-9 w-9 relative overflow-hidden"
          type="button"
        >
          <Sun className="h-5 w-5 absolute transition-all duration-300 ease-in-out rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="h-5 w-5 absolute transition-all duration-300 ease-in-out rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Switch to {nextTheme} mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
