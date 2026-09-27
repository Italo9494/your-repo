import Link from "next/link";

import { GameGrid } from "@/components/GameGrid";
import { GuideCard } from "@/components/GuideCard";
import { Hero } from "@/components/Hero";
import { MapCard } from "@/components/MapCard";
import { PokemonCard } from "@/components/PokemonCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TipCard } from "@/components/TipCard";
import { ContentList } from "@/components/ContentList";
import { FeaturedWalkthroughs } from "@/components/FeaturedWalkthroughs";
import { JsonLd } from "@/components/JsonLd";
import { ResumeCard } from "@/components/ResumeButton";
import { games } from "@/data/games";
import { maps } from "@/data/maps";
import { pokemonList } from "@/data/pokemon";
import { getAllCategories } from "@/lib/categories";
import { getFeaturedWalkthroughs, getGuides, getTips, getWalkthroughs } from "@/lib/content";
import { popularItems, recentlyUpdated } from "@/lib/rankings";
import { websiteJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  const guides = getGuides();
  const tips = getTips();
  const featuredWalkthroughs = getFeaturedWalkthroughs();
  const featuredGuides = guides.slice(0, 3);
  const featuredPokemon = ["charizard", "pikachu", "gengar", "dragonite", "tyranitar", "lucario"]
    .map((slug) => pokemonList.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const featuredTips = tips.slice(0, 3);
  const sources = { guides, tips, walkthroughs: getWalkthroughs() };
  const popular = popularItems(6, ["detonado", "guia", "pokemon", "dica"], sources);
  const updates = recentlyUpdated(6, sources);
  const categories = getAllCategories().slice(0, 9);

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catálogo"
          title="Escolha seu jogo"
          description="Dezoito títulos clássicos e remakes organizados por geração, plataforma e região."
          href="/jogos"
          linkLabel="Ver todos os jogos"
        />
        <GameGrid
          games={games}
          walkthroughSlugs={featuredWalkthroughs.map((item) => item.gameSlug)}
        />
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Seu progresso"
            title="Detonados em destaque"
            description="Comece pela etapa em que parou e acompanhe seu progresso salvo no navegador."
            href="/detonados"
            linkLabel="Ver todos os detonados"
          />
          <div className="mb-6">
            <ResumeCard />
          </div>
          <FeaturedWalkthroughs items={featuredWalkthroughs} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Mais lidos"
          title="Mais populares"
          description="Os conteúdos com mais leituras nos últimos dias, do portal inteiro."
          href="/pesquisa"
          linkLabel="Pesquisar no portal"
        />
        <ContentList items={popular} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Conteúdos"
          title="Guias para todos os níveis"
          description="Da escolha do inicial à preparação para a Elite Four."
          href="/guias"
          linkLabel="Ver todos os guias"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
              Explorar por categoria
            </h3>
            <Link
              href="/categorias"
              className="text-sm font-semibold text-brand-blue transition hover:text-brand-blue-dark"
            >
              Ver todas
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categorias/${category.slug}`}
                className="rounded-full border border-line bg-canvas px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
              >
                {category.name}
                <span className="ml-1.5 text-xs font-medium text-muted">{category.total}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pokédex"
            title="Pokémon em destaque"
            description="Tipos, região e métodos de evolução para montar o time ideal."
            href="/pokemon"
            linkLabel="Ver a Pokédex"
          />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
            {featuredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.slug} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sempre atualizado"
          title="Atualizados recentemente"
          description="Detonados, guias e dicas revisados nos últimos dias."
          href="/detonados"
          linkLabel="Ver detonados"
        />
        <ContentList items={updates} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Navegação"
          title="Mapas das regiões"
          description="Principais cidades, rotas e pontos de interesse de cada mapa."
          href="/mapas"
          linkLabel="Ver todos os mapas"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {maps.map((map) => (
            <MapCard key={map.slug} map={map} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Atalhos"
            title="Dicas rápidas"
            description="Textos curtos para resolver problemas comuns durante a jornada."
            href="/dicas"
            linkLabel="Ver todas as dicas"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredTips.map((tip) => (
              <TipCard key={tip.slug} tip={tip} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
