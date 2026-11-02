import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ThemeContext,
  type Theme,
  type ResolvedTheme,
} from "@/contexts/ThemeContext";

const STORAGE_KEY = "library-admin-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyThemeToDOM(resolvedTheme: ResolvedTheme): void {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(getStoredTheme())
  );

  // Apply theme on mount and when it changes
  useEffect(() => {
    applyThemeToDOM(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (): void => {
      if (theme === "system") {
        const newResolved = getSystemTheme();
        setResolvedTheme(newResolved);
        applyThemeToDOM(newResolved);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme): void => {
    setThemeState(newTheme);
    const newResolved = resolveTheme(newTheme);
    setResolvedTheme(newResolved);
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyThemeToDOM(newResolved);
  }, []);

  const toggleTheme = useCallback((): void => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    setResolvedTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyThemeToDOM(newTheme);
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
