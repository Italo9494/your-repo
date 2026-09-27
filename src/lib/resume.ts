"use client";

import { useMemo } from "react";

import { getWalkthrough } from "@/data/walkthroughs";
import { useHistory, type ContentKind } from "@/lib/history";
import { useProgress, type ProgressState } from "@/lib/progress";

export interface ResumeTarget {
  href: string;
  label: string;
  detail: string;
}

const CONTENT_KINDS: ContentKind[] = ["etapa", "detonado", "guia", "dica", "pokemon", "mapa", "categoria"];

function resumeFromHistory(href: string, title: string): ResumeTarget {
  const [, , gameSlug, chapterSlug] = href.split("/");
  if (gameSlug && chapterSlug) {
    const walkthrough = getWalkthrough(gameSlug);
    const chapter = walkthrough?.chapters.find((item) => item.slug === chapterSlug);
    if (walkthrough && chapter) {
      return {
        href,
        label: `Continuar ${walkthrough.title}`,
        detail: `${chapter.order}ª etapa · ${chapter.title}`,
      };
    }
  }
  return { href, label: "Continuar de onde parou", detail: title };
}

function resumeFromProgress(progress: ProgressState): ResumeTarget | null {
  for (const [gameSlug, completed] of Object.entries(progress)) {
    if (completed.length === 0) continue;
    const walkthrough = getWalkthrough(gameSlug);
    if (!walkthrough || walkthrough.chapters.length === 0) continue;
    const next = walkthrough.chapters.find((chapter) => !completed.includes(chapter.slug));
    if (!next) continue;
    return {
      href: `/detonado/${walkthrough.slug}/${next.slug}`,
      label: `Continuar ${walkthrough.title}`,
      detail: `${next.order}ª etapa · ${next.title}`,
    };
  }
  return null;
}

export function useResumeTarget(): ResumeTarget | null {
  const history = useHistory();
  const progress = useProgress();

  return useMemo(() => {
    const recent = history.entries.find((entry) => CONTENT_KINDS.includes(entry.kind));
    if (recent) return resumeFromHistory(recent.href, recent.title);
    return resumeFromProgress(progress);
  }, [history.entries, progress]);
}
