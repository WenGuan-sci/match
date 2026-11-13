"use client";

import Link from "next/link";
import { useState } from "react";
import { Tex } from "@/components/Tex";
import type { Question } from "@/content/functions";
import { getSupabase } from "@/lib/supabase/client";
import { useUser } from "@/lib/useUser";

type SaveState = "idle" | "saving" | "saved" | "local" | "error";

export function Quiz({ topic, questions }: { topic: string; questions: Question[] }) {
  const { user } = useUser();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [save, setSave] = useState<SaveState>("idle");

  const total = questions.length;
  const done = answers.length === total;
  const score = answers.filter((a, i) => a === questions[i].answer).length;

  async function finish(finalAnswers: number[]) {
    const finalScore = finalAnswers.filter((a, i) => a === questions[i].answer).length;
    try {
      const key = `h2math:best:${topic}`;
      const best = Number(localStorage.getItem(key) ?? 0);
      if (finalScore > best) localStorage.setItem(key, String(finalScore));
    } catch {
      // Storage unavailable (e.g. private mode) — ignore.
    }

    const supabase = getSupabase();
    if (!supabase || !user) {
      setSave("local");
      return;
    }
    setSave("saving");
    const { error } = await supabase
      .from("quiz_attempts")
      .insert({ topic, score: finalScore, total });
    setSave(error ? "error" : "saved");
  }

  function next() {
    if (picked === null) return;
    const updated = [...answers, picked];
    setAnswers(updated);
    setPicked(null);
    setChecked(false);
    if (updated.length === total) void finish(updated);
    else setIndex(index + 1);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setChecked(false);
    setAnswers([]);
    setSave("idle");
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <div>
        <div className="card p-6 text-center">
          <p className="label-mono">Result</p>
          <p className="mt-3 font-mono text-6xl font-bold text-accent">
            {score}
            <span className="text-2xl text-mute">/{total}</span>
          </p>
          <p className="mt-2 text-mute">
            {pct >= 80
              ? "Strong work — you have this topic under control."
              : pct >= 50
                ? "Decent. Review the ones you missed below."
                : "Go back over the notes and examples, then try again."}
          </p>
          <p className="mt-3 text-sm" role="status">
            {save === "saving" && <span className="text-mute">Saving your score…</span>}
            {save === "saved" && <span className="text-good">Score saved to your account.</span>}
            {save === "error" && (
              <span className="text-bad">Could not save your score. Please try again later.</span>
            )}
            {save === "local" && (
              <span className="text-mute">
                <Link href={`/login?next=/topics/${topic}/quiz`} className="text-accent underline">
                  Log in
                </Link>{" "}
                to save your scores and track progress.
              </span>
            )}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button onClick={restart} className="btn btn-primary">
              Try again
            </button>
            <Link href={`/topics/${topic}`} className="btn btn-ghost">
              Back to notes
            </Link>
          </div>
        </div>

        <h2 className="mt-10 text-xl font-bold">Review</h2>
        <ol className="mt-4 space-y-4">
          {questions.map((q, i) => {
            const correct = answers[i] === q.answer;
            return (
              <li key={i} className="card p-4">
                <p className={`label-mono ${correct ? "text-good" : "text-bad"}`}>
                  Q{i + 1} · {correct ? "Correct" : "Incorrect"}
                </p>
                <p className="mt-2 leading-7">
                  <Tex>{q.prompt}</Tex>
                </p>
                {!correct && (
                  <p className="mt-2 text-sm text-mute">
                    Your answer: <Tex>{q.options[answers[i]]}</Tex>
                  </p>
                )}
                <p className="mt-1 text-sm text-mute">
                  Correct answer: <Tex>{q.options[q.answer]}</Tex>
                </p>
                <p className="mt-3 border-t border-line pt-3 text-sm leading-7">
                  <Tex>{q.explanation}</Tex>
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div>
      <div className="flex items-center justify-between font-mono text-xs text-mute">
        <span>
          Question {index + 1} of {total}
        </span>
        <span>Score: {score}</span>
      </div>
      <div
        className="mt-2 h-1 overflow-hidden rounded bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index}
        aria-label="Quiz progress"
      >
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>

      <div className="card mt-6 p-5 sm:p-6">
        <p className="text-lg leading-8">
          <Tex>{q.prompt}</Tex>
        </p>

        <div className="mt-5 grid gap-3" role="radiogroup" aria-label="Answer options">
          {q.options.map((option, i) => {
            const isPicked = picked === i;
            const isAnswer = q.answer === i;
            let style = "border-line hover:border-accent/60";
            if (checked && isAnswer) style = "border-good bg-good/10";
            else if (checked && isPicked) style = "border-dashed border-bad text-mute";
            else if (!checked && isPicked) style = "border-accent bg-accent/10";
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={isPicked}
                disabled={checked}
                onClick={() => setPicked(i)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition disabled:cursor-default ${style}`}
              >
                <span className="font-mono text-xs text-mute">{"ABCD"[i]}</span>
                <span className="min-w-0 flex-1">
                  <Tex>{option}</Tex>
                </span>
                {checked && isAnswer && <span className="text-good">✓</span>}
                {checked && isPicked && !isAnswer && <span className="text-bad">✕</span>}
              </button>
            );
          })}
        </div>

        {checked && (
          <div className="mt-5 rounded-lg border border-line bg-panel-2/60 p-4" role="status">
            <p className={`label-mono ${picked === q.answer ? "text-good" : "text-bad"}`}>
              {picked === q.answer ? "Correct" : "Not quite"}
            </p>
            <p className="mt-1.5 leading-7">
              <Tex>{q.explanation}</Tex>
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {checked ? (
            <button onClick={next} className="btn btn-primary">
              {index + 1 === total ? "See results" : "Next question →"}
            </button>
          ) : (
            <button
              onClick={() => setChecked(true)}
              disabled={picked === null}
              className="btn btn-primary"
            >
              Check answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
