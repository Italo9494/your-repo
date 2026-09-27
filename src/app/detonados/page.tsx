import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { WalkthroughCard } from "@/components/WalkthroughCard";
import { EmptyState, InlineNote } from "@/components/EmptyState";
import { FeaturedWalkthroughs } from "@/components/FeaturedWalkthroughs";
import { ResumeCard } from "@/components/ResumeButton";
import { getWalkthroughs } from "@/lib/content";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Detonados de Pokémon — guias completos passo a passo",
  description:
    "Lista de todos os detonados do PokéDetonado, com número de etapas, dificuldade e progresso salvo no navegador.",
  alternates: { canonical: "/detonados" },
  openGraph: {
    images: ogImages(),
    title: "Detonados de Pokémon — guias completos | PokéDetonado",
    description:
      "Acesse os detonados passo a passo com etapas, itens, dicas e progresso salvo.",
    url: "/detonados",
    type: "website",
  },
};

export default function DetonadosPage() {
  const walkthroughs = getWalkthroughs();
  const available = walkthroughs.filter((item) => item.chapters.length > 0);
  const planned = walkthroughs.filter((item) => item.chapters.length === 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Detonados" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Walkthroughs</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Detonados de Pokémon
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Escolha o jogo, siga as etapas na ordem e marque cada capítulo concluído. O
          progresso fica salvo no seu navegador e você pode voltar de onde parou a
          qualquer momento.
        </p>
      </header>

      <div className="mt-6 max-w-2xl">
        <ResumeCard />
      </div>

      <section className="mt-8">
        <SectionHeading
          eyebrow="Disponíveis agora"
          title="Guias com etapas publicadas"
          description="Detonados com conteúdo completo para acompanhar capítulo a capítulo."
        />
        <FeaturedWalkthroughs items={available} />
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Em produção"
          title="Detonados planejados"
          description="Jogos que já têm página própria com a estrutura de capítulos prevista."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {planned.map((walkthrough) => (
            <WalkthroughCard
              key={walkthrough.slug}
              walkthrough={walkthrough}
              completedSlugs={[]}
            />
          ))}
        </div>
      </section>

      <div className="mt-10">
        <InlineNote>
          Novos capítulos entram toda semana. Se o seu jogo favorito ainda não tem etapas
          publicadas, favorite a página para receber a versão completa assim que ela sair.
        </InlineNote>
      </div>

      {planned.length === 0 && (
        <EmptyState
          title="Nenhum detonado em produção"
          description="Todos os jogos do catálogo já possuem etapas publicadas."
        />
      )}
    </div>
  );
}
