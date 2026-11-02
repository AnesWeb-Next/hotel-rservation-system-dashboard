import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("en");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Theme</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
              className="flex-1 gap-2"
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>
            <Button
              type="button"
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
              className="flex-1 gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>
            <Button
              type="button"
              variant={theme === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("system")}
              className="flex-1 gap-2"
            >
              <Monitor className="h-4 w-4" />
              System
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
