"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopicTabs({ base }: { base: string }) {
  const pathname = usePathname();
  const tabs = [
    { href: base, label: "Notes" },
    { href: `${base}/examples`, label: "Worked examples" },
    { href: `${base}/quiz`, label: "Quiz" },
  ];
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-line" aria-label="Topic sections">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "border-accent text-accent"
                : "border-transparent text-mute hover:text-ink"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
