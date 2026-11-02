export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_USER_KEY = "auth_user";

export const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/$/,
  "",
);

export function getAuthToken() {
  if (typeof window === "undefined") return null;

  return (
    sessionStorage.getItem(AUTH_TOKEN_KEY) ||
    localStorage.getItem(AUTH_TOKEN_KEY)
  );
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function storeAuth(token: string, user: unknown, rememberMe: boolean) {
  clearAuth();

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(AUTH_TOKEN_KEY, token);
  storage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}
