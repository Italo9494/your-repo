"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Circle, PlayCircle } from "lucide-react";

import { useGameProgress } from "@/lib/progress";

interface ChapterIndexListProps {
  gameSlug: string;
  chapters: { slug: string; title: string; order: number }[];
  baseUrl: string;
}

export function ChapterIndexList({ gameSlug, chapters, baseUrl }: ChapterIndexListProps) {
  const { completed } = useGameProgress(gameSlug);
  const pathname = usePathname();
  const currentSlug = pathname.startsWith(baseUrl)
    ? pathname.slice(baseUrl.length).replace(/^\/+/, "").replace(/\/+$/, "")
    : "";

  return (
    <ol className="grid gap-2">
      {chapters.map((chapter) => {
        const done = completed.includes(chapter.slug);
        const active = chapter.slug === currentSlug;
        return (
          <li key={chapter.slug}>
            <Link
              href={`${baseUrl}/${chapter.slug}`}
              className={`group flex items-center gap-4 rounded-2xl border px-4 py-3 transition ${
                active
                  ? "border-brand-blue bg-brand-blue/5"
                  : "border-line bg-surface hover:border-brand-blue/50"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  done
                    ? "bg-brand-green-dark text-white"
                    : "bg-canvas text-muted group-hover:bg-brand-blue/10 group-hover:text-brand-blue-dark"
                }`}
              >
                {String(chapter.order).padStart(2, "0")}
              </span>

              <span className="flex-1 text-sm font-semibold text-ink">{chapter.title}</span>

              <span className="inline-flex items-center gap-2 text-xs font-medium">
                {done ? (
                  <span className="inline-flex items-center gap-1 text-brand-green-dark">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Concluída
                  </span>
                ) : active ? (
                  <span className="inline-flex items-center gap-1 text-brand-blue">
                    <PlayCircle className="h-4 w-4" aria-hidden="true" />
                    Atual
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-muted">
                    <Circle className="h-4 w-4" aria-hidden="true" />
                    Pendente
                  </span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
