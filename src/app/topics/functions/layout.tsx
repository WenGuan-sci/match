import type { Metadata } from "next";
import Link from "next/link";
import { TopicTabs } from "@/components/TopicTabs";

export const metadata: Metadata = { title: "Functions" };

export default function FunctionsLayout({ children }: LayoutProps<"/topics/functions">) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/#topics" className="font-mono text-xs text-mute hover:text-accent">
        ← all topics
      </Link>
      <p className="label-mono mt-6">Functions and Graphs</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Functions</h1>
      <p className="mt-2 text-mute">
        Domain and range, one-one functions, inverse functions and composite functions.
      </p>
      <div className="mt-8">
        <TopicTabs base="/topics/functions" />
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
}
