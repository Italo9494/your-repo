import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";

import { CoverArt } from "@/components/CoverArt";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { Guide } from "@/data/types";
import { getCategory } from "@/data/guides";
import { formatDate } from "@/lib/seo";

export function GuideCard({ guide }: { guide: Guide }) {
  const category = getCategory(guide.category);

  return (
    <article className="group card-hover flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
      <Link href={`/guias/${guide.slug}`} className="block">
        <CoverArt
          title={category?.name ?? "Guia"}
          colors={guide.colors}
          compact
          className="h-24 w-full transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-bold text-brand-blue-dark">
            {category?.name}
          </span>
          <FavoriteButton kind="guides" value={guide.slug} label={`Favoritar ${guide.title}`} />
        </div>

        <h3 className="text-base font-bold leading-snug text-ink">
          <Link href={`/guias/${guide.slug}`} className="transition-colors hover:text-brand-blue">
            {guide.title}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-muted">{guide.summary}</p>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {guide.readTime} min
          </span>
          <span>{formatDate(guide.date)}</span>
        </div>

        <Link
          href={`/guias/${guide.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:text-brand-blue-dark"
        >
          Ler guia
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
