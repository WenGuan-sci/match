import type { Metadata } from "next";
import Link from "next/link";
import { Tex } from "@/components/Tex";
import { examples } from "@/content/functions";

export const metadata: Metadata = { title: "Functions · Worked examples" };

export default function FunctionsExamples() {
  return (
    <div className="space-y-8">
      <p className="text-mute">
        Try each part yourself first, then open the solution to check your working.
      </p>

      {examples.map((ex, i) => (
        <article key={ex.id} className="card p-5 sm:p-6">
          <p className="label-mono">Example {i + 1}</p>
          <h2 className="mt-1 text-xl font-bold">{ex.title}</h2>
          <p className="mt-3 leading-7">
            <Tex>{ex.question}</Tex>
          </p>

          <div className="mt-4 space-y-4">
            {ex.parts.map((part, j) => (
              <div key={j}>
                {part.ask && (
                  <p className="flex gap-2 leading-7">
                    <span className="font-mono text-accent">({part.label})</span>
                    <span>
                      <Tex>{part.ask}</Tex>
                    </span>
                  </p>
                )}
                <details className="group mt-2 rounded-lg border border-line bg-panel-2/60">
                  <summary className="cursor-pointer select-none px-4 py-2.5 text-sm font-medium text-accent marker:text-accent">
                    <span className="group-open:hidden">Show solution</span>
                    <span className="hidden group-open:inline">Hide solution</span>
                  </summary>
                  <ol className="space-y-3 border-t border-line px-4 py-4">
                    {part.steps.map((step, k) => (
                      <li key={k} className="flex gap-3 leading-7">
                        <span className="mt-1 font-mono text-xs text-mute">
                          {String(k + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <Tex>{step}</Tex>
                        </span>
                      </li>
                    ))}
                  </ol>
                </details>
              </div>
            ))}
          </div>
        </article>
      ))}

      <div className="flex justify-end">
        <Link href="/topics/functions/quiz" className="btn btn-primary">
          Next: take the quiz →
        </Link>
      </div>
    </div>
  );
}
