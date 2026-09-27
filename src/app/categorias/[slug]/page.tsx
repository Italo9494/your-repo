import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, MessageSquareText } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { GuideCard } from "@/components/GuideCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TipCard } from "@/components/TipCard";
import {
  getAllCategories,
  getCategoryBySlug,
  getCategoryGuides,
  getCategoryTips,
} from "@/lib/categories";
import { ogImages } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return {
    title: `Categoria ${category.name} — guias e dicas de Pokémon`,
    description: category.description,
    alternates: { canonical: `/categorias/${category.slug}` },
    openGraph: {
      images: ogImages(),
      title: `${category.name} | PokéDetonado`,
      description: category.description,
      url: `/categorias/${category.slug}`,
      type: "website",
    },
  };
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryGuides = getCategoryGuides(slug);
  const categoryTips = getCategoryTips(slug);
  const others = getAllCategories()
    .filter((item) => item.slug !== slug)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Categorias", href: "/categorias" },
          { label: category.name },
        ]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Categoria</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{category.description}</p>

        <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {category.guideCount} {category.guideCount === 1 ? "guia" : "guias"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5">
            <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
            {category.tipCount} {category.tipCount === 1 ? "dica" : "dicas"}
          </span>
        </div>
      </header>

      {categoryGuides.length > 0 && (
        <section className="mt-10">
          <SectionHeading
            eyebrow="Guias completos"
            title={`Guias de ${category.name}`}
            description="Artigos passo a passo com exemplos aplicados a vários jogos."
            href="/guias"
            linkLabel="Todos os guias"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {categoryTips.length > 0 && (
        <section className="mt-12">
          <SectionHeading
            eyebrow="Dicas rápidas"
            title={`Dicas de ${category.name}`}
            description="Leituras curtas para aplicar já na próxima sessão."
            href="/dicas"
            linkLabel="Todas as dicas"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryTips.map((tip) => (
              <TipCard key={tip.slug} tip={tip} />
            ))}
          </div>
        </section>
      )}

      {categoryGuides.length === 0 && categoryTips.length === 0 && (
        <div className="mt-10">
          <EmptyState
            title="Categoria sem conteúdo"
            description="Ainda não publicamos artigos nesta categoria. Escolha outra opção abaixo."
            actionLabel="Ver todas as categorias"
            actionHref="/categorias"
          />
        </div>
      )}

      <section className="mt-14">
        <SectionHeading eyebrow="Continue explorando" title="Outras categorias" />
        <div className="flex flex-wrap gap-2">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/categorias/${item.slug}`}
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
            >
              {item.name}
              <span className="ml-1.5 text-xs text-muted">{item.total}</span>
            </Link>
          ))}
        </div>
      </section>

      <nav aria-label="Voltar" className="mt-10">
        <Link
          href="/categorias"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Todas as categorias
        </Link>
      </nav>
    </div>
  );
}
