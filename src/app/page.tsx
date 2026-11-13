import Link from "next/link";
import { Tex } from "@/components/Tex";
import { strands } from "@/content/topics";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="py-16 sm:py-24">
        <p className="label-mono">A-Level · H2 Mathematics · 9758</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Revise H2 Math,{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            one topic at a time.
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-mute">
          Concise notes, step-by-step worked examples and auto-marked quizzes. Log in to keep
          track of your scores.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/topics/functions" className="btn btn-primary">
            Start with Functions →
          </Link>
          <Link href="/signup" className="btn btn-ghost">
            Create free account
          </Link>
        </div>

        <div className="card mt-12 max-w-xl p-5 font-mono text-sm">
          <div className="mb-3 flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-bad/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-good/70" />
          </div>
          <p className="text-mute">{"// composite functions"}</p>
          <p className="mt-2 font-sans text-base">
            <Tex>{String.raw`$gf$ exists $\iff R_f \subseteq D_g$`}</Tex>
          </p>
        </div>
      </section>

      <section className="grid gap-4 pb-16 sm:grid-cols-3">
        {[
          ["01", "Notes", "Key definitions, results and exam tips, without the padding."],
          ["02", "Worked examples", "Exam-style questions with solutions revealed step by step."],
          ["03", "Quizzes", "Instant marking with an explanation for every answer."],
        ].map(([n, title, text]) => (
          <div key={n} className="card p-5">
            <p className="label-mono">{n}</p>
            <h2 className="mt-2 font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-mute">{text}</p>
          </div>
        ))}
      </section>

      <section id="topics" className="scroll-mt-20 pb-24">
        <h2 className="text-2xl font-bold">Topics</h2>
        <p className="mt-1 text-sm text-mute">More topics are being written.</p>
        <div className="mt-8 space-y-8">
          {strands.map((strand) => (
            <div key={strand.name}>
              <h3 className="label-mono">{strand.name}</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {strand.topics.map((t) =>
                  t.ready ? (
                    <li key={t.slug}>
                      <Link
                        href={`/topics/${t.slug}`}
                        className="card group block h-full p-4 transition hover:border-accent hover:shadow-[0_0_24px_rgb(34_211_238/0.15)]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold group-hover:text-accent">{t.title}</span>
                          <span className="rounded-full bg-good/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-good">
                            Ready
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-mute">{t.blurb}</p>
                      </Link>
                    </li>
                  ) : (
                    <li key={t.slug} className="card h-full p-4 opacity-55">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold">{t.title}</span>
                        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mute">
                          Soon
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-mute">{t.blurb}</p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
