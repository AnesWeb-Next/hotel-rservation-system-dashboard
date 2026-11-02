"use client";

import {
  BedDouble,
  CalendarCheck2,
  ChartNoAxesCombined,
  CircleAlert,
  Clock3,
  Hotel,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LogoutButton } from "./LogoutButton";

type DashboardStats = {
  users?: {
    total?: number;
    admins?: number;
    guests?: number;
    newThisMonth?: number;
  };
  rooms?: { total?: number; available?: number; unavailable?: number };
  bookings?: {
    total?: number;
    pending?: number;
    confirmed?: number;
    checkedIn?: number;
    checkedOut?: number;
    cancelled?: number;
    noShow?: number;
    pastDueCheckout?: number;
    revenue?: number;
    revenueThisMonth?: number;
  };
  ratings?: { total?: number; average?: number };
};

type LoadState = "loading" | "ready" | "error";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

function formatNumber(value?: number) {
  return new Intl.NumberFormat().format(value ?? 0);
}

function formatRating(value?: number) {
  return (value ?? 0).toFixed(1);
}

export function HotelDashboard() {
  const [stats, setStats] = useState<DashboardStats>();
  const [state, setState] = useState<LoadState>("loading");
  const [message, setMessage] = useState("");

  const loadDashboard = useCallback(async () => {
    if (!apiBaseUrl) {
      setState("error");
      setMessage("Set NEXT_PUBLIC_API_URL in .env.local to connect the dashboard to your backend.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const token = sessionStorage.getItem("auth_token") ?? localStorage.getItem("auth_token");
      const response = await fetch(`${apiBaseUrl}/admin/dashboard`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const result = (await response.json()) as DashboardStats & {
        data?: DashboardStats;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message ?? "Could not load the dashboard statistics.");
      }

      setStats(result.data ?? result);
      setState("ready");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not load the dashboard statistics.");
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [loadDashboard]);

  const bookings = stats?.bookings;
  const statCards = [
    { label: "Total bookings", value: formatNumber(bookings?.total), detail: `${formatNumber(bookings?.pending)} pending`, icon: CalendarCheck2, color: "bg-blue-600" },
    { label: "Current stays", value: formatNumber(bookings?.checkedIn), detail: `${formatNumber(bookings?.pastDueCheckout)} past due checkout`, icon: Clock3, color: "bg-emerald-600" },
    { label: "Available rooms", value: formatNumber(stats?.rooms?.available), detail: `${formatNumber(stats?.rooms?.unavailable)} unavailable`, icon: BedDouble, color: "bg-violet-600" },
    { label: "Registered guests", value: formatNumber(stats?.users?.guests), detail: `${formatNumber(stats?.users?.newThisMonth)} new this month`, icon: Users, color: "bg-amber-500" },
    { label: "Average rating", value: `${formatRating(stats?.ratings?.average)} / 5`, detail: `${formatNumber(stats?.ratings?.total)} guest ratings`, icon: Star, color: "bg-yellow-500" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/10 p-3"><Hotel aria-hidden="true" className="size-7" /></div>
            <div>
              <p className="text-sm font-medium text-sky-300">Hotel reservation system</p>
              <h1 className="text-2xl font-semibold tracking-tight">Operations dashboard</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/bookings" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Manage bookings</Link>
            <Link href="/rooms" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Manage rooms</Link>
            <Link href="/hotels" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Manage hotels</Link>
            <Link href="/ratings" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">View ratings</Link>
            <LogoutButton />
            <button
              type="button"
              onClick={() => void loadDashboard()}
              disabled={state === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-wait disabled:opacity-70"
            >
              <RefreshCw className={`size-4 ${state === "loading" ? "animate-spin" : ""}`} />
              Refresh data
            </button>
          </div>
        </header>

        {state === "error" && (
          <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Hotel statistics">
          {statCards.map(({ label, value, detail, icon: Icon, color }) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <div className={`rounded-xl p-2.5 text-white ${color}`}><Icon aria-hidden="true" className="size-5" /></div>
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight">{state === "loading" ? "—" : value}</p>
              <p className="mt-2 text-sm text-slate-500">{detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-7 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-sky-100 p-2.5 text-sky-700"><ChartNoAxesCombined aria-hidden="true" className="size-5" /></div>
              <div><h2 className="font-semibold">Booking status</h2><p className="text-sm text-slate-500">A live overview from your backend.</p></div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Pending", bookings?.pending, "bg-amber-100 text-amber-800"],
                ["Confirmed", bookings?.confirmed, "bg-sky-100 text-sky-800"],
                ["Checked in", bookings?.checkedIn, "bg-emerald-100 text-emerald-800"],
                ["Past due checkout", bookings?.pastDueCheckout, "bg-rose-100 text-rose-800"],
              ].map(([label, value, style]) => (
                <div key={String(label)} className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
                  <span className={`mt-3 inline-block rounded-lg px-2.5 py-1 text-lg font-semibold ${style}`}>{state === "loading" ? "—" : String(value ?? 0)}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold">Property management</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Manage hotel listings and review guest feedback from one place.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/hotels" className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Manage hotels</Link>
              <Link href="/ratings" className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Review ratings</Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
