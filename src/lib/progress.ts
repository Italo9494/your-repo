"use client";

import { useCallback } from "react";

import { createStore, useLocalStore } from "@/lib/local-store";

export type ProgressState = Record<string, string[]>;

const EMPTY: ProgressState = {};

export const progressStore = createStore<ProgressState>("pokedetonado:progresso", EMPTY);

export function useProgress(): ProgressState {
  return useLocalStore(progressStore);
}

export function useGameProgress(gameSlug: string) {
  const state = useLocalStore(progressStore);
  const completed = state[gameSlug] ?? [];

  const toggleChapter = useCallback(
    (chapterSlug: string) => {
      progressStore.set((prev) => {
        const current = prev[gameSlug] ?? [];
        const next = current.includes(chapterSlug)
          ? current.filter((item) => item !== chapterSlug)
          : [...current, chapterSlug];
        return { ...prev, [gameSlug]: next };
      });
    },
    [gameSlug],
  );

  const reset = useCallback(() => {
    progressStore.set((prev) => ({ ...prev, [gameSlug]: [] }));
  }, [gameSlug]);

  return { completed, toggleChapter, reset };
}

export function progressPercent(completed: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((completed / total) * 100);
}
