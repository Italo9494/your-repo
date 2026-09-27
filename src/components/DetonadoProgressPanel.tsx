"use client";

import Link from "next/link";
import { Play, RotateCcw } from "lucide-react";

import { ChapterProgress } from "@/components/ChapterProgress";
import { useGameProgress } from "@/lib/progress";

interface DetonadoProgressPanelProps {
  gameSlug: string;
  chapters: { slug: string; title: string }[];
  baseUrl: string;
}

export function DetonadoProgressPanel({
  gameSlug,
  chapters,
  baseUrl,
}: DetonadoProgressPanelProps) {
  const { completed, reset } = useGameProgress(gameSlug);
  const nextChapter =
    chapters.find((chapter) => !completed.includes(chapter.slug)) ?? chapters[0];
  const hasProgress = completed.length > 0;

  return (
    <div className="space-y-4">
      <ChapterProgress gameSlug={gameSlug} total={chapters.length} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={`${baseUrl}/${nextChapter.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-red-dark"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          {hasProgress ? "Continuar detonado" : "Começar detonado"}
        </Link>

        {hasProgress && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-muted transition hover:border-brand-red hover:text-brand-red"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reiniciar progresso
          </button>
        )}
      </div>
    </div>
  );
}
