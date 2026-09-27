import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PokemonExplorer } from "@/components/PokemonExplorer";
import { pokemonList, pokemonRegions, pokemonTypes } from "@/data/pokemon";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pokédex — Pokémon por número, tipo e região",
  description:
    "Lista pesquisável de Pokémon com número da Pokédex, tipos, região de origem e métodos de evolução.",
  alternates: { canonical: "/pokemon" },
  openGraph: {
    images: ogImages(),
    title: "Pokédex | PokéDetonado",
    description:
      "Pesquise Pokémon por nome, número, tipo e região e confira como cada linha evolui.",
    url: "/pokemon",
    type: "website",
  },
};

export default function PokemonPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Pokémon" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Pokédex</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Pokémon
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Pesquise por nome, número ou tipo. Cada página individual traz descrição, região
          de origem e a linha completa de evolução com o método de cada estágio.
        </p>
      </header>

      <div className="mt-8">
        <PokemonExplorer
          items={pokemonList}
          types={pokemonTypes}
          regions={pokemonRegions}
        />
      </div>
    </div>
  );
}
