"use client";

import { useSyncExternalStore } from "react";

type Listener = () => void;

export interface LocalStore<T> {
  key: string;
  initial: T;
  get: () => T;
  set: (updater: (prev: T) => T) => void;
  subscribe: (listener: Listener) => () => void;
  hydrate: () => void;
  hasHydrated: () => boolean;
}

export function createStore<T>(key: string, initial: T): LocalStore<T> {
  let state: T = initial;
  let hydrated = false;
  const listeners = new Set<Listener>();

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const read = (): T => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return initial;
      return JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  };

  const hydrate = (force = false) => {
    if (hydrated && !force) return;
    hydrated = true;
    state = read();
    notify();
  };

  const set = (updater: (prev: T) => T) => {
    state = updater(state);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch {
        // localStorage indisponível (modo privado): apenas ignora.
      }
    }
    notify();
  };

  return {
    key,
    initial,
    get: () => state,
    set,
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    hydrate: () => hydrate(false),
    hasHydrated: () => hydrated,
  };
}

export function useLocalStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(
    store.subscribe,
    store.get,
    () => store.initial,
  );
}
