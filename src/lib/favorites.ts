"use client";

import { useCallback } from "react";

import { createStore, useLocalStore } from "@/lib/local-store";

export interface FavoritesState {
  games: string[];
  guides: string[];
  pokemon: string[];
  chapters: string[];
}

const EMPTY: FavoritesState = { games: [], guides: [], pokemon: [], chapters: [] };

export const favoritesStore = createStore<FavoritesState>("pokedetonado:favoritos", EMPTY);

export type FavoriteKind = keyof FavoritesState;

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function useFavorites(): FavoritesState {
  return useLocalStore(favoritesStore);
}

export function useFavorite(kind: FavoriteKind, value: string): [boolean, () => void] {
  const state = useLocalStore(favoritesStore);
  const active = state[kind].includes(value);

  const toggle = useCallback(() => {
    favoritesStore.set((prev) => ({
      ...prev,
      [kind]: toggleValue(prev[kind], value),
    }));
  }, [kind, value]);

  return [active, toggle];
}

export function useFavoritesCount(): number {
  const state = useLocalStore(favoritesStore);
  return (
    state.games.length + state.guides.length + state.pokemon.length + state.chapters.length
  );
}

