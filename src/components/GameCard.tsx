import Link from "next/link";
import { Gamepad2, MapPin } from "lucide-react";

import { Badge } from "@/components/Badge";
import { CoverArt } from "@/components/CoverArt";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { Game } from "@/data/types";
import { generationLabels } from "@/data/games";

interface GameCardProps {
  game: Game;
  hasWalkthrough?: boolean;
}

export function GameCard({ game, hasWalkthrough = false }: GameCardProps) {
  const href = `/detonado/${game.slug}`;

  return (
    <article
      id={game.slug}
      className="group card-hover relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft scroll-mt-28"
    >
      <Link
        href={href}
        className="block focus-visible:outline-none"
        aria-label={`Ver detonado de ${game.name}`}
      >
        <CoverArt
          title={game.name}
          colors={game.colors}
          cover={game.cover}
          className="h-36 w-full transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold leading-snug text-ink">
              <Link href={href} className="transition-colors hover:text-brand-blue">
                {game.name}
              </Link>
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1">
                <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
                {game.platform}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {game.region}
              </span>
            </p>
          </div>
          <FavoriteButton kind="games" value={game.slug} label={`Favoritar ${game.name}`} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{generationLabels[game.generation]}</Badge>
          <Badge tone={game.difficulty === "Difícil" ? "red" : "yellow"}>
            {game.difficulty}
          </Badge>
          <Badge tone={hasWalkthrough ? "green" : "neutral"}>
            {hasWalkthrough ? "Etapas publicadas" : "Guia em produção"}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-muted">{game.description}</p>

        <Link
          href={href}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-red-dark"
        >
          Ver detonado
        </Link>
      </div>
    </article>
  );
}
