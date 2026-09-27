"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, History, Trash2 } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import {
  clearHistory,
  clearSearches,
  kindLabels,
  useHistory,
} from "@/lib/history";

function formatWhen(at: number): string {
  const diff = Date.now() - at;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "agora mesmo";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "ontem";
  if (days < 7) return `há ${days} dias`;
  return new Date(at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function HistoryList() {
  const history = useHistory();

  if (history.entries.length === 0 && history.searches.length === 0) {
    return (
      <EmptyState
        icon="search"
        title="Nenhuma página visitada ainda"
        description="Navegue pelo site e volte aqui para retomar detonados, guias e páginas que você visitou."
        actionLabel="Explorar detonados"
        actionHref="/detonados"
      />
    );
  }

  return (
    <div className="space-y-10">
      <section aria-labelledby="historico-paginas">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 id="historico-paginas" className="text-xl font-bold text-ink">
            Páginas visitadas
            <span className="ml-2 text-sm font-medium text-muted">
              {history.entries.length} de 40
            </span>
          </h2>
          {history.entries.length > 0 && (
            <button
              type="button"
              onClick={() => clearHistory()}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted transition hover:border-brand-red hover:text-brand-red"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Limpar histórico
            </button>
          )}
        </div>

        {history.entries.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line bg-surface px-5 py-6 text-sm text-muted">
            Seu histórico de páginas está vazio.
          </p>
        ) : (
          <ul className="grid gap-3">
            {history.entries.map((entry) => (
              <li key={entry.href}>
                <div className="group flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft transition hover:border-brand-blue">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas text-muted">
                    <History className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <Link
                        href={entry.href}
                        className="truncate font-bold text-ink transition hover:text-brand-blue"
                      >
                        {entry.title}
                      </Link>
                      <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-muted">
                        {kindLabels[entry.kind]}
                      </span>
                    </span>
                    <span className="mt-1 flex items-center gap-2 text-xs text-muted">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatWhen(entry.at)}
                    </span>
                  </span>
                  <Link
                    href={entry.href}
                    aria-label={`Abrir ${entry.title}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition group-hover:border-brand-blue group-hover:text-brand-blue"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="historico-buscas">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 id="historico-buscas" className="text-xl font-bold text-ink">
            Buscas recentes
          </h2>
          {history.searches.length > 0 && (
            <button
              type="button"
              onClick={() => clearSearches()}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted transition hover:border-brand-red hover:text-brand-red"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Limpar buscas
            </button>
          )}
        </div>

        {history.searches.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line bg-surface px-5 py-6 text-sm text-muted">
            Nenhuma busca registrada.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {history.searches.map((term) => (
              <Link
                key={term}
                href={`/pesquisa?q=${encodeURIComponent(term)}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
              >
                {term}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
