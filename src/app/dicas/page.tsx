import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeading } from "@/components/SectionHeading";
import { TipCard } from "@/components/TipCard";
import { categorySlug } from "@/lib/categories";
import { getTips } from "@/lib/content";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Dicas de Pokémon — truques práticos para o dia a dia do jogo",
  description:
    "Artigos curtos com dicas de exploração, treino, captura, organização e preparação para ginásios nos jogos de Pokémon.",
  alternates: { canonical: "/dicas" },
  openGraph: {
    images: ogImages(),
    title: "Dicas de Pokémon | PokéDetonado",
    description: "Dicas curtas e práticas para atravessar rotas, treinar e capturar melhor.",
    url: "/dicas",
    type: "website",
  },
};

export default function DicasPage() {
  const tips = getTips();
  const categories = Array.from(new Set(tips.map((tip) => tip.category)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Dicas" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Atalhos</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Dicas de Pokémon
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Leituras rápidas para resolver problemas comuns: economizar PP, treinar melhor,
          capturar sem perder tempo e evitar os erros mais frequentes da franquia.
        </p>
      </header>

      <nav aria-label="Categorias de dicas" className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/categorias"
          className="rounded-full border border-brand-blue bg-brand-blue px-4 py-2 text-sm font-semibold text-white"
        >
          Todas as categorias
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categorias/${categorySlug(category)}`}
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
          >
            {category}
            <span className="ml-1.5 text-xs font-medium text-muted">
              {tips.filter((tip) => tip.category === category).length}
            </span>
          </Link>
        ))}
      </nav>

      <section className="mt-10">
        <SectionHeading
          eyebrow={`${tips.length} artigos`}
          title="Todas as dicas"
          description="Ordenadas da mais recente para a mais antiga."
        />

        {tips.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tips.map((tip) => (
              <TipCard key={tip.slug} tip={tip} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhuma dica publicada"
            description="Novos artigos serão adicionados em breve."
          />
        )}
      </section>
    </div>
  );
}
