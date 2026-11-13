"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { useUser } from "@/lib/useUser";

export function AuthNav() {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) return <span className="h-8 w-20" aria-hidden />;

  if (!user) {
    return (
      <Link href="/login" className="btn btn-ghost px-3 py-1.5">
        Log in
      </Link>
    );
  }

  async function signOut() {
    await getSupabase()?.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <Link href="/dashboard" className="rounded px-2 py-1 text-mute hover:text-ink">
        Dashboard
      </Link>
      <button onClick={signOut} className="btn btn-ghost px-3 py-1.5">
        Log out
      </button>
    </>
  );
}
