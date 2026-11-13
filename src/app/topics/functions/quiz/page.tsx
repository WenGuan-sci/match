import type { Metadata } from "next";
import { Quiz } from "@/components/Quiz";
import { quiz } from "@/content/functions";

export const metadata: Metadata = { title: "Functions · Quiz" };

export default function FunctionsQuiz() {
  return <Quiz topic="functions" questions={quiz} />;
}
