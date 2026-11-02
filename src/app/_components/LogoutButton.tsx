"use client";

import { useRouter } from "next/navigation";
import { clearAuth } from "../_lib/auth";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        clearAuth();
        router.replace("/login");
      }}
      className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
    >
      Log out
    </button>
  );
}
