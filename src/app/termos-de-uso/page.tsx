import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Regras de uso do PokéDetonado: finalidade do conteúdo, propriedade intelectual, limitações de responsabilidade e conduta.",
  alternates: { canonical: "/termos-de-uso" },
  openGraph: {
    images: ogImages(),
    title: "Termos de Uso | PokéDetonado",
    description: "Condições para utilizar o conteúdo publicado no PokéDetonado.",
    url: "/termos-de-uso",
    type: "article",
  },
};

const sections = [
  {
    heading: "Aceitação dos termos",
    paragraphs: [
      "Ao navegar no PokéDetonado, você concorda com as condições abaixo. Caso não concorde, o uso do site não é recomendado.",
    ],
  },
  {
    heading: "Finalidade do site",
    paragraphs: [
      "O PokéDetonado publica detonados, guias, mapas e dicas sobre jogos da franquia Pokémon, com caráter informativo e educativo. O conteúdo é escrito originalmente para este projeto.",
    ],
  },
  {
    heading: "Propriedade intelectual",
    paragraphs: [
      "Os textos, a estrutura do site e as ilustrações geradas são de responsabilidade do projeto. Marcas, nomes de jogos e personagens pertencem a seus respectivos detentores e são citados apenas com finalidade descritiva.",
      "O site é independente e não possui afiliação oficial com a Nintendo, The Pokémon Company ou Game Freak.",
    ],
  },
  {
    heading: "Uso do conteúdo",
    paragraphs: [
      "É permitido citar trechos com atribuição e link para a página original. A reprodução integral dos guias, sem autorização, não é permitida.",
      "É vedado usar o conteúdo para treinar modelos de forma automatizada, republicar em escala ou comercializar sem acordo prévio.",
    ],
  },
  {
    heading: "Limitação de responsabilidade",
    paragraphs: [
      "Os guias são elaborados com cuidado, mas podem conter erros ou desatualizações. O projeto não se responsabiliza por perdas de progresso em partidas, decisões tomadas com base no conteúdo ou indisponibilidade temporária do site.",
      "Funcionalidades de favoritos e progresso dependem do armazenamento local do navegador e podem ser perdidas ao limpar dados do site.",
    ],
  },
  {
    heading: "Conduta",
    paragraphs: [
      "Mensagens enviadas pelo canal de contato devem respeitar terceiros. Conteúdo ofensivo, spam ou tentativas de violação de segurança poderão ser ignorados.",
    ],
  },
  {
    heading: "Alterações",
    paragraphs: [
      "Estes termos podem ser atualizados a qualquer momento. A versão vigente fica disponível em /termos-de-uso.",
    ],
  },
];

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Termos de Uso" }]} />

      <header className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Legal</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Termos de Uso
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Condições que regem a navegação e o uso do conteúdo publicado no PokéDetonado.
        </p>
      </header>

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/sobre"
          className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
        >
          Sobre o projeto
        </Link>
        <Link
          href="/contato"
          className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue-dark"
        >
          Fale conosco
        </Link>
      </div>
    </div>
  );
}
