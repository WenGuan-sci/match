import Link from "next/link";
import { InverseGraph } from "@/components/InverseGraph";
import { Tex } from "@/components/Tex";
import { notes, type NoteBlock } from "@/content/functions";

function Block({ block }: { block: NoteBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="leading-7 text-ink/90">
          <Tex>{block.text}</Tex>
        </p>
      );
    case "def":
      return (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
          <p className="label-mono">{block.title}</p>
          <p className="mt-1.5 leading-7">
            <Tex>{block.text}</Tex>
          </p>
        </div>
      );
    case "tip":
      return (
        <div className="rounded-lg border border-accent-2/30 bg-accent-2/5 p-4">
          <p className="label-mono text-accent-2">{block.title}</p>
          <p className="mt-1.5 leading-7">
            <Tex>{block.text}</Tex>
          </p>
        </div>
      );
    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-7 text-ink/90">
              <span className="mt-0.5 font-mono text-accent" aria-hidden>
                ›
              </span>
              <span>
                <Tex>{item}</Tex>
              </span>
            </li>
          ))}
        </ul>
      );
    case "graph":
      return <InverseGraph />;
  }
}

export default function FunctionsNotes() {
  return (
    <div>
      <nav className="card p-4" aria-label="On this page">
        <p className="label-mono">On this page</p>
        <ol className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
          {notes.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-mute hover:text-accent">
                <span className="font-mono text-accent">{i + 1}.</span> {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {notes.map((section, i) => (
        <section key={section.id} id={section.id} className="scroll-mt-20 pt-10">
          <h2 className="text-2xl font-bold">
            <span className="mr-2 font-mono text-base text-accent">{i + 1}</span>
            {section.title}
          </h2>
          <div className="mt-4 space-y-4">
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </div>
        </section>
      ))}

      <div className="mt-12 flex justify-end">
        <Link href="/topics/functions/examples" className="btn btn-primary">
          Next: worked examples →
        </Link>
      </div>
    </div>
  );
}
