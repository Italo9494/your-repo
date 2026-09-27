import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GameFilters } from "@/components/GameFilters";
import { games } from "@/data/games";
import { getWalkthroughs } from "@/lib/content";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jogos de Pokémon — gerações, plataformas e regiões",
  description:
    "Catálogo completo dos jogos de Pokémon organizados por geração, plataforma e região, com links diretos para os detonados disponíveis.",
  alternates: { canonical: "/jogos" },
  openGraph: {
    images: ogImages(),
    title: "Jogos de Pokémon — catálogo | PokéDetonado",
    description:
      "Explore os jogos da franquia por geração, plataforma e região e acesse os detonados passo a passo.",
    url: "/jogos",
    type: "website",
  },
};

export default function JogosPage() {
  const walkthroughSlugs = getWalkthroughs()
    .filter((item) => item.chapters.length > 0)
    .map((item) => item.gameSlug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Jogos" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Catálogo</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Jogos de Pokémon
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Use os filtros para encontrar o título que você está jogando. Cada jogo mostra
          geração, plataforma, região e acesso ao detonado quando disponível.
        </p>
      </header>

      <div className="mt-8">
        <GameFilters games={games} walkthroughSlugs={walkthroughSlugs} />
      </div>
    </div>
  );
}
