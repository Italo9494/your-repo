"use client";

import { useMemo, useState } from "react";
import { Filter, SearchX } from "lucide-react";

import { GameGrid } from "@/components/GameGrid";
import { EmptyState } from "@/components/EmptyState";
import { FilterChip } from "@/components/FilterChip";
import { games as allGames, generationLabels, platforms, regions } from "@/data/games";
import type { Game } from "@/data/types";
import { getViews } from "@/lib/rankings";
import { normalizeText } from "@/lib/seo";

interface GameFiltersProps {
  games?: Game[];
  walkthroughSlugs?: string[];
}

type SortOption = "nome" | "ano" | "geracao" | "popular";

const sortLabels: Record<SortOption, string> = {
  nome: "Nome (A–Z)",
  ano: "Ano de lançamento",
  geracao: "Geração",
  popular: "Mais populares",
};

export function GameFilters({
  games = allGames,
  walkthroughSlugs = [],
}: GameFiltersProps) {
  const [query, setQuery] = useState("");
  const [generation, setGeneration] = useState<number | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [status, setStatus] = useState<"publicado" | "planejado" | null>(null);
  const [sort, setSort] = useState<SortOption>("nome");

  const generations = useMemo(
    () => Array.from(new Set(games.map((game) => game.generation))).sort((a, b) => a - b),
    [games],
  );

  const difficulties = useMemo(
    () => Array.from(new Set(games.map((game) => game.difficulty))),
    [games],
  );

  const filtered = useMemo(() => {
    const term = normalizeText(query);
    const result = games.filter((game) => {
      if (generation && game.generation !== generation) return false;
      if (platform && game.platform !== platform) return false;
      if (region && game.region !== region) return false;
      if (difficulty && game.difficulty !== difficulty) return false;
      if (status === "publicado" && !walkthroughSlugs.includes(game.slug)) return false;
      if (status === "planejado" && walkthroughSlugs.includes(game.slug)) return false;
      if (!term) return true;
      return normalizeText(`${game.name} ${game.region} ${game.platform}`).includes(term);
    });

    return [...result].sort((a, b) => {
      if (sort === "ano") return b.year - a.year;
      if (sort === "geracao") return a.generation - b.generation || a.name.localeCompare(b.name);
      if (sort === "popular") return getViews("jogo", b.slug) - getViews("jogo", a.slug);
      return a.name.localeCompare(b.name, "pt-BR");
    });
  }, [games, query, generation, platform, region, difficulty, status, walkthroughSlugs, sort]);

  function reset() {
    setQuery("");
    setGeneration(null);
    setPlatform(null);
    setRegion(null);
    setDifficulty(null);
    setStatus(null);
    setSort("nome");
  }

  const hasFilters = Boolean(
    query ||
      generation ||
      platform ||
      region ||
      difficulty ||
      status ||
      sort !== "nome",
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label htmlFor="filtro-jogos" className="mb-1.5 block text-sm font-semibold text-ink">
              Pesquisar por nome
            </label>
            <div className="relative">
              <SearchX
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="filtro-jogos"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex.: Emerald, Kanto, Nintendo DS..."
                className="w-full rounded-full border border-line bg-canvas py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-brand-blue focus:bg-surface focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted transition hover:border-brand-red hover:text-brand-red disabled:opacity-50"
            disabled={!hasFilters}
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Limpar filtros
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <fieldset>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
              Geração
            </legend>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={generation === null}
                onClick={() => setGeneration(null)}
              >
                Todas
              </FilterChip>
              {generations.map((item) => (
                <FilterChip
                  key={item}
                  active={generation === item}
                  onClick={() => setGeneration(item)}
                >
                  {generationLabels[item]}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
              Plataforma
            </legend>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                active={platform === null}
                onClick={() => setPlatform(null)}
              >
                Todas
              </FilterChip>
              {platforms.map((item) => (
                <FilterChip
                  key={item}
                  active={platform === item}
                  onClick={() => setPlatform(item)}
                >
                  {item}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
              Região
            </legend>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={region === null} onClick={() => setRegion(null)}>Todas</FilterChip>
              {regions.map((item) => (
                <FilterChip
                  key={item}
                  active={region === item}
                  onClick={() => setRegion(item)}
                >
                  {item}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 lg:grid-cols-2">
            <fieldset>
              <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
                Dificuldade
              </legend>
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={difficulty === null}
                  onClick={() => setDifficulty(null)}
                >
                  Todas
                </FilterChip>
                {difficulties.map((item) => (
                  <FilterChip
                    key={item}
                    active={difficulty === item}
                    onClick={() => setDifficulty(item)}
                  >
                    {item}
                  </FilterChip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
                Disponibilidade
              </legend>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={status === null} onClick={() => setStatus(null)}>Todos</FilterChip>
                <FilterChip
                  active={status === "publicado"}
                  onClick={() => setStatus("publicado")}
                >
                  Com detonado publicado
                </FilterChip>
                <FilterChip
                  active={status === "planejado"}
                  onClick={() => setStatus("planejado")}
                >
                  Em produção
                </FilterChip>
              </div>
            </fieldset>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="ordenar-jogos"
              className="text-xs font-bold uppercase tracking-wider text-muted"
            >
              Ordenar por
            </label>
            <select
              id="ordenar-jogos"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="rounded-full border border-line bg-canvas px-4 py-2 text-sm font-semibold text-ink focus:border-brand-blue focus:outline-none"
            >
              {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                <option key={option} value={option}>
                  {sortLabels[option]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        {filtered.length === 1 ? "1 jogo encontrado" : `${filtered.length} jogos encontrados`}
      </p>

      {filtered.length > 0 ? (
        <GameGrid games={filtered} walkthroughSlugs={walkthroughSlugs} />
      ) : (
        <div className="space-y-4">
          <EmptyState
            title="Nenhum jogo encontrado"
            description="Nenhum título corresponde aos filtros escolhidos. Tente outro nome, geração ou plataforma."
          />
          <div className="text-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue-dark"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
