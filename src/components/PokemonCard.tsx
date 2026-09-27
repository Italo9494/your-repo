import Link from "next/link";

import { CoverArt } from "@/components/CoverArt";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { Pokemon } from "@/data/types";

const typeTone: Record<string, string> = {
  Fogo: "bg-orange-100 text-orange-700",
  Água: "bg-blue-100 text-blue-700",
  Planta: "bg-green-100 text-green-700",
  Elétrico: "bg-yellow-100 text-yellow-700",
  Voador: "bg-sky-100 text-sky-700",
  Venenoso: "bg-purple-100 text-purple-700",
  Psíquico: "bg-pink-100 text-pink-700",
  Dragão: "bg-indigo-100 text-indigo-700",
  Sombrio: "bg-stone-200 text-stone-700",
  Fantasma: "bg-violet-100 text-violet-700",
  Normal: "bg-slate-100 text-slate-700",
  Pedra: "bg-amber-200 text-amber-800",
  Terra: "bg-yellow-200 text-yellow-800",
  Gelo: "bg-cyan-100 text-cyan-700",
  Lutador: "bg-red-100 text-red-700",
  Aço: "bg-zinc-200 text-zinc-700",
  Fada: "bg-rose-100 text-rose-700",
  Inseto: "bg-lime-100 text-lime-700",
};

function typeToneClass(type: string): string {
  return typeTone[type] ?? "bg-slate-100 text-slate-700";
}

export function TypeChip({ type }: { type: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeToneClass(type)}`}
    >
      {type}
    </span>
  );
}

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <article className="group card-hover relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton kind="pokemon" value={pokemon.slug} label={`Favoritar ${pokemon.name}`} />
      </div>

      <Link href={`/pokemon/${pokemon.slug}`} className="block">
        <CoverArt
          title={pokemon.name}
          colors={pokemon.colors}
          cover={pokemon.cover}
          compact
          className="h-28 w-full transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold tabular-nums text-muted">
            Nº {String(pokemon.dex).padStart(3, "0")}
          </span>
          <span className="text-xs text-muted">{pokemon.region}</span>
        </div>

        <h3 className="text-base font-bold text-ink">
          <Link
            href={`/pokemon/${pokemon.slug}`}
            className="transition-colors hover:text-brand-blue"
          >
            {pokemon.name}
          </Link>
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {pokemon.types.map((type) => (
            <TypeChip key={type} type={type} />
          ))}
        </div>

        <p className="mt-auto line-clamp-2 text-xs leading-relaxed text-muted">
          {pokemon.description}
        </p>
      </div>
    </article>
  );
}
