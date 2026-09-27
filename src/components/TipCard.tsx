import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";

import { FavoriteButton } from "@/components/FavoriteButton";
import type { TipArticle } from "@/data/types";
import { pillTone } from "@/lib/color";
import { formatDate } from "@/lib/seo";

export function TipCard({ tip }: { tip: TipArticle }) {
  const tone = pillTone(tip.colors);

  return (
    <article className="group card-hover flex flex-col gap-3 rounded-3xl border border-line bg-surface p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`relative isolate inline-flex overflow-hidden rounded-full px-2.5 py-1 text-xs font-bold ${tone.className}`}
          style={{ backgroundImage: `linear-gradient(135deg, ${tip.colors[0]}, ${tip.colors[1]})` }}
        >
          {tone.scrim > 0 && (
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundColor: `rgba(0, 0, 0, ${tone.scrim.toFixed(2)})` }}
            />
          )}
          <span className="relative">{tip.category}</span>
        </span>
        <FavoriteButton kind="guides" value={`dica:${tip.slug}`} label={`Favoritar ${tip.title}`} />
      </div>

      <h3 className="text-lg font-bold leading-snug text-ink">
        <Link href={`/dicas/${tip.slug}`} className="transition-colors hover:text-brand-blue">
          {tip.title}
        </Link>
      </h3>

      <p className="text-sm leading-relaxed text-muted">{tip.summary}</p>

      <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {tip.readTime} min
        </span>
        <span>{formatDate(tip.date)}</span>
      </div>

      <Link
        href={`/dicas/${tip.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:text-brand-blue-dark"
      >
        Ler dica
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
