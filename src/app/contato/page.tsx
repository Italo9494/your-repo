import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Bug, Lightbulb } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o PokéDetonado para sugestões, correções de guias, parcerios ou avisos sobre conteúdo.",
  alternates: { canonical: "/contato" },
  openGraph: {
    images: ogImages(),
    title: "Contato | PokéDetonado",
    description: "Envie sugestões, correções ou dúvidas para a equipe do PokéDetonado.",
    url: "/contato",
    type: "website",
  },
};

const channels = [
  {
    icon: Lightbulb,
    title: "Sugestão de conteúdo",
    text: "Quer ver um jogo, região ou tema específico no site? Conte qual detonado falta para você.",
  },
  {
    icon: Bug,
    title: "Correção de guia",
    text: "Encontrou um caminho errado ou um item trocado em alguma etapa? Aponte o capítulo para corrigirmos.",
  },
  {
    icon: MessageSquare,
    title: "Dúvida sobre o site",
    text: "Dúvidas sobre favoritos, progresso ou navegação também são bem-vindas.",
  },
];

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Contato" }]} />

      <header className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Fale conosco</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Contato
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          O PokéDetonado é mantido por um time pequeno e responde todas as mensagens.
          Escolha o assunto para facilitar a triagem.
        </p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {channels.map((channel) => (
          <article
            key={channel.title}
            className="rounded-3xl border border-line bg-surface p-5 shadow-soft"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
              <channel.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-base font-bold text-ink">{channel.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{channel.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-line bg-surface p-6 shadow-soft">
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <Mail className="h-5 w-5 text-brand-blue" aria-hidden="true" />
          Canais oficiais
        </h2>

        <dl className="mt-4 space-y-4">
          <div className="border-b border-line pb-4">
            <dt className="text-sm font-semibold text-ink">E-mail</dt>
            <dd className="mt-1 text-sm text-muted">
              contato@pokedetonado.com.br — use no assunto o tipo de mensagem
              (sugestão, correção ou dúvida).
            </dd>
          </div>
          <div className="border-b border-line pb-4">
            <dt className="text-sm font-semibold text-ink">Prazo de resposta</dt>
            <dd className="mt-1 text-sm text-muted">
              Em até 5 dias úteis, na ordem de recebimento.
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-ink">Assuntos que não atendemos</dt>
            <dd className="mt-1 text-sm text-muted">
              Pedidos de roms, saves ou arquivos protegidos por direitos autorais.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-8 rounded-3xl border border-brand-yellow/60 bg-brand-yellow/10 p-6">
        <h2 className="text-lg font-bold text-ink">Antes de escrever</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          Confira se a resposta já está no guia correspondente. A maioria das dúvidas de
          rota está resolvida nas seções de caminho recomendado e dicas da etapa.
        </p>
        <Link
          href="/detonados"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue-dark"
        >
          Ir para os detonados
        </Link>
      </section>
    </div>
  );
}
