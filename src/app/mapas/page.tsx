import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapCard } from "@/components/MapCard";
import { EmptyState } from "@/components/EmptyState";
import { getGame } from "@/data/games";
import { maps } from "@/data/maps";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mapas de Pokémon — Kanto, Johto, Hoenn, Sinnoh e Unova",
  description:
    "Mapas das regiões de Pokémon com cidades, rotas e pontos importantes, organizados por jogo e região.",
  alternates: { canonical: "/mapas" },
  openGraph: {
    images: ogImages(),
    title: "Mapas de Pokémon | PokéDetonado",
    description:
      "Explore os mapas de Kanto, Johto, Hoenn, Sinnoh e Unova com locais importantes listados.",
    url: "/mapas",
    type: "website",
  },
};

export default function MapasPage() {
  const regions = Array.from(new Set(maps.map((map) => map.region)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Mapas" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Regiões</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Mapas de Pokémon
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Cada mapa reúne os locais principais de uma região, com o jogo relacionado e a
          lista de cidades, rotas e pontos de interesse que você precisa alcançar.
        </p>
      </header>

      <nav aria-label="Regiões disponíveis" className="mt-6 flex flex-wrap gap-2">
        {regions.map((region) => {
          const map = maps.find((item) => item.region === region);
          return (
            <Link
              key={region}
              href={`/mapas/${map?.slug}`}
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
            >
              {region}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {maps.map((map) => (
          <MapCard key={map.slug} map={map} />
        ))}
      </div>

      {maps.length === 0 && (
        <EmptyState
          title="Nenhum mapa publicado"
          description="Os mapas das regiões estarão disponíveis em breve."
        />
      )}

      <section className="mt-12 rounded-3xl border border-line bg-surface p-6">
        <h2 className="text-lg font-bold text-ink">Como usar os mapas</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
          Abra a região do jogo que você está jogando e confira a lista de locais
          importantes. Cada entrada indica o que você encontra ali: ginásio, centro de
          Pokémon, caverna ou evento de história.{" "}
          {getGame("pokemon-fire-red")?.name} é o detonado principal do site e segue
          exatamente essa ordem de locais.
        </p>
      </section>
    </div>
  );
}
