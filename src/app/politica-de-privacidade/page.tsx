import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o PokéDetonado trata dados: armazenamento local no navegador, ausência de cadastro e uso de cookies de terceiros.",
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    images: ogImages(),
    title: "Política de Privacidade | PokéDetonado",
    description: "Saiba como seus dados são tratados ao navegar no PokéDetonado.",
    url: "/politica-de-privacidade",
    type: "article",
  },
};

const sections = [
  {
    heading: "Dados que armazenamos",
    paragraphs: [
      "O PokéDetonado não exige cadastro e não coleta nome, e-mail ou qualquer outro dado pessoal para você navegar no site.",
      "Suas preferências de uso — itens favoritos e etapas de detonados concluídas — são gravadas exclusivamente no armazenamento local do seu navegador, sob as chaves pokedetonado:favoritos e pokedetonado:progresso.",
    ],
  },
  {
    heading: "Finalidade do armazenamento local",
    paragraphs: [
      "Esses dados existem apenas para lembrar seu progresso entre visitas e exibir seus favoritos. Eles nunca são enviados para servidores, bases de dados externas ou serviços de terceiros.",
      "Você pode apagar esses informações a qualquer momento limpando os dados do site nas configurações do seu navegador. Ao fazer isso, favoritos e progresso voltam ao estado inicial.",
    ],
  },
  {
    heading: "Cookies e ferramentas de medição",
    paragraphs: [
      "O site não utiliza cookies de publicidade nem rastreamento comportamental. Se, no futuro, uma ferramenta de métricas de audiência for adicionada, esta política será atualizada com a data da alteração e o detalhamento do que é coletado.",
    ],
  },
  {
    heading: "Conteúdo de terceiros",
    paragraphs: [
      "Links para outras páginas do próprio site ou para sites externos seguem as políticas de privacidade desses destinos. Recomendamos ler as políticas de sites externos antes de fornecer qualquer dado.",
    ],
  },
  {
    heading: "Direitos do titular",
    paragraphs: [
      "Como não tratamos dados pessoais, não há processo de exclusão de cadastro. Ainda assim, dúvidas sobre privacidade podem ser enviadas pelo canal de contato do site.",
    ],
  },
  {
    heading: "Atualizações desta política",
    paragraphs: [
      "Esta página pode ser revisada para refletir mudanças no funcionamento do site. A versão vigente está sempre disponível em /politica-de-privacidade.",
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Política de Privacidade" },
        ]}
      />

      <header className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Legal</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Este documento explica, em linguagem direta, o que o PokéDetonado guarda e o que
          não guarda quando você usa o site.
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

      <p className="mt-10 rounded-2xl border border-line bg-surface p-5 text-sm text-muted">
        Última atualização: setembro de 2026.
      </p>
    </div>
  );
}
