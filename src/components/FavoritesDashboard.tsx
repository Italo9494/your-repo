"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, Trash2 } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { ProgressBar } from "@/components/ProgressBar";
import { games } from "@/data/games";
import { pokemonList } from "@/data/pokemon";
import { favoritesStore, useFavorites, type FavoriteKind } from "@/lib/favorites";
import { progressPercent, useProgress } from "@/lib/progress";

interface Item {
  key: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
}

export interface FavoriteGuideView {
  slug: string;
  title: string;
  summary: string;
  readTime: number;
}

export interface FavoriteTipView {
  slug: string;
  title: string;
  summary: string;
  readTime: number;
  category: string;
}

export interface FavoriteWalkthroughView {
  slug: string;
  title: string;
  gameSlug: string;
  chapters: { slug: string; title: string; order: number; objective: string }[];
}

interface ResolveData {
  guides: FavoriteGuideView[];
  tips: FavoriteTipView[];
  walkthroughs: FavoriteWalkthroughView[];
}

function resolve(kind: FavoriteKind, value: string, data: ResolveData): Item | null {
  if (kind === "games") {
    const game = games.find((item) => item.slug === value);
    if (!game) return null;
    const walkthrough = data.walkthroughs.find((item) => item.gameSlug === game.slug);
    return {
      key: value,
      title: game.name,
      description: game.description,
      href: walkthrough ? `/detonado/${walkthrough.slug}` : `/jogos#${game.slug}`,
      meta: `${game.region} · ${game.platform}`,
    };
  }

  if (kind === "pokemon") {
    const pokemon = pokemonList.find((item) => item.slug === value);
    if (!pokemon) return null;
    return {
      key: value,
      title: pokemon.name,
      description: pokemon.description,
      href: `/pokemon/${pokemon.slug}`,
      meta: `Nº ${String(pokemon.dex).padStart(3, "0")} · ${pokemon.types.join(" / ")}`,
    };
  }

  if (value.startsWith("dica:")) {
    const tip = data.tips.find((item) => item.slug === value.replace("dica:", ""));
    if (!tip) return null;
    return {
      key: value,
      title: tip.title,
      description: tip.summary,
      href: `/dicas/${tip.slug}`,
      meta: `${tip.category} · ${tip.readTime} min`,
    };
  }

  if (kind === "guides") {
    const guide = data.guides.find((item) => item.slug === value);
    if (!guide) return null;
    return {
      key: value,
      title: guide.title,
      description: guide.summary,
      href: `/guias/${guide.slug}`,
      meta: `${guide.readTime} min de leitura`,
    };
  }

  const [walkthroughSlug, chapterSlug] = value.split(":");
  const walkthrough = data.walkthroughs.find((item) => item.slug === walkthroughSlug);
  const chapter = walkthrough?.chapters.find((item) => item.slug === chapterSlug);
  if (!walkthrough || !chapter) return null;
  return {
    key: value,
    title: `${chapter.title} — ${walkthrough.title}`,
    description: chapter.objective,
    href: `/detonado/${walkthrough.slug}/${chapter.slug}`,
    meta: `Etapa ${chapter.order} de ${walkthrough.chapters.length}`,
  };
}

function FavoriteList({ title, items, kind }: { title: string; items: Item[]; kind: FavoriteKind }) {
  function remove(item: Item) {
    favoritesStore.set((prev) => ({
      ...prev,
      [kind]: prev[kind].filter((value) => value !== item.key),
    }));
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-ink">{title}</h2>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li
            key={item.key}
            className="flex items-start gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft"
          >
            <Link href={item.href} className="group min-w-0 flex-1">
              <span className="block font-bold text-ink group-hover:text-brand-blue">
                {item.title}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">
                {item.description}
              </span>
              {item.meta && (
                <span className="mt-2 block text-xs font-semibold text-muted">{item.meta}</span>
              )}
            </Link>
            <span className="flex shrink-0 items-center gap-2">
              <Link
                href={item.href}
                aria-label={`Abrir ${item.title}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-brand-blue hover:text-brand-blue"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => remove(item)}
                aria-label={`Remover ${item.title} dos favoritos`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-brand-red hover:text-brand-red"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FavoritesDashboard({ guides, tips, walkthroughs }: ResolveData) {
  const favorites = useFavorites();
  const progress = useProgress();

  const groups: { kind: FavoriteKind; title: string; values: string[] }[] = [
    { kind: "games", title: "Jogos favoritos", values: favorites.games },
    { kind: "chapters", title: "Etapas favoritas", values: favorites.chapters },
    { kind: "guides", title: "Guias e dicas favoritos", values: favorites.guides },
    { kind: "pokemon", title: "Pokémon favoritos", values: favorites.pokemon },
  ];

  const total =
    favorites.games.length +
    favorites.chapters.length +
    favorites.guides.length +
    favorites.pokemon.length;

  const activeProgress = Object.entries(progress).filter(([, list]) => list.length > 0);

  return (
    <div className="mt-8 space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-bold text-ink">Seu progresso nos detonados</h2>
        {activeProgress.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {activeProgress.map(([gameSlug, list]) => {
              const walkthrough = walkthroughs.find((item) => item.gameSlug === gameSlug);
              const game = games.find((item) => item.slug === gameSlug);
              const totalChapters = walkthrough?.chapters.length ?? 0;
              const percent = progressPercent(list.length, totalChapters);
              return (
                <li
                  key={gameSlug}
                  className="rounded-3xl border border-line bg-surface p-5 shadow-soft"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-ink">{game?.name ?? gameSlug}</p>
                    <Link
                      href={walkthrough ? `/detonado/${walkthrough.slug}` : "/detonados"}
                      className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
                    >
                      Abrir
                    </Link>
                  </div>
                  <ProgressBar
                    value={percent}
                    className="mt-3"
                    tone={percent === 100 ? "green" : "blue"}
                  />
                  <p className="mt-2 text-xs text-muted">
                    Você concluiu {list.length} de {totalChapters} etapas.
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="rounded-3xl border border-dashed border-line bg-surface px-5 py-8 text-center text-sm text-muted">
            Nenhum detonado em andamento. Abra um guia e marque as etapas concluídas para
            acompanhar seu progresso aqui.
          </p>
        )}
      </section>

      {total === 0 ? (
        <EmptyState
          icon="favorite"
          title="Você ainda não favoritou nada"
          description="Salve jogos, guias, Pokémon e etapas de detonados para encontrá-los rapidamente nesta página."
          actionLabel="Explorar conteúdos"
          actionHref="/jogos"
        />
      ) : (
        groups
          .filter((group) => group.values.length > 0)
          .map((group) => {
            const items = group.values
              .map((value) => resolve(group.kind, value, { guides, tips, walkthroughs }))
              .filter((item): item is Item => item !== null);
            return (
              <FavoriteList
                key={group.kind}
                title={`${group.title} (${items.length})`}
                items={items}
                kind={group.kind}
              />
            );
          })
      )}

      <p className="flex items-center gap-2 text-sm text-muted">
        <Heart className="h-4 w-4 text-brand-red" aria-hidden="true" />
        Seus favoritos ficam salvos apenas neste navegador, sem cadastro.
      </p>
    </div>
  );
}
