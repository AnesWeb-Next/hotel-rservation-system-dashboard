"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, Hotel } from "lucide-react";
import { apiBaseUrl, storeAuth } from "../_lib/auth";

type LoginResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  data?: { role?: string };
  token?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!apiBaseUrl) {
      setMessage("Set NEXT_PUBLIC_API_URL in .env.local to connect to your backend.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as LoginResponse;

      if (!response.ok || !result.success || !result.token || !result.data) {
        throw new Error(result.error ?? result.message ?? "Unable to log in.");
      }

      if (result.data.role !== "admin") {
        throw new Error("This account does not have administrator access.");
      }

      storeAuth(result.token, result.data, rememberMe);
      const next = new URLSearchParams(window.location.search).get("next");
      const destination =
        next?.startsWith("/") && !next.startsWith("//") && next !== "/login"
          ? next
          : "/";
      router.replace(destination);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not log in. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-5 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <div className="rounded-2xl bg-slate-950 p-3 text-white">
            <Hotel aria-hidden="true" className="size-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-sky-700">Hotel reservation system</p>
            <h1 className="text-2xl font-semibold tracking-tight">Admin sign in</h1>
          </div>
        </div>

        <p className="mb-6 text-sm text-slate-600">
          Sign in with the administrator account you already use on the backend.
        </p>

        {message && (
          <div role="alert" className="mb-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
            <CircleAlert aria-hidden="true" className="size-5 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="size-4 rounded border-slate-300 accent-slate-900"
            />
            Remember me on this device
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
