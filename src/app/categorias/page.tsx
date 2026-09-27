import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, MessageSquareText } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { getAllCategories } from "@/lib/categories";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Categorias — guias e dicas por tema",
  description:
    "Explore o conteúdo do PokéDetonado por categoria: iniciantes, captura, evolução, batalhas, itens, ginásios, Elite Four, pós-jogo, segredos e dicas rápidas.",
  alternates: { canonical: "/categorias" },
  openGraph: {
    images: ogImages(),
    title: "Categorias de conteúdo | PokéDetonado",
    description: "Guias e dicas organizados por tema para achar rápido o que você precisa.",
    url: "/categorias",
    type: "website",
  },
};

const kindBadge: Record<string, string> = {
  guia: "bg-brand-blue/10 text-brand-blue-dark",
  dica: "bg-orange-100 text-orange-700",
  misto: "bg-brand-green/10 text-[#1f6d38]",
};

const kindLabel: Record<string, string> = {
  guia: "Guias e dicas",
  dica: "Só dicas",
  misto: "Guias e dicas",
};

export default function CategoriasPage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Categorias" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
          Organização
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Categorias
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Todo o conteúdo do portal separado por tema. Entre por uma categoria para ver os
          guias completos e as dicas rápidas do assunto.
        </p>
      </header>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {categories.length} categorias disponíveis
      </p>

      {categories.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="Nenhuma categoria"
            description="Assim que publicarmos novos artigos, as categorias aparecem aqui."
          />
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/categorias/${category.slug}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface p-6 shadow-soft transition hover:border-brand-blue"
              >
                <span className="flex items-start justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      kindBadge[category.kind]
                    }`}
                  >
                    {kindLabel[category.kind]}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-muted transition group-hover:text-brand-blue"
                    aria-hidden="true"
                  />
                </span>

                <span className="text-xl font-bold text-ink transition group-hover:text-brand-blue">
                  {category.name}
                </span>

                <span className="text-sm leading-relaxed text-muted">
                  {category.description}
                </span>

                <span className="mt-auto flex flex-wrap gap-3 pt-2 text-xs font-semibold text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    {category.guideCount} {category.guideCount === 1 ? "guia" : "guias"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                    {category.tipCount} {category.tipCount === 1 ? "dica" : "dicas"}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
