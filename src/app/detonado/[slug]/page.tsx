import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Gamepad2, Layers, MapPin, Star } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChapterIndexList } from "@/components/ChapterIndexList";
import { ContentList } from "@/components/ContentList";
import { CoverArt } from "@/components/CoverArt";
import { DetonadoProgressPanel } from "@/components/DetonadoProgressPanel";
import { FavoriteButton } from "@/components/FavoriteButton";
import { GameCard } from "@/components/GameCard";
import { GuideCard } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { PokemonCard } from "@/components/PokemonCard";
import { SectionHeading } from "@/components/SectionHeading";
import { InlineNote } from "@/components/EmptyState";
import { generationLabels, getGame } from "@/data/games";
import { pokemonList } from "@/data/pokemon";
import { getWalkthrough, getWalkthroughs } from "@/lib/content";
import { guidesForGame, relatedGames, relatedWalkthroughs } from "@/lib/related";
import { getViews } from "@/lib/rankings";
import { formatDate, ogImages } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getWalkthroughs().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const walkthrough = getWalkthrough(slug);
  if (!walkthrough) notFound();

  const game = getGame(walkthrough.gameSlug);
  const gameName = game?.name ?? walkthrough.title;
  const regionName = game?.region ?? "sua região";
  const title = `${walkthrough.title} Completo`;
  const description = `Confira o detonado completo de ${gameName}, com guia passo a passo, cidades, rotas, ginásios, itens e dicas para concluir ${regionName}.`;

  return {
    title,
    description,
    alternates: { canonical: `/detonado/${walkthrough.slug}` },
    openGraph: {
      images: ogImages(),
      title: `${title} | PokéDetonado`,
      description,
      url: `/detonado/${walkthrough.slug}`,
      type: "article",
    },
  };
}

export default async function DetonadoPage({ params }: PageProps) {
  const { slug } = await params;
  const walkthrough = getWalkthrough(slug);
  if (!walkthrough) notFound();

  const game = getGame(walkthrough.gameSlug);
  if (!game) notFound();

  const hasChapters = walkthrough.chapters.length > 0;
  const baseUrl = `/detonado/${walkthrough.slug}`;
  const walkthroughs = getWalkthroughs();

  const relatedGameCards = relatedGames(game, 4);
  const relatedGuideCards = guidesForGame(game.slug, 3);
  const relatedWalkthroughCards = relatedWalkthroughs(walkthrough, 3);

  const chapterPokemonNames = new Set(
    walkthrough.chapters.flatMap((chapter) => chapter.pokemon.map((item) => item.name)),
  );
  const chapterPokemon = pokemonList.filter((item) => chapterPokemonNames.has(item.name));
  const regionPokemon = pokemonList
    .filter((item) => item.region === game.region && !chapterPokemon.includes(item))
    .sort((a, b) => getViews("pokemon", b.slug) - getViews("pokemon", a.slug));
  const pokemonSuggestions = [...chapterPokemon, ...regionPokemon].slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Detonados", href: "/detonados" },
          { label: game.name },
        ]}
      />

      <JsonLd
        data={articleJsonLd({
          title: `${walkthrough.title} Completo`,
          description: walkthrough.summary,
          path: `/detonado/${walkthrough.slug}`,
          dateModified: walkthrough.updatedAt,
          image: "/opengraph-image",
        })}
      />

      <section className="mt-5 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <CoverArt
            title={game.name}
            colors={game.colors}
            cover={game.cover}
            className="h-64 w-full rounded-3xl shadow-card"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
          <div className="rounded-3xl border border-line bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
                Informações básicas
              </h2>
              <FavoriteButton kind="games" value={game.slug} label={`Favoritar ${game.name}`} />
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-muted">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  Geração
                </dt>
                <dd className="font-semibold text-ink">{generationLabels[game.generation]}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-muted">
                  <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                  Plataforma
                </dt>
                <dd className="font-semibold text-ink">{game.platform}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Região
                </dt>
                <dd className="font-semibold text-ink">{game.region}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-muted">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Lançamento
                </dt>
                <dd className="font-semibold text-ink">{game.year}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-muted">
                  <Star className="h-4 w-4" aria-hidden="true" />
                  Dificuldade
                </dt>
                <dd className="font-semibold text-ink">{walkthrough.difficulty}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{game.region}</Badge>
            <Badge tone="yellow">{generationLabels[game.generation]}</Badge>
            <Badge tone={walkthrough.difficulty === "Difícil" ? "red" : "green"}>
              {walkthrough.difficulty}
            </Badge>
            <Badge tone="neutral">
              Atualizado em {formatDate(walkthrough.updatedAt)}
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {walkthrough.title}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            {walkthrough.summary}
          </p>

          <div className="mt-6 max-w-2xl">
            {hasChapters ? (
              <DetonadoProgressPanel
                gameSlug={walkthrough.gameSlug}
                chapters={walkthrough.chapters.map((chapter) => ({
                  slug: chapter.slug,
                  title: chapter.title,
                }))}
                baseUrl={baseUrl}
              />
            ) : (
              <InlineNote>
                Este detonado ainda está em produção. A estrutura de capítulos já está
                disponível abaixo e as etapas serão publicadas em ordem.
              </InlineNote>
            )}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
              Sumário
            </p>
            <h2 className="mt-1 text-2xl font-bold text-ink">
              {hasChapters ? "Índice do detonado" : "Capítulos planejados"}
            </h2>
          </div>
          <p className="text-sm text-muted">
            {hasChapters
              ? `${walkthrough.chapters.length} etapas publicadas`
              : `${walkthrough.plannedChapters?.length ?? 0} capítulos previstos`}
          </p>
        </div>

        {hasChapters ? (
          <ChapterIndexList
            gameSlug={walkthrough.gameSlug}
            chapters={walkthrough.chapters.map((chapter) => ({
              slug: chapter.slug,
              title: chapter.title,
              order: chapter.order,
            }))}
            baseUrl={baseUrl}
          />
        ) : (
          <ol className="grid gap-2">
            {(walkthrough.plannedChapters ?? []).map((title, index) => (
              <li
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-dashed border-line bg-surface px-4 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas text-xs font-bold text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm font-semibold text-ink">{title}</span>
                <span className="text-xs font-medium text-muted">Em breve</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-12 rounded-3xl border border-line bg-surface p-6">
        <h2 className="text-lg font-bold text-ink">Sobre {game.name}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{game.description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/jogos#${game.slug}`}
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
          >
            Ver na página de jogos
          </Link>
          <Link
            href={`/mapas/mapa-${game.region.toLowerCase()}`}
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
          >
            Ver mapa de {game.region}
          </Link>
        </div>
      </section>

      {pokemonSuggestions.length > 0 && (
        <section className="mt-12">
          <SectionHeading
            eyebrow="Aparecem no guia"
            title="Pokémon neste detonado"
            description="Pokémon citados nas etapas já publicadas e destaques da região."
            href="/pokemon"
            linkLabel="Ver a Pokédex"
          />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
            {pokemonSuggestions.map((item) => (
              <PokemonCard key={item.slug} pokemon={item} />
            ))}
          </div>
        </section>
      )}

      {relatedGuideCards.length > 0 && (
        <section className="mt-12">
          <SectionHeading
            eyebrow="Para complementar"
            title={`Guias de ${game.name}`}
            description="Artigos que ajudam em partes específicas deste jogo."
            href="/guias"
            linkLabel="Todos os guias"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedGuideCards.map((item) => (
              <GuideCard key={item.slug} guide={item} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <SectionHeading
          eyebrow="Continue por aqui"
          title="Jogos relacionados"
          description={`Outros títulos de ${game.region} e jogos da mesma geração.`}
          href="/jogos"
          linkLabel="Ver todos os jogos"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {relatedGameCards.map((item) => (
            <GameCard
              key={item.slug}
              game={item}
              hasWalkthrough={walkthroughs.some(
                (entry) => entry.gameSlug === item.slug && entry.chapters.length > 0,
              )}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Mesmo formato"
          title="Detonados relacionados"
          description="Outros jogos com guia passo a passo no portal."
          href="/detonados"
          linkLabel="Todos os detonados"
        />
        <ContentList
          items={relatedWalkthroughCards.map((item) => {
            const itemGame = getGame(item.gameSlug);
            return {
              kind: "detonado" as const,
              slug: item.slug,
              title: item.title,
              description: item.summary,
              href: `/detonado/${item.slug}`,
              meta: itemGame ? `${itemGame.region} · ${item.chapters.length} etapas` : undefined,
              views: getViews("detonado", item.slug),
              date: item.updatedAt,
            };
          })}
        />
      </section>
    </div>
  );
}
