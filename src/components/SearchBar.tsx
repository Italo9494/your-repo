"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";
import { Search } from "lucide-react";

import { recordSearch } from "@/lib/history";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  large?: boolean;
}

export function SearchBar({
  className = "",
  autoFocus = false,
  defaultValue = "",
  large = false,
}: SearchBarProps) {
  const router = useRouter();
  const inputId = useId();
  const [value, setValue] = useState(defaultValue);
  const canSubmit = value.trim().length >= 2;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    if (query.length < 2) return;
    recordSearch(query);
    router.push(`/pesquisa?q=${encodeURIComponent(query)}`);
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className}`}
    >
      <label htmlFor={inputId} className="sr-only">
        Pesquisar no site
      </label>
      <div className="relative flex-1">
        <Search
          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted ${
            large ? "h-5 w-5" : "h-4 w-4"
          }`}
          aria-hidden="true"
        />
        <input
          id={inputId}
          type="search"
          name="q"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Pesquisar detonados, guias, Pokémon..."
          autoComplete="off"
          autoFocus={autoFocus}
          className={`w-full rounded-full border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted transition focus:border-brand-blue focus:bg-surface focus:outline-none ${
            large ? "py-3.5 text-base" : "py-2.5"
          }`}
        />
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className={`shrink-0 rounded-full bg-brand-blue font-semibold text-white transition hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-40 ${
          large ? "px-5 py-3.5" : "px-4 py-2.5"
        }`}
      >
        <span className="sr-only sm:not-sr-only">Buscar</span>
        <Search className="h-4 w-4 sm:hidden" aria-hidden="true" />
      </button>
    </form>
  );
}
