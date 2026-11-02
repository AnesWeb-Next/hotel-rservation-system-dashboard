import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePasswordStrength } from "./usePasswordStrength";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const { strength, score } = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              score >= level
                ? score <= 2
                  ? "bg-red-500"
                  : score <= 3
                    ? "bg-yellow-500"
                    : "bg-green-500"
                : "bg-muted",
            )}
          />
        ))}
      </div>
      <ul className="space-y-1 text-xs">
        {strength.map((rule) => (
          <li
            key={rule.label}
            className={cn(
              "flex items-center gap-2",
              rule.passed ? "text-green-500" : "text-muted-foreground",
            )}
          >
            {rule.passed ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <XCircle className="h-3 w-3" />
            )}
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
