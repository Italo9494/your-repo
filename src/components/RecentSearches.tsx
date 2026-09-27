"use client";

import Link from "next/link";
import { History, Search, X } from "lucide-react";

import { clearSearches, useHistory } from "@/lib/history";

export function RecentSearches() {
  const history = useHistory();

  if (history.searches.length === 0) return null;

  return (
    <section aria-labelledby="buscas-recentes" className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2
          id="buscas-recentes"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted"
        >
          <History className="h-4 w-4" aria-hidden="true" />
          Buscas recentes
        </h2>
        <button
          type="button"
          onClick={() => clearSearches()}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition hover:text-brand-red"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Limpar
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.searches.map((term) => (
          <Link
            key={term}
            href={`/pesquisa?q=${encodeURIComponent(term)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            {term}
          </Link>
        ))}
      </div>
    </section>
  );
}
