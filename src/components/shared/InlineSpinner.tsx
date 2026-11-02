import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function InlineSpinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <svg
      className={cn("animate-spin text-current", sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface SpinnerOverlayProps {
  show?: boolean;
  text?: string;
  className?: string;
}

export function SpinnerOverlay({
  show = true,
  text,
  className,
}: SpinnerOverlayProps) {
  if (!show) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <InlineSpinner size="lg" className="text-primary" />
      {text && <p className="mt-3 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
