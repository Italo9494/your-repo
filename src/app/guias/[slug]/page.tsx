import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FavoriteButton } from "@/components/FavoriteButton";
import { GameCard } from "@/components/GameCard";
import { GuideCard } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { InlineNote } from "@/components/EmptyState";
import { getCategory } from "@/data/guides";
import { getGame } from "@/data/games";
import { getGuide, getGuides, getWalkthroughs } from "@/lib/content";
import { relatedGuides } from "@/lib/related";
import { formatDate, ogImages } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: `/guias/${guide.slug}` },
    openGraph: {
      images: ogImages(),
      title: `${guide.title} | PokéDetonado`,
      description: guide.summary,
      url: `/guias/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const category = getCategory(guide.category);
  const suggestions = relatedGuides(guide, 3);
  const walkthroughs = getWalkthroughs();
  const relatedGameCards = guide.gameSlugs
    .map((slug) => getGame(slug))
    .filter((game): game is NonNullable<typeof game> => Boolean(game))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Guias", href: "/guias" },
          { label: guide.title },
        ]}
      />

      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.summary,
          path: `/guias/${guide.slug}`,
          datePublished: guide.date,
          dateModified: guide.updatedAt ?? guide.date,
          image: "/opengraph-image",
        })}
      />

      <article className="mt-5">
        <header className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{category?.name}</Badge>
            <Badge tone="neutral">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {guide.readTime} min de leitura
              </span>
            </Badge>
            <Badge tone="neutral">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(guide.date)}
              </span>
            </Badge>
            <span className="ml-auto">
              <FavoriteButton kind="guides" value={guide.slug} label={`Favoritar ${guide.title}`} />
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {guide.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted">{guide.summary}</p>

          {guide.gameSlugs.length > 0 && (
            <p className="mt-4 text-sm text-muted">
              <span className="font-semibold text-ink">Jogos citados:</span>{" "}
              {guide.gameSlugs
                .map((gameSlug) => getGame(gameSlug)?.name)
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
        </header>

        <div className="mt-8 space-y-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-ink sm:text-2xl">{section.heading}</h2>
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-red"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10">
          <InlineNote>
            Conteúdo original escrito para o PokéDetonado. Se este guia te ajudou, marque
            como favorito para encontrá-lo rápido no menu Favoritos.
          </InlineNote>
        </div>

        <nav aria-label="Voltar" className="mt-8">
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Todos os guias
          </Link>
        </nav>
      </article>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Artigos relacionados"
          title="Continue lendo"
          description="Mesma categoria e jogos citados neste guia."
          href="/guias"
          linkLabel="Todos os guias"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {suggestions.map((item) => (
            <GuideCard key={item.slug} guide={item} />
          ))}
        </div>
      </section>

      {relatedGameCards.length > 0 && (
        <section className="mt-12">
          <SectionHeading
            eyebrow="Jogos relacionados"
            title="Jogos citados neste guia"
            description="Abra o detonado do jogo em que você está jogando agora."
            href="/jogos"
            linkLabel="Ver todos os jogos"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {relatedGameCards.map((item) => (
              <GameCard
                key={item.slug}
                game={item}
                hasWalkthrough={walkthroughs.some(
                  (entry) => entry.gameSlug === item.slug && entry.chapters.length > 0,
                )}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
