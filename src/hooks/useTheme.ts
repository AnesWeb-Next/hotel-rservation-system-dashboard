import {
  useThemeContext,
  type Theme,
  type ResolvedTheme,
} from "@/contexts/ThemeContext";

interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  return useThemeContext();
}

// Re-export types for convenience
export type { Theme, ResolvedTheme };
