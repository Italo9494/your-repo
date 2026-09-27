"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Check, ChevronDown, Circle, PlayCircle } from "lucide-react";

import { ProgressBar } from "@/components/ProgressBar";
import { progressPercent, useGameProgress } from "@/lib/progress";

interface SidebarChapter {
  slug: string;
  title: string;
  order: number;
}

interface WalkthroughSidebarProps {
  gameSlug: string;
  gameName: string;
  chapters: SidebarChapter[];
  baseUrl: string;
}

export function WalkthroughSidebar({
  gameSlug,
  gameName,
  chapters,
  baseUrl,
}: WalkthroughSidebarProps) {
  const pathname = usePathname();
  const { completed } = useGameProgress(gameSlug);
  const [open, setOpen] = useState(false);

  const currentSlug = pathname.startsWith(baseUrl)
    ? pathname.slice(baseUrl.length).replace(/^\/+/, "").replace(/\/+$/, "")
    : "";

  const doneCount = chapters.filter((chapter) => completed.includes(chapter.slug)).length;
  const percent = progressPercent(doneCount, chapters.length);
  const currentIndex = chapters.findIndex((chapter) => chapter.slug === currentSlug);

  const list = (
    <ol className="space-y-1">
      {chapters.map((chapter) => {
        const done = completed.includes(chapter.slug);
        const active = chapter.slug === currentSlug;
        return (
          <li key={chapter.slug}>
            <Link
              href={`${baseUrl}/${chapter.slug}`}
              onClick={() => setOpen(false)}
              aria-current={active ? "step" : undefined}
              className={`flex items-start gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-brand-blue text-white shadow-soft"
                  : done
                    ? "text-ink hover:bg-canvas"
                    : "text-muted hover:bg-canvas hover:text-ink"
              }`}
            >
              <span className="mt-0.5 shrink-0">
                {done ? (
                  <Check className={`h-4 w-4 ${active ? "text-white" : "text-brand-green-dark"}`} />
                ) : active ? (
                  <PlayCircle className="h-4 w-4 text-white" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </span>
              <span className="flex-1">
                <span className={`mr-1.5 tabular-nums ${active ? "text-white/95" : "text-muted"}`}>
                  {String(chapter.order).padStart(2, "0")}
                </span>
                {chapter.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className="mb-6 lg:mb-0">
      <aside
        aria-label={`Índice do detonado de ${gameName}`}
        className="overflow-hidden rounded-3xl border border-line bg-surface shadow-soft lg:sticky lg:top-24"
      >
        <div className="border-b border-line p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">Detonado</p>
          <h2 className="mt-1 text-base font-bold leading-snug text-ink">{gameName}</h2>
          <ProgressBar value={percent} label="Progresso" className="mt-3" />
          <p className="mt-2 text-xs text-muted">
            {doneCount} de {chapters.length} etapas concluídas
          </p>
        </div>

        <div className="hidden p-3 lg:block">{list}</div>

        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="indice-mobile"
            className="flex w-full items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-ink"
          >
            <span>
              {currentIndex >= 0
                ? `Etapa ${currentIndex + 1} de ${chapters.length}`
                : "Ver índice das etapas"}
            </span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          {open && (
            <div id="indice-mobile" className="max-h-[60vh] overflow-y-auto p-3 pt-0 scrollbar-slim">
              {list}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
