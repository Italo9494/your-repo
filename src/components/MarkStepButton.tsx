"use client";

import { CheckCircle2, Circle } from "lucide-react";

import { useGameProgress } from "@/lib/progress";

interface MarkStepButtonProps {
  gameSlug: string;
  chapterSlug: string;
}

export function MarkStepButton({ gameSlug, chapterSlug }: MarkStepButtonProps) {
  const { completed, toggleChapter } = useGameProgress(gameSlug);
  const done = completed.includes(chapterSlug);

  return (
    <button
      type="button"
      onClick={() => toggleChapter(chapterSlug)}
      aria-pressed={done}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
        done
          ? "bg-brand-green-dark text-white hover:bg-[#196434]"
          : "border border-line bg-surface text-ink hover:border-brand-green-dark hover:text-brand-green-dark"
      }`}
    >
      {done ? (
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Circle className="h-5 w-5" aria-hidden="true" />
      )}
      {done ? "Etapa concluída" : "Marcar etapa como concluída"}
    </button>
  );
}
