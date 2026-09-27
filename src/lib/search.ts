import { games } from "@/data/games";
import { maps } from "@/data/maps";
import { pokemonList } from "@/data/pokemon";
import { getGuides, getTips, getWalkthroughs } from "@/lib/content";
import { normalizeText } from "@/lib/seo";

export type SearchKind = "pokemon" | "detonado" | "guia" | "jogo" | "mapa" | "dica";

export interface SearchResult {
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  meta?: string;
  score: number;
}

const kindLabels: Record<SearchKind, string> = {
  pokemon: "Pokémon",
  detonado: "Detonado",
  guia: "Guia",
  jogo: "Jogo",
  mapa: "Mapa",
  dica: "Dica",
};

export function kindLabel(kind: SearchKind): string {
  return kindLabels[kind];
}

function score(text: string, query: string): number {
  if (text === query) return 100;
  if (text.startsWith(query)) return 70;
  if (text.includes(query)) return 50;

  const compactText = text.replace(/\s+/g, "");
  const compactQuery = query.replace(/\s+/g, "");
  if (compactQuery.length > 1 && compactText.includes(compactQuery)) return 40;

  return -1;
}

function words(text: string, query: string): number {
  const terms = query.split(/\s+/).filter((term) => term.length > 2);
  if (terms.length === 0) return -1;
  const hits = terms.filter((term) => text.includes(term)).length;
  if (hits === terms.length) return 35;
  if (hits > 0) return 20;
  return -1;
}

function best(...values: number[]): number {
  return values.reduce((max, value) => (value > max ? value : max), -1);
}

export function searchAll(rawQuery: string): SearchResult[] {
  const query = normalizeText(rawQuery);
  if (query.length < 2) return [];

  const guides = getGuides();
  const tips = getTips();
  const walkthroughs = getWalkthroughs();

  const results: SearchResult[] = [];

  for (const item of pokemonList) {
    const byName = score(normalizeText(item.name), query);
    const byDex = String(item.dex).startsWith(query) ? 55 : -1;
    const byType = item.types.some((type) => score(normalizeText(type), query) >= 0) ? 45 : -1;
    const points = best(byName, byDex, byType, words(normalizeText(item.name), query));
    if (points < 0) continue;
    results.push({
      kind: "pokemon",
      title: item.name,
      description: item.description,
      href: `/pokemon/${item.slug}`,
      meta: `Nº ${String(item.dex).padStart(3, "0")} · ${item.types.join(" / ")}`,
      score: points,
    });
  }

  for (const game of games) {
    const points = best(
      score(normalizeText(`${game.name} ${game.region} ${game.platform}`), query),
      words(normalizeText(game.name), query),
    );
    if (points < 0) continue;
    results.push({
      kind: "jogo",
      title: game.name,
      description: game.description,
      href: `/detonado/${game.slug}`,
      meta: `${game.region} · ${game.platform}`,
      score: points,
    });
  }

  for (const walkthrough of walkthroughs) {
    const chapters = walkthrough.chapters
      .map(
        (chapter) =>
          `${chapter.title} ${chapter.objective} ${chapter.pokemon.map((p) => p.name).join(" ")}`,
      )
      .join(" ");
    const haystack = normalizeText(
      `${walkthrough.title} ${walkthrough.summary} ${chapters} ${(walkthrough.plannedChapters ?? []).join(" ")}`,
    );
    const points = best(score(haystack, query), words(haystack, query));
    if (points < 0) continue;
    results.push({
      kind: "detonado",
      title: walkthrough.title,
      description: walkthrough.summary,
      href: `/detonado/${walkthrough.slug}`,
      meta:
        walkthrough.chapters.length > 0
          ? `${walkthrough.chapters.length} etapas`
          : "Em produção",
      score: points,
    });
  }

  for (const guide of guides) {
    const content = guide.sections
      .map(
        (section) =>
          `${section.heading} ${section.paragraphs.join(" ")} ${(section.bullets ?? []).join(" ")}`,
      )
      .join(" ");
    const haystack = normalizeText(`${guide.title} ${guide.summary} ${content}`);
    const points = best(score(haystack, query), words(haystack, query));
    if (points < 0) continue;
    results.push({
      kind: "guia",
      title: guide.title,
      description: guide.summary,
      href: `/guias/${guide.slug}`,
      meta: `${guide.readTime} min de leitura`,
      score: points,
    });
  }

  for (const tip of tips) {
    const content = tip.sections
      .map((section) => `${section.heading} ${section.paragraphs.join(" ")}`)
      .join(" ");
    const haystack = normalizeText(`${tip.title} ${tip.summary} ${tip.category} ${content}`);
    const points = best(score(haystack, query), words(haystack, query));
    if (points < 0) continue;
    results.push({
      kind: "dica",
      title: tip.title,
      description: tip.summary,
      href: `/dicas/${tip.slug}`,
      meta: `${tip.category} · ${tip.readTime} min`,
      score: points,
    });
  }

  for (const map of maps) {
    const haystack = normalizeText(
      `${map.name} ${map.region} ${map.locations.map((location) => location.name).join(" ")}`,
    );
    const points = best(score(haystack, query), words(haystack, query));
    if (points < 0) continue;
    results.push({
      kind: "mapa",
      title: map.name,
      description: map.summary,
      href: `/mapas/${map.slug}`,
      meta: map.region,
      score: points,
    });
  }

  return results.sort((a, b) => b.score - a.score);
}

export function groupResults(results: SearchResult[]): Record<SearchKind, SearchResult[]> {
  const grouped: Record<SearchKind, SearchResult[]> = {
    pokemon: [],
    detonado: [],
    guia: [],
    jogo: [],
    mapa: [],
    dica: [],
  };
  for (const result of results) grouped[result.kind].push(result);
  return grouped;
}
