import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentList } from "@/components/ContentList";
import { EmptyState } from "@/components/EmptyState";
import { RecentSearches } from "@/components/RecentSearches";
import { SearchBar } from "@/components/SearchBar";
import { getGuides, getTips, getWalkthroughs } from "@/lib/content";
import { groupResults, kindLabel, searchAll, type SearchKind } from "@/lib/search";
import { popularItems } from "@/lib/rankings";
import { ogImages } from "@/lib/seo";

interface PageProps {
  searchParams: Promise<{ q?: string; tipo?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  return {
    title: query ? `Pesquisa por “${query}”` : "Pesquisa",
    description: query
      ? `Resultados da pesquisa por “${query}” em detonados, guias, mapas, dicas e Pokémon.`
      : "Pesquise por jogos, detonados, guias, mapas, dicas e Pokémon.",
    alternates: { canonical: "/pesquisa" },
    robots: { index: false, follow: true },
    openGraph: {
      images: ogImages(),
      title: query ? `Pesquisa por “${query}” | PokéDetonado` : "Pesquisa | PokéDetonado",
      description: "Busca global do PokéDetonado.",
      url: "/pesquisa",
      type: "website",
    },
  };
}

const toneByKind: Record<SearchKind, string> = {
  pokemon: "bg-brand-yellow/25 text-[#7a5c00]",
  detonado: "bg-brand-red/10 text-brand-red-dark",
  guia: "bg-brand-blue/10 text-brand-blue-dark",
  jogo: "bg-brand-green/10 text-[#1f6d38]",
  mapa: "bg-purple-100 text-purple-700",
  dica: "bg-orange-100 text-orange-700",
};

const filterOptions: { kind: SearchKind | "todos"; label: string }[] = [
  { kind: "todos", label: "Tudo" },
  { kind: "detonado", label: "Detonados" },
  { kind: "guia", label: "Guias" },
  { kind: "pokemon", label: "Pokémon" },
  { kind: "jogo", label: "Jogos" },
  { kind: "mapa", label: "Mapas" },
  { kind: "dica", label: "Dicas" },
];

function Highlight({ text, query }: { text: string; query: string }) {
  const term = query.trim();
  if (term.length < 2) return <>{text}</>;
  const index = text.toLowerCase().indexOf(term.toLowerCase());
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-brand-yellow/40 px-0.5 text-ink">
        {text.slice(index, index + term.length)}
      </mark>
      {text.slice(index + term.length)}
    </>
  );
}

function buildHref(query: string, tipo: string): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (tipo && tipo !== "todos") params.set("tipo", tipo);
  const search = params.toString();
  return search ? `/pesquisa?${search}` : "/pesquisa";
}

export default async function PesquisaPage({ searchParams }: PageProps) {
  const { q, tipo } = await searchParams;
  const query = (q ?? "").trim();
  const activeKind = (tipo ?? "todos") as SearchKind | "todos";

  const allResults = searchAll(query);
  const results =
    activeKind === "todos" ? allResults : allResults.filter((item) => item.kind === activeKind);
  const grouped = groupResults(results);
  const order = ["pokemon", "detonado", "guia", "jogo", "mapa", "dica"] as const;
  const popular = popularItems(6, ["detonado", "guia", "pokemon", "dica"], {
    guides: getGuides(),
    tips: getTips(),
    walkthroughs: getWalkthroughs(),
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Pesquisa" }]} />

      <header className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Busca global</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {query ? `Resultados para “${query}”` : "Pesquisar no PokéDetonado"}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          A busca varre Pokémon, detonados, guias, jogos, mapas e dicas de uma só vez — e
          funciona com ou sem acento.
        </p>
      </header>

      <div className="mt-6">
        <SearchBar defaultValue={query} large />
      </div>

      <nav aria-label="Filtrar por tipo de conteúdo" className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 pr-1 text-xs font-bold uppercase tracking-wider text-muted">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          Tipo
        </span>
        {filterOptions.map((option) => {
          const active = activeKind === option.kind;
          return (
            <Link
              key={option.kind}
              href={buildHref(query, option.kind)}
              aria-current={active ? "true" : undefined}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                active
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-line bg-surface text-muted hover:border-brand-blue/50 hover:text-brand-blue"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </nav>

      {query.length < 2 && (
        <>
          <RecentSearches />
          <section className="mt-8" aria-labelledby="sugestoes-populares">
            <div className="mb-4 flex items-center gap-3">
              <h2 id="sugestoes-populares" className="text-lg font-bold text-ink">
                Enquanto isso, veja o mais lido
              </h2>
              <span className="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-semibold text-muted">
                {popular.length}
              </span>
            </div>
            <ContentList items={popular} />
          </section>
        </>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="mt-8">
          <EmptyState
            icon="search"
            title="Nenhum resultado encontrado"
            description={`Não encontramos nada para “${query}”${
              activeKind !== "todos" ? ` no tipo ${kindLabel(activeKind)}` : ""
            }. Tente outro termo ou troque o filtro de tipo.`}
            actionLabel="Ver tudo"
            actionHref={buildHref(query, "todos")}
          />
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 space-y-10">
          <p className="text-sm text-muted" aria-live="polite">
            {results.length === 1
              ? "1 resultado encontrado"
              : `${results.length} resultados encontrados`}
            {activeKind !== "todos" && ` em ${kindLabel(activeKind)}`}
          </p>

          {order.map((kind) => {
            const items = grouped[kind];
            if (items.length === 0) return null;
            return (
              <section key={kind} aria-labelledby={`grupo-${kind}`}>
                <div className="mb-4 flex items-center gap-3">
                  <h2 id={`grupo-${kind}`} className="text-lg font-bold text-ink">
                    {kindLabel(kind)}
                  </h2>
                  <span className="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-semibold text-muted">
                    {items.length}
                  </span>
                </div>

                <ul className="grid gap-3">
                  {items.map((result) => (
                    <li key={`${result.kind}-${result.href}`}>
                      <Link
                        href={result.href}
                        className="group flex items-start gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft transition hover:border-brand-blue"
                      >
                        <span
                          className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-bold sm:inline-flex ${
                            toneByKind[result.kind]
                          }`}
                        >
                          {kindLabel(result.kind)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold text-ink group-hover:text-brand-blue">
                            <Highlight text={result.title} query={query} />
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">
                            <Highlight text={result.description} query={query} />
                          </span>
                          {result.meta && (
                            <span className="mt-2 block text-xs font-semibold text-muted">
                              {result.meta}
                            </span>
                          )}
                        </span>
                        <ArrowUpRight
                          className="mt-1 h-5 w-5 shrink-0 text-muted transition group-hover:text-brand-blue"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {query.length >= 2 && results.length > 0 && (
        <p className="mt-10 flex items-center gap-2 text-sm text-muted">
          <Search className="h-4 w-4" aria-hidden="true" />
          Não encontrou o que procurava? Ajuste o termo, troque o tipo de conteúdo ou pesquise
          de novo.
        </p>
      )}
    </div>
  );
}
