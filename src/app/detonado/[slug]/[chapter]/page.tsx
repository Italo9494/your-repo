import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Backpack,
  Flag,
  Footprints,
  Lightbulb,
  Map as MapIcon,
  Swords,
  Target,
} from "lucide-react";

import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChapterProgress } from "@/components/ChapterProgress";
import { CoverArt } from "@/components/CoverArt";
import { FavoriteButton } from "@/components/FavoriteButton";
import { JsonLd } from "@/components/JsonLd";
import { MarkStepButton } from "@/components/MarkStepButton";
import { TypeChip } from "@/components/PokemonCard";
import { WalkthroughNavigation } from "@/components/WalkthroughNavigation";
import { WalkthroughSidebar } from "@/components/WalkthroughSidebar";
import { getGame } from "@/data/games";
import { getPokemon, pokemonList } from "@/data/pokemon";
import { getWalkthrough, getWalkthroughs } from "@/lib/content";
import { ogImages } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structured-data";
import { getAdjacentChapters, getChapter } from "@/data/walkthroughs";

const leaderSignature: Record<string, string> = {
  Brock: "onix",
  Misty: "staryu",
  Surge: "raichu",
  Erika: "victreebel",
  Koga: "weezing",
  Sabrina: "alakazam",
  Blaine: "moltres",
  Giovanni: "rhydon",
  Lorelei: "lapras",
  Agatha: "gengar",
};

function resolvePokemonMatch(name: string) {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    getPokemon(normalized) ??
    pokemonList.find((pokemon) => pokemon.name.toLowerCase() === name.trim().toLowerCase()) ??
    pokemonList.find((pokemon) =>
      pokemon.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") === normalized,
    )
  );
}

interface PageProps {
  params: Promise<{ slug: string; chapter: string }>;
}

export function generateStaticParams() {
  return getWalkthroughs().flatMap((walkthrough) =>
    walkthrough.chapters.map((chapter) => ({
      slug: walkthrough.slug,
      chapter: chapter.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, chapter } = await params;
  const walkthrough = getWalkthrough(slug);
  const item = walkthrough ? getChapter(walkthrough, chapter) : undefined;
  if (!walkthrough || !item) notFound();

  const title = `${item.title} — ${walkthrough.title}`;
  const description = `${item.objective} Guia passo a passo da etapa ${item.title} de ${walkthrough.title}, com caminho recomendado, itens, treinadores e dicas.`;

  return {
    title,
    description,
    alternates: { canonical: `/detonado/${walkthrough.slug}/${item.slug}` },
    openGraph: {
      images: ogImages(),
      title: `${title} | PokéDetonado`,
      description,
      url: `/detonado/${walkthrough.slug}/${item.slug}`,
      type: "article",
    },
  };
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: typeof Flag;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      {children}
    </h2>
  );
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug, chapter } = await params;
  const walkthrough = getWalkthrough(slug);
  if (!walkthrough) notFound();

  const item = getChapter(walkthrough, chapter);
  if (!item) notFound();

  const game = getGame(walkthrough.gameSlug);
  if (!game) notFound();

  const baseUrl = `/detonado/${walkthrough.slug}`;
  const { prev, next, index } = getAdjacentChapters(walkthrough, item.slug);
  const chapterKey = `${walkthrough.slug}:${item.slug}`;
  const gymLeader = item.trainers.find((trainer) =>
    Object.keys(leaderSignature).some((leader) => trainer.name.includes(leader)),
  );
  const leaderPokemonName = gymLeader ? leaderSignature[gymLeader.name.split(/\s+/)[0]] ?? undefined : undefined;
  const leaderPokemon = leaderPokemonName ? resolvePokemonMatch(leaderPokemonName) : undefined;
  const chapterCover =
    leaderPokemon?.cover ??
    (item.pokemon[0] ? resolvePokemonMatch(item.pokemon[0].name)?.cover : undefined) ??
    game.cover;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Detonados", href: "/detonados" },
          { label: walkthrough.title, href: baseUrl },
          { label: item.title },
        ]}
      />

      <JsonLd
        data={articleJsonLd({
          title: `${item.title} — ${walkthrough.title}`,
          description: item.objective,
          path: `${baseUrl}/${item.slug}`,
          dateModified: walkthrough.updatedAt,
          image: "/opengraph-image",
        })}
      />

      <div className="mt-5 grid gap-8 lg:grid-cols-[300px_1fr]">
        <WalkthroughSidebar
          gameSlug={walkthrough.gameSlug}
          gameName={game.name}
          chapters={walkthrough.chapters.map((chapterItem) => ({
            slug: chapterItem.slug,
            title: chapterItem.title,
            order: chapterItem.order,
          }))}
          baseUrl={baseUrl}
        />

        <article>
          <header className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="red">Etapa {index + 1} de {walkthrough.chapters.length}</Badge>
              <Badge tone="blue">{game.region}</Badge>
              <Badge tone="yellow">{game.name}</Badge>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
                  {walkthrough.title}
                </p>
                <h1 className="mt-1.5 text-3xl font-extrabold leading-tight tracking-tight text-ink">
                  {item.title}
                </h1>
              </div>
              <FavoriteButton
                kind="chapters"
                value={chapterKey}
                label={`Favoritar etapa ${item.title}`}
                size="md"
                showLabel
              />
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted">{item.intro}</p>

            <div className="mt-5">
              <ChapterProgress gameSlug={walkthrough.gameSlug} total={walkthrough.chapters.length} />
            </div>
          </header>

          <section className="mt-6 rounded-3xl border border-brand-blue/25 bg-brand-blue/5 p-5 sm:p-6">
            <SectionTitle icon={Target}>Objetivo da etapa</SectionTitle>
            <p className="text-sm leading-relaxed text-ink sm:text-base">{item.objective}</p>
          </section>

          <section className="mt-6 rounded-3xl border border-line bg-surface p-5 sm:p-6">
            <SectionTitle icon={Footprints}>Caminho recomendado</SectionTitle>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{item.route}</p>
            {item.mapNote && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-line">
                <CoverArt
                  title={item.title}
                  colors={game.colors}
                  cover={chapterCover}
                  compact
                  className="h-32 w-full"
                  label={`Ilustração do trajeto da etapa ${item.title}`}
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
                <p className="bg-canvas px-4 py-3 text-xs leading-relaxed text-muted">
                  <MapIcon className="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true" />
                  {item.mapNote}
                </p>
              </div>
            )}
          </section>

          {gymLeader && (
            <section className="mt-6 rounded-3xl border border-brand-red/25 bg-brand-red/5 p-5 sm:p-6">
              <SectionTitle icon={Flag}>Líder da etapa</SectionTitle>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-line bg-white/60 shadow-soft">
                  <img
                    src={leaderPokemon?.cover ?? "/covers/pikachu.png"}
                    alt={gymLeader.name}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
                    Enfrentado nesta etapa
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-ink">{gymLeader.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{gymLeader.note}</p>
                </div>
              </div>
            </section>
          )}

          {item.pokemon.length > 0 && (
            <section className="mt-6 rounded-3xl border border-line bg-surface p-5 sm:p-6">
              <SectionTitle icon={Swords}>Pokémon importantes</SectionTitle>
              <ul className="grid gap-3 sm:grid-cols-2">
                {item.pokemon.map((entry) => {
                  const data = resolvePokemonMatch(entry.name);
                  return (
                    <li
                      key={entry.name}
                      className="flex items-start gap-3 rounded-2xl border border-line bg-canvas p-4"
                    >
                      {data?.cover ? (
                        <img
                          src={data.cover}
                          alt={entry.name}
                          className="mt-0.5 h-14 w-14 shrink-0 rounded-full border-2 border-white bg-white/60 object-contain p-1 shadow-inner"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="mt-0.5 h-9 w-9 shrink-0 rounded-full border-2 border-white shadow-inner"
                          style={{
                            backgroundImage: "linear-gradient(135deg, #ffcb05, #e3350d)",
                          }}
                        />
                      )}
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-ink">{entry.name}</span>
                          {data?.types.map((type) => (
                            <TypeChip key={type} type={type} />
                          ))}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted">
                          {entry.note}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-line bg-surface p-5">
              <SectionTitle icon={Backpack}>Itens importantes</SectionTitle>
              <ul className="space-y-3">
                {item.items.map((entry) => (
                  <li key={entry.name} className="border-b border-line pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-ink">{entry.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{entry.note}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-line bg-surface p-5">
              <SectionTitle icon={Flag}>Treinadores</SectionTitle>
              <ul className="space-y-3">
                {item.trainers.map((entry) => (
                  <li key={entry.name} className="border-b border-line pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-ink">{entry.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{entry.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-6 rounded-3xl border border-brand-yellow/60 bg-brand-yellow/10 p-5 sm:p-6">
            <SectionTitle icon={Lightbulb}>Dicas da etapa</SectionTitle>
            <ul className="space-y-3">
              {item.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-yellow-dark"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MarkStepButton
              gameSlug={walkthrough.gameSlug}
              chapterSlug={item.slug}
            />
            <a
              href="#conteudo"
              className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 text-sm font-semibold text-muted transition hover:border-brand-blue hover:text-brand-blue"
            >
              Voltar ao topo
            </a>
          </div>

          <WalkthroughNavigation
            baseUrl={baseUrl}
            prev={prev ? { slug: prev.slug, title: prev.title } : null}
            next={next ? { slug: next.slug, title: next.title } : null}
          />
        </article>
      </div>
    </div>
  );
}
