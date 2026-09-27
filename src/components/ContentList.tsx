import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";

import { formatViews, type RankKind, type RankedItem } from "@/lib/rankings";

const toneByKind: Record<RankKind, string> = {
  pokemon: "bg-brand-yellow/25 text-[#7a5c00]",
  detonado: "bg-brand-red/10 text-brand-red-dark",
  guia: "bg-brand-blue/10 text-brand-blue-dark",
  jogo: "bg-brand-green/10 text-[#1f6d38]",
  mapa: "bg-purple-100 text-purple-700",
  dica: "bg-orange-100 text-orange-700",
};

const kindLabels: Record<RankKind, string> = {
  detonado: "Detonado",
  guia: "Guia",
  dica: "Dica",
  jogo: "Jogo",
  pokemon: "Pokémon",
  mapa: "Mapa",
};

interface ContentListProps {
  items: RankedItem[];
  columns?: 2 | 3;
  showDescription?: boolean;
}

export function ContentList({ items, columns = 3, showDescription = true }: ContentListProps) {
  if (items.length === 0) return null;

  return (
    <ul
      className={`grid grid-cols-1 gap-4 ${
        columns === 3 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {items.map((item) => (
        <li key={`${item.kind}-${item.slug}`}>
          <Link
            href={item.href}
            className="group flex h-full flex-col gap-3 rounded-3xl border border-line bg-surface p-5 shadow-soft transition hover:border-brand-blue"
          >
            <span className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                  toneByKind[item.kind]
                }`}
              >
                {kindLabels[item.kind]}
              </span>
              {item.meta && (
                <span className="text-xs font-semibold text-muted">{item.meta}</span>
              )}
            </span>

            <span className="flex items-start justify-between gap-3">
              <span className="min-w-0 font-bold leading-snug text-ink transition group-hover:text-brand-blue">
                {item.title}
              </span>
              <ArrowUpRight
                className="mt-0.5 h-5 w-5 shrink-0 text-muted transition group-hover:text-brand-blue"
                aria-hidden="true"
              />
            </span>

            {showDescription && (
              <span className="line-clamp-2 text-sm leading-relaxed text-muted">
                {item.description}
              </span>
            )}

            <span className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                {formatViews(item.views)}
              </span>
              {item.date && <span>Atualizado em {item.date.split("-").reverse().join("/")}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
