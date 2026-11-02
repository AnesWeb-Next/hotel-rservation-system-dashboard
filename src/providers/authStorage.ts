import type { AuthUser } from "@/types/auth";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export { AUTH_TOKEN_KEY, AUTH_USER_KEY };

export function getStoredAuth(): {
  user: AuthUser | null;
  token: string | null;
} {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  let storedToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  let storedUser = sessionStorage.getItem(AUTH_USER_KEY);
  let storage: Storage = sessionStorage;

  if (!storedToken || !storedUser) {
    storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    storedUser = localStorage.getItem(AUTH_USER_KEY);
    storage = localStorage;
  }

  if (storedToken && storedUser) {
    try {
      const user = JSON.parse(storedUser) as AuthUser;
      return { user, token: storedToken };
    } catch {
      storage.removeItem(AUTH_TOKEN_KEY);
      storage.removeItem(AUTH_USER_KEY);
    }
  }

  return { user: null, token: null };
}
