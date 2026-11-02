// Auth types

export type AuthRole = "admin" | "user";

// Matches the backend user shape (password excluded by server)
export interface AuthUser {
  _id: string;
  fullName: string;
  displayName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: AuthRole;
  isActive: boolean;
  bookingLimit: number;
  rooms: {
    bookings: string[];
    favorites: string[];
  };
  createdAt: string;
  updatedAt: string;
}

// Response returned by POST /auth/login
export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}
