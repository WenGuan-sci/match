"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function safeNext(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(
    params.get("error") ? "That sign-in link did not work. Please try again." : null,
  );
  const [notice, setNotice] = useState<string | null>(null);

  const isLogin = mode === "login";
  const other = isLogin ? "/signup" : "/login";
  const otherHref = next === "/dashboard" ? other : `${other}?next=${encodeURIComponent(next)}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    setNotice(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }
      router.push(next);
      router.refresh();
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setError(error.message);
    } else if (data.session) {
      router.push(next);
      router.refresh();
      return;
    } else {
      setNotice("Check your email for a confirmation link to finish signing up.");
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <p className="label-mono">{isLogin ? "Welcome back" : "Free account"}</p>
      <h1 className="mt-2 text-3xl font-bold">{isLogin ? "Log in" : "Create your account"}</h1>
      <p className="mt-2 text-sm text-mute">
        {isLogin ? "Pick up where you left off." : "Save your quiz scores and track your progress."}
      </p>

      {!isSupabaseConfigured && (
        <p className="mt-6 rounded-lg border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-200">
          Login is not connected yet. Add the Supabase keys to <code>.env.local</code> (see the
          README) to enable accounts.
        </p>
      )}

      <form onSubmit={onSubmit} className="card mt-6 space-y-4 p-5">
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 outline-none focus:border-accent"
          />
          {!isLogin && <p className="mt-1 text-xs text-mute">At least 8 characters.</p>}
        </div>

        {error && (
          <p className="text-sm text-bad" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="text-sm text-good" role="status">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !isSupabaseConfigured}
          className="btn btn-primary w-full"
        >
          {busy ? "Please wait…" : isLogin ? "Log in" : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-mute">
        {isLogin ? "New here?" : "Already have an account?"}{" "}
        <Link href={otherHref} className="text-accent hover:underline">
          {isLogin ? "Create an account" : "Log in"}
        </Link>
      </p>
    </div>
  );
}
