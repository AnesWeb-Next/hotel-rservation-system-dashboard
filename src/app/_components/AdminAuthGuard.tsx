"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiBaseUrl, clearAuth, getAuthHeaders, getAuthToken } from "../_lib/auth";

type AuthCheckResponse = {
  data?: { role?: string };
  message?: string;
};

type GuardState = "checking" | "authorized" | "error" | "denied";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<GuardState>("checking");
  const [message, setMessage] = useState("");
  const [checkAttempt, setCheckAttempt] = useState(0);
  const configurationMissing =
    pathname !== "/login" && Boolean(getAuthToken()) && !apiBaseUrl;

  useEffect(() => {
    if (pathname === "/login") return;

    let active = true;
    const token = getAuthToken();

    if (!token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return () => {
        active = false;
      };
    }

    if (!apiBaseUrl) {
      return () => {
        active = false;
      };
    }

    async function verifyAdmin() {
      try {
        const response = await fetch(`${apiBaseUrl}/auth/check`, {
          credentials: "include",
          headers: getAuthHeaders(),
        });
        const result = (await response.json()) as AuthCheckResponse;

        if (!active) return;

        if (response.status === 401) {
          clearAuth();
          router.replace(`/login?next=${encodeURIComponent(pathname)}`);
          return;
        }

        if (!response.ok) {
          setMessage(result.message ?? "Could not verify your account.");
          setState("error");
          return;
        }

        if (result.data?.role !== "admin") {
          clearAuth();
          setMessage("This account does not have administrator access.");
          setState("denied");
          return;
        }

        setState("authorized");
      } catch {
        if (!active) return;
        setMessage("Could not reach the backend. Check the API URL and try again.");
        setState("error");
      }
    }

    void verifyAdmin();

    return () => {
      active = false;
    };
  }, [checkAttempt, pathname, router]);

  if (pathname === "/login" || state === "authorized") return children;

  if (state === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-600">
        <p role="status">Verifying administrator access…</p>
      </main>
    );
  }

  if (configurationMissing || state === "error" || state === "denied") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            {state === "denied" ? "Administrator access required" : "Cannot verify access"}
          </h1>
          <p role="alert" className="mt-3 text-sm text-slate-600">
            {configurationMissing
              ? "Set NEXT_PUBLIC_API_URL in .env.local to connect to your backend."
              : message}
          </p>
          <button
            type="button"
            onClick={() => {
              setState("checking");
              setCheckAttempt((attempt) => attempt + 1);
            }}
            className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={() => router.replace("/login")}
            className="ml-3 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
          >
            Go to login
          </button>
        </section>
      </main>
    );
  }

  return null;
}
