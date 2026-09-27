import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Gamepad2, MapPin, Navigation } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CoverArt } from "@/components/CoverArt";
import { getGame } from "@/data/games";
import { getWalkthroughByGame } from "@/lib/content";
import { getMap, maps } from "@/data/maps";
import { ogImages } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return maps.map((map) => ({ slug: map.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const map = getMap(slug);
  if (!map) notFound();

  const title = `${map.name} — locais e pontos importantes`;
  const description = `${map.summary} Confira a lista completa de cidades, rotas e pontos de interesse de ${map.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/mapas/${map.slug}` },
    openGraph: {
      images: ogImages(),
      title: `${title} | PokéDetonado`,
      description,
      url: `/mapas/${map.slug}`,
      type: "website",
    },
  };
}

export default async function MapDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const map = getMap(slug);
  if (!map) notFound();

  const game = getGame(map.gameSlug);
  const walkthrough = game ? getWalkthroughByGame(game.slug) : undefined;
  const others = maps.filter((item) => item.slug !== map.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Mapas", href: "/mapas" },
          { label: map.name },
        ]}
      />

      <section className="mt-5 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="red">{map.region}</Badge>
            {game && <Badge tone="blue">{game.name}</Badge>}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {map.name}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{map.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {game && (
              <Link
                href={`/jogos#${game.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
              >
                <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                {game.name}
              </Link>
            )}
            {walkthrough && walkthrough.chapters.length > 0 && (
              <Link
                href={`/detonado/${walkthrough.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-red-dark"
              >
                Ver detonado
              </Link>
            )}
          </div>
        </div>

        <CoverArt
          title={map.name}
          colors={map.colors}
          compact
          className="h-56 w-full rounded-3xl shadow-card"
          label={`Ilustração do ${map.name}`}
          sizes="(max-width: 1024px) 100vw, 360px"
        />
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
            <Navigation className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="text-xl font-bold text-ink sm:text-2xl">Locais importantes</h2>
        </div>

        <ol className="grid gap-3 md:grid-cols-2">
          {map.locations.map((location, index) => (
            <li
              key={location.name}
              className="flex items-start gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-xs font-bold text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
                  <MapPin className="h-4 w-4 text-brand-red" aria-hidden="true" />
                  {location.name}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">
                  {location.note}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="mb-5 text-xl font-bold text-ink">Outras regiões</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/mapas/${item.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition hover:border-brand-blue"
            >
              <span>
                <span className="block text-xs font-semibold text-muted">{item.region}</span>
                <span className="block text-sm font-bold text-ink">{item.name}</span>
              </span>
              <ArrowLeft
                className="h-4 w-4 rotate-180 text-muted transition group-hover:text-brand-blue"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
