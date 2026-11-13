import Link from "next/link";
import { AuthNav } from "./AuthNav";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold">
          <span className="rounded bg-accent px-1.5 py-0.5 text-[#04222a]">H2</span>
          <span>
            math<span className="text-accent">.lab</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-3">
          <Link href="/#topics" className="rounded px-2 py-1 text-mute hover:text-ink">
            Topics
          </Link>
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}
