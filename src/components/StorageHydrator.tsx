"use client";

import { useEffect } from "react";

import { favoritesStore } from "@/lib/favorites";
import { historyStore } from "@/lib/history";
import { progressStore } from "@/lib/progress";

/**
 * Lê o localStorage uma única vez após a hidratação para que
 * os componentes cliente recebam o mesmo valor do servidor
 * na primeira renderização (evita divergência de hidratação).
 */
export function StorageHydrator() {
  useEffect(() => {
    favoritesStore.hydrate();
    progressStore.hydrate();
    historyStore.hydrate();

    function onStorage(event: StorageEvent) {
      if (event.key === favoritesStore.key) favoritesStore.hydrate();
      if (event.key === progressStore.key) progressStore.hydrate();
      if (event.key === historyStore.key) historyStore.hydrate();
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return null;
}
