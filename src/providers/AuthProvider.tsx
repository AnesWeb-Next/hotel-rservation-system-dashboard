import { AuthContext } from "@/contexts/AuthContext";
import React, { useCallback, useState } from "react";
import { login as apiLogin, logout as apiLogout } from "@/api/endpoints/auth";
import type { AuthUser, LoginCredentials } from "@/types/auth";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, getStoredAuth } from "./authStorage";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Initialize user from localStorage synchronously to avoid flash of unauthenticated state
  const [user, setUser] = useState<AuthUser | null>(() => getStoredAuth().user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiLogin(credentials);

      if (response.success && response.data) {
        const { user: authUser, token } = response.data;

        // Use localStorage if rememberMe is true, otherwise sessionStorage
        const storage = credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem(AUTH_TOKEN_KEY, token);
        storage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));

        setUser(authUser);
        setIsLoading(false);
        return true;
      }

      setError(response.message || "Invalid email or password");
      setIsLoading(false);
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiLogout();
    } catch {
      // Ignore logout errors
    } finally {
      // Clear from both storages
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.removeItem(AUTH_USER_KEY);
      setUser(null);
      setError(null);
    }
  }, []);

  const clearAuthError = useCallback((): void => {
    setError(null);
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    login,
    logout,
    clearAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
