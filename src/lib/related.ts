import { games } from "@/data/games";
import { pokemonList } from "@/data/pokemon";
import type { Game, Guide, Pokemon, TipArticle, Walkthrough } from "@/data/types";
import { getGuides, getTips, getWalkthroughs } from "@/lib/content";
import { getViews, type RankKind } from "@/lib/rankings";

function byViews<T extends { slug: string }>(items: T[], kind: RankKind): T[] {
  return [...items].sort((a, b) => getViews(kind, b.slug) - getViews(kind, a.slug));
}

function mergeUnique<T extends { slug: string }>(...lists: T[][]): T[] {
  const seen = new Set<string>();
  const merged: T[] = [];
  for (const list of lists) {
    for (const item of list) {
      if (seen.has(item.slug)) continue;
      seen.add(item.slug);
      merged.push(item);
    }
  }
  return merged;
}

export function relatedGuides(guide: Guide, limit = 3): Guide[] {
  const guides = getGuides();
  const sameCategory = guides.filter(
    (item) => item.slug !== guide.slug && item.category === guide.category,
  );
  const sharedGames = guides.filter(
    (item) =>
      item.slug !== guide.slug &&
      !sameCategory.includes(item) &&
      item.gameSlugs.some((slug) => guide.gameSlugs.includes(slug)),
  );
  const rest = guides.filter(
    (item) =>
      item.slug !== guide.slug && !sameCategory.includes(item) && !sharedGames.includes(item),
  );
  return mergeUnique(sameCategory, byViews(sharedGames, "guia"), byViews(rest, "guia")).slice(
    0,
    limit,
  );
}

export function relatedTips(tip: TipArticle, limit = 3): TipArticle[] {
  const tips = getTips();
  const sameCategory = tips.filter(
    (item) => item.slug !== tip.slug && item.category === tip.category,
  );
  const rest = tips.filter((item) => item.slug !== tip.slug && !sameCategory.includes(item));
  return mergeUnique(sameCategory, byViews(rest, "dica")).slice(0, limit);
}

export function relatedGames(game: Game, limit = 4): Game[] {
  const sameRegion = games.filter(
    (item) => item.slug !== game.slug && item.region === game.region,
  );
  const sameGeneration = games.filter(
    (item) => item.slug !== game.slug && item.generation === game.generation,
  );
  const rest = games.filter(
    (item) =>
      item.slug !== game.slug &&
      !sameRegion.includes(item) &&
      !sameGeneration.includes(item),
  );
  return mergeUnique(sameRegion, sameGeneration, byViews(rest, "jogo")).slice(0, limit);
}

export function relatedWalkthroughs(source: Walkthrough, limit = 3): Walkthrough[] {
  const walkthroughs = getWalkthroughs();
  const game = games.find((item) => item.slug === source.gameSlug);
  const candidates = walkthroughs.filter((item) => item.slug !== source.slug);
  const sameRegion = candidates.filter((item) => {
    const itemGame = games.find((gameItem) => gameItem.slug === item.gameSlug);
    return itemGame?.region === game?.region;
  });
  const rest = candidates.filter((item) => !sameRegion.includes(item));
  return mergeUnique(byViews(sameRegion, "detonado"), byViews(rest, "detonado")).slice(
    0,
    limit,
  );
}

export function relatedPokemon(pokemon: Pokemon, limit = 6): Pokemon[] {
  const family = pokemonList.filter(
    (item) => item.familyId === pokemon.familyId && item.slug !== pokemon.slug,
  );
  const sameType = pokemonList.filter(
    (item) =>
      item.slug !== pokemon.slug &&
      item.familyId !== pokemon.familyId &&
      item.types.some((type) => pokemon.types.includes(type)),
  );
  const sameRegion = pokemonList.filter(
    (item) =>
      item.slug !== pokemon.slug &&
      item.familyId !== pokemon.familyId &&
      !sameType.includes(item) &&
      item.region === pokemon.region,
  );
  const rest = pokemonList.filter(
    (item) =>
      item.slug !== pokemon.slug &&
      !sameType.includes(item) &&
      !sameRegion.includes(item),
  );
  return mergeUnique(
    family,
    byViews(sameType, "pokemon"),
    byViews(sameRegion, "pokemon"),
    byViews(rest, "pokemon"),
  ).slice(0, limit);
}

export function guidesForGame(gameSlug: string, limit = 3): Guide[] {
  const guides = getGuides();
  return byViews(
    guides.filter((guide) => guide.gameSlugs.includes(gameSlug)),
    "guia",
  ).slice(0, limit);
}
