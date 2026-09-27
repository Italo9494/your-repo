import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";

import { CoverArt } from "@/components/CoverArt";
import type { GameMap } from "@/data/types";
import { getGame } from "@/data/games";

export function MapCard({ map }: { map: GameMap }) {
  const game = getGame(map.gameSlug);

  return (
    <article className="group card-hover flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
      <Link href={`/mapas/${map.slug}`} className="block">
        <CoverArt
          title={map.name}
          colors={map.colors}
          compact
          className="h-32 w-full transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 px-2.5 py-1 text-xs font-bold text-brand-red-dark">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {map.region}
          </span>
          <span className="text-xs text-muted">{game?.name}</span>
        </div>

        <h3 className="text-lg font-bold text-ink">
          <Link href={`/mapas/${map.slug}`} className="transition-colors hover:text-brand-blue">
            {map.name}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-muted">{map.summary}</p>

        <ul className="flex flex-wrap gap-1.5">
          {map.locations.slice(0, 4).map((location) => (
            <li
              key={location.name}
              className="rounded-full border border-line bg-canvas px-2.5 py-1 text-xs text-muted"
            >
              {location.name}
            </li>
          ))}
          {map.locations.length > 4 && (
            <li className="rounded-full border border-line bg-canvas px-2.5 py-1 text-xs text-muted">
              +{map.locations.length - 4}
            </li>
          )}
        </ul>

        <Link
          href={`/mapas/${map.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:text-brand-blue-dark"
        >
          Abrir mapa
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
