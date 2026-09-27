"use client";

import { createStore, useLocalStore } from "@/lib/local-store";

export type ContentKind =
  | "detonado"
  | "etapa"
  | "guia"
  | "dica"
  | "jogo"
  | "pokemon"
  | "mapa"
  | "categoria"
  | "busca"
  | "pagina";

export interface HistoryEntry {
  href: string;
  title: string;
  kind: ContentKind;
  at: number;
}

export interface HistoryState {
  entries: HistoryEntry[];
  searches: string[];
}

const EMPTY: HistoryState = { entries: [], searches: [] };

const MAX_ENTRIES = 40;
const MAX_SEARCHES = 8;

export const historyStore = createStore<HistoryState>("pokedetonado:historico", EMPTY);

export function classifyPath(href: string): ContentKind {
  const [pathname] = href.split("?");
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "detonado" && parts.length >= 3) return "etapa";
  if (parts[0] === "detonado") return "detonado";
  if (parts[0] === "guias") return "guia";
  if (parts[0] === "dicas") return "dica";
  if (parts[0] === "jogos") return "jogo";
  if (parts[0] === "pokemon") return "pokemon";
  if (parts[0] === "mapas") return "mapa";
  if (parts[0] === "categorias") return "categoria";
  if (parts[0] === "pesquisa") return "busca";
  return "pagina";
}

export const kindLabels: Record<ContentKind, string> = {
  detonado: "Detonado",
  etapa: "Etapa",
  guia: "Guia",
  dica: "Dica",
  jogo: "Jogo",
  pokemon: "Pokémon",
  mapa: "Mapa",
  categoria: "Categoria",
  busca: "Busca",
  pagina: "Página",
};

export function useHistory(): HistoryState {
  return useLocalStore(historyStore) ?? EMPTY;
}

export function recordVisit(href: string, title: string): void {
  if (!href || href === "/historico") return;
  historyStore.set((prev) => {
    const rest = prev.entries.filter((entry) => entry.href !== href);
    const entry: HistoryEntry = {
      href,
      title: title.replace(/\s*[|\-–]\s*PokéDetonado.*$/, "").trim() || href,
      kind: classifyPath(href),
      at: Date.now(),
    };
    return { ...prev, entries: [entry, ...rest].slice(0, MAX_ENTRIES) };
  });
}

export function recordSearch(query: string): void {
  const term = query.trim();
  if (term.length < 2) return;
  historyStore.set((prev) => {
    const rest = prev.searches.filter((item) => item.toLowerCase() !== term.toLowerCase());
    return { ...prev, searches: [term, ...rest].slice(0, MAX_SEARCHES) };
  });
}

export function clearHistory(): void {
  historyStore.set((prev) => ({ ...prev, entries: [] }));
}

export function clearSearches(): void {
  historyStore.set((prev) => ({ ...prev, searches: [] }));
}
