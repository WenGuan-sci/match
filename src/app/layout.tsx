import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "H2 Math Lab", template: "%s · H2 Math Lab" },
  description:
    "Revision notes, worked examples and auto-marked quizzes for A-Level H2 Mathematics.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line py-6 text-center font-mono text-xs text-mute">
          H2 Math Lab · built for the 9758 syllabus
        </footer>
      </body>
    </html>
  );
}
