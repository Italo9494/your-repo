"use client";

import { ProgressBar } from "@/components/ProgressBar";
import { progressPercent, useGameProgress } from "@/lib/progress";

interface ChapterProgressProps {
  gameSlug: string;
  total: number;
}

export function ChapterProgress({ gameSlug, total }: ChapterProgressProps) {
  const { completed } = useGameProgress(gameSlug);
  const percent = progressPercent(completed.length, total);

  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <ProgressBar value={percent} label={`Progresso: ${percent}%`} tone="green" />
      <p className="mt-2 text-xs text-muted">
        {total > 0
          ? `Você concluiu ${completed.length} de ${total} etapas.`
          : "Este detonado ainda está em produção."}
      </p>
    </div>
  );
}
