import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HistoryList } from "@/components/HistoryList";
import { ResumeCard } from "@/components/ResumeButton";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Histórico — páginas visitadas e buscas recentes",
  description:
    "Veja as páginas que você visitou no PokéDetonado, retome detonados de onde parou e repita buscas recentes. Tudo salvo apenas no seu navegador.",
  alternates: { canonical: "/historico" },
  robots: { index: false, follow: true },
  openGraph: {
    images: ogImages(),
    title: "Histórico de navegação | PokéDetonado",
    description: "Páginas visitadas e buscas recentes salvas no seu navegador.",
    url: "/historico",
    type: "website",
  },
};

export default function HistoricoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Histórico" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Navegação</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Histórico
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Suas últimas páginas visitadas e buscas recentes. Tudo fica salvo apenas no seu
          navegador (localStorage) e pode ser apagado a qualquer momento.
        </p>
      </header>

      <div className="mt-6">
        <ResumeCard />
      </div>

      <div className="mt-10">
        <HistoryList />
      </div>
    </div>
  );
}
