"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/EmptyState";
import { FilterChip } from "@/components/FilterChip";
import { PokemonCard, TypeChip } from "@/components/PokemonCard";
import type { Pokemon } from "@/data/types";
import { normalizeText } from "@/lib/seo";

interface PokemonExplorerProps {
  items: Pokemon[];
  types: string[];
  regions: string[];
}

type SortOption = "dex" | "nome" | "geracao" | "regiao";

const sortLabels: Record<SortOption, string> = {
  dex: "Número da Pokédex",
  nome: "Nome (A–Z)",
  geracao: "Geração",
  regiao: "Região",
};

export function PokemonExplorer({ items, types, regions }: PokemonExplorerProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [generation, setGeneration] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("dex");

  const generations = useMemo(
    () => Array.from(new Set(items.map((item) => item.generation))).sort((a, b) => a - b),
    [items],
  );

  const filtered = useMemo(() => {
    const term = normalizeText(query);
    const result = items.filter((pokemon) => {
      if (type && !pokemon.types.includes(type)) return false;
      if (region && pokemon.region !== region) return false;
      if (generation && pokemon.generation !== generation) return false;
      if (!term) return true;
      return (
        normalizeText(pokemon.name).includes(term) ||
        String(pokemon.dex).includes(term) ||
        pokemon.types.some((item) => normalizeText(item).includes(term))
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "nome") return a.name.localeCompare(b.name, "pt-BR");
      if (sort === "geracao") return a.generation - b.generation || a.dex - b.dex;
      if (sort === "regiao") return a.region.localeCompare(b.region, "pt-BR") || a.dex - b.dex;
      return a.dex - b.dex;
    });
  }, [items, query, type, region, generation, sort]);

  function reset() {
    setQuery("");
    setType(null);
    setRegion(null);
    setGeneration(null);
    setSort("dex");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label htmlFor="pokemon-search" className="mb-1.5 block text-sm font-semibold text-ink">
              Pesquisar Pokémon
            </label>
            <input
              id="pokemon-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nome, número da Pokédex ou tipo (ex.: charizard)"
              className="w-full rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand-blue focus:bg-surface focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted transition hover:border-brand-red hover:text-brand-red"
          >
            Limpar filtros
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <fieldset>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
              Tipo
            </legend>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={type === null} onClick={() => setType(null)}>
                Todos
              </FilterChip>
              {types.map((item) => (
                <FilterChip
                  key={item}
                  active={type === item}
                  onClick={() => setType(item)}
                  ariaLabel={`Filtrar por tipo ${item}`}
                >
                  <TypeChip type={item} />
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
              Região
            </legend>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={region === null} onClick={() => setRegion(null)}>
                Todas
              </FilterChip>
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
                Geração
              </legend>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={generation === null} onClick={() => setGeneration(null)}>
                  Todas
                </FilterChip>
                {generations.map((item) => (
                  <FilterChip
                    key={item}
                    active={generation === item}
                    onClick={() => setGeneration(item)}
                  >
                    {item}ª
                  </FilterChip>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-end gap-3">
              <label
                htmlFor="ordenar-pokemon"
                className="text-xs font-bold uppercase tracking-wider text-muted"
              >
                Ordenar por
              </label>
              <select
                id="ordenar-pokemon"
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
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        {filtered.length === 1
          ? "1 Pokémon encontrado"
          : `${filtered.length} Pokémon encontrados`}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.slug} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum Pokémon encontrado"
          description="Nenhum resultado para essa combinação de nome, tipo e região. Tente outro termo."
          actionLabel="Limpar filtros"
          actionHref="/pokemon"
        />
      )}
    </div>
  );
}
