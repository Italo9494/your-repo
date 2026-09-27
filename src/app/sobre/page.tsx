import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Heart, Layers, Zap } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre o PokéDetonado",
  description:
    "Conheça o projeto PokéDetonado: um portal independente de detonados, guias, mapas e dicas dos jogos de Pokémon em português do Brasil.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    images: ogImages(),
    title: "Sobre o PokéDetonado",
    description:
      "Portal independente com detonados, guias, mapas e dicas dos jogos de Pokémon.",
    url: "/sobre",
    type: "website",
  },
};

const values = [
  {
    icon: Compass,
    title: "Rota clara",
    text: "Cada etapa diz o objetivo, o caminho recomendado e o que você encontra pelo caminho.",
  },
  {
    icon: Layers,
    title: "Estrutura previsível",
    text: "Todos os detonados seguem o mesmo modelo: intro, objetivo, caminho, itens, treinadores e dicas.",
  },
  {
    icon: Heart,
    title: "Feito para quem joga",
    text: "Progresso salvo no navegador, favoritos e navegação entre etapas sem perder o fio.",
  },
  {
    icon: Zap,
    title: "Leve no celular",
    text: "Páginas rápidas, menus adaptados e textos confortáveis em qualquer tela.",
  },
];

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Sobre" }]} />

      <header className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">O projeto</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Sobre o PokéDetonado
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          O PokéDetonado nasceu de uma ideia simples: reunir, em português, os guias que
          fariam falta quando alguém trava no meio de uma rota. Aqui você encontra
          detonados passo a passo, mapas das regiões, artigos de captura e evolução e
          dicas curtas para o dia a dia do jogo.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {values.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-line bg-surface p-6 shadow-soft"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-line bg-surface p-6 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Como o conteúdo é produzido</h2>
        <div className="mt-3 space-y-4 text-base leading-relaxed text-muted">
          <p>
            Todos os textos são escritos originalmente para este projeto, a partir da
            experiência com os jogos da franquia. Não reproduzimos guias de outros sites
            nem copiamos descrições oficiais.
          </p>
          <p>
            As imagens de capa são ilustrações próprias, geradas por código. Quando uma
            arte própria for adicionada, ela apenas substitui o campo de imagem do jogo
            correspondente na base de dados, sem alterar o layout das páginas.
          </p>
          <p>
            O progresso e os favoritos ficam salvos apenas no seu navegador. Nenhum dado
            pessoal é coletado ou enviado para servidores.
          </p>
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/detonados"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-red-dark"
        >
          Ver detonados
        </Link>
        <Link
          href="/contato"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
        >
          Fale com o projeto
        </Link>
      </section>
    </div>
  );
}
