import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideExplorer } from "@/components/GuideExplorer";
import { guideCategories } from "@/data/guides";
import { getGuides } from "@/lib/content";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guias de Pokémon — iniciantes, captura, evolução e batalhas",
  description:
    "Guias práticos sobre captura, evolução, batalhas, itens, ginásios, Elite Four e pós-jogo nos jogos de Pokémon.",
  alternates: { canonical: "/guias" },
  openGraph: {
    images: ogImages(),
    title: "Guias de Pokémon | PokéDetonado",
    description:
      "Guias práticos de captura, evolução, batalhas, itens, ginásios e pós-jogo.",
    url: "/guias",
    type: "website",
  },
};

export default function GuiasPage() {
  const guides = getGuides();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Guias" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Artigos</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Guias de Pokémon
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Artigos objetivos para resolver dúvidas específicas: da escolha do inicial à
          preparação para a Elite Four, com exemplos aplicados a vários jogos da franquia.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="order-2 lg:order-1">
          <GuideExplorer guides={guides} />
        </div>

        <aside className="order-1 rounded-3xl border border-line bg-surface p-5 shadow-soft lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Categorias</h2>
            <Link
              href="/categorias"
              className="text-xs font-semibold text-brand-blue transition hover:text-brand-blue-dark"
            >
              Ver todas
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {guideCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categorias/${category.slug}`}
                  className="group block rounded-2xl px-2 py-1.5 transition hover:bg-canvas"
                >
                  <p className="text-sm font-semibold text-ink transition group-hover:text-brand-blue">
                    {category.name}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {category.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
