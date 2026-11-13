"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useUser } from "@/lib/useUser";

type Attempt = { id: number; topic: string; score: number; total: number; created_at: string };

const topicNames: Record<string, string> = { functions: "Functions" };

export function Dashboard() {
  const { user, loading } = useUser();
  const [attempts, setAttempts] = useState<Attempt[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !user) return;
    supabase
      .from("quiz_attempts")
      .select("id, topic, score, total, created_at")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (error) setError(true);
        else setAttempts(data);
      });
  }, [user]);

  if (!isSupabaseConfigured) {
    return (
      <Shell>
        <p className="card p-5 text-mute">
          Accounts are not connected yet. Add the Supabase keys to <code>.env.local</code> (see
          the README) to enable the dashboard.
        </p>
      </Shell>
    );
  }

  if (loading) {
    return (
      <Shell>
        <p className="text-mute">Loading…</p>
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell>
        <p className="card p-5 text-mute">
          Please{" "}
          <Link href="/login?next=/dashboard" className="text-accent underline">
            log in
          </Link>{" "}
          to see your progress.
        </p>
      </Shell>
    );
  }

  const best = attempts?.length ? Math.max(...attempts.map((a) => a.score / a.total)) : null;
  const average = attempts?.length
    ? attempts.reduce((sum, a) => sum + a.score / a.total, 0) / attempts.length
    : null;
  const pct = (v: number | null) => (v === null ? "—" : `${Math.round(v * 100)}%`);

  return (
    <Shell subtitle={user.email}>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Quizzes taken", attempts ? String(attempts.length) : "—"],
          ["Best score", pct(best)],
          ["Average score", pct(average)],
        ].map(([label, value]) => (
          <div key={label} className="card p-5">
            <p className="label-mono">{label}</p>
            <p className="mt-2 font-mono text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold">Recent attempts</h2>
      {error && (
        <p className="mt-4 text-sm text-bad" role="alert">
          Could not load your attempts. Check that the database tables have been created.
        </p>
      )}
      {attempts && attempts.length === 0 && (
        <div className="card mt-4 p-6 text-center">
          <p className="text-mute">No attempts yet.</p>
          <Link href="/topics/functions/quiz" className="btn btn-primary mt-4">
            Take the Functions quiz
          </Link>
        </div>
      )}
      {attempts && attempts.length > 0 && (
        <ul className="card mt-4 divide-y divide-line">
          {attempts.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <Link href={`/topics/${a.topic}/quiz`} className="font-medium hover:text-accent">
                  {topicNames[a.topic] ?? a.topic}
                </Link>
                <p className="font-mono text-xs text-mute">
                  {new Date(a.created_at).toLocaleString()}
                </p>
              </div>
              <p className="font-mono text-lg">
                <span className={a.score / a.total >= 0.5 ? "text-good" : "text-bad"}>
                  {a.score}
                </span>
                <span className="text-mute">/{a.total}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

function Shell({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="label-mono">Dashboard</p>
      <h1 className="mt-2 text-3xl font-bold">Your progress</h1>
      {subtitle && <p className="mt-1 font-mono text-sm text-mute">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}
