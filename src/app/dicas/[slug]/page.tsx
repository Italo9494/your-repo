import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FavoriteButton } from "@/components/FavoriteButton";
import { JsonLd } from "@/components/JsonLd";
import { TipCard } from "@/components/TipCard";
import { getTip, getTips } from "@/lib/content";
import { relatedTips } from "@/lib/related";
import { pillTone } from "@/lib/color";
import { formatDate, ogImages } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getTips().map((tip) => ({ slug: tip.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tip = getTip(slug);
  if (!tip) notFound();

  const description = `${tip.summary} ${tip.readTime} minutos de leitura.`;

  return {
    title: tip.title,
    description,
    alternates: { canonical: `/dicas/${tip.slug}` },
    openGraph: {
      images: ogImages(),
      title: `${tip.title} | PokéDetonado`,
      description: tip.summary,
      url: `/dicas/${tip.slug}`,
      type: "article",
    },
  };
}

export default async function TipPage({ params }: PageProps) {
  const { slug } = await params;
  const tip = getTip(slug);
  if (!tip) notFound();

  const others = relatedTips(tip, 3);
  const tone = pillTone(tip.colors);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Dicas", href: "/dicas" },
          { label: tip.title },
        ]}
      />

      <JsonLd
        data={articleJsonLd({
          title: tip.title,
          description: tip.summary,
          path: `/dicas/${tip.slug}`,
          datePublished: tip.date,
          dateModified: tip.updatedAt ?? tip.date,
          image: "/opengraph-image",
        })}
      />

      <article className="mt-5">
        <header className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`relative isolate inline-flex overflow-hidden rounded-full px-2.5 py-1 text-xs font-bold ${tone.className}`}
              style={{
                backgroundImage: `linear-gradient(135deg, ${tip.colors[0]}, ${tip.colors[1]})`,
              }}
            >
              {tone.scrim > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ backgroundColor: `rgba(0, 0, 0, ${tone.scrim.toFixed(2)})` }}
                />
              )}
              <span className="relative">{tip.category}</span>
            </span>
            <Badge tone="neutral">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {tip.readTime} min
              </span>
            </Badge>
            <Badge tone="neutral">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(tip.date)}
              </span>
            </Badge>
            <span className="ml-auto">
              <FavoriteButton kind="guides" value={`dica:${tip.slug}`} label={`Favoritar ${tip.title}`} />
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {tip.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted">{tip.summary}</p>
        </header>

        <div className="mt-8 space-y-8">
          {tip.sections.map((section) => (
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
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <nav aria-label="Voltar" className="mt-8">
          <Link
            href="/dicas"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Todas as dicas
          </Link>
        </nav>
      </article>

      <section className="mt-14">
        <h2 className="mb-5 text-xl font-bold text-ink">Dicas relacionadas</h2>
        <p className="mb-5 -mt-3 text-sm text-muted">
          Começa pela mesma categoria ({tip.category}) e completa com as mais lidas do portal.
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {others.map((item) => (
            <TipCard key={item.slug} tip={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
