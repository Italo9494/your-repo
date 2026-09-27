import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Layers, MapPin } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CoverArt } from "@/components/CoverArt";
import { FavoriteButton } from "@/components/FavoriteButton";
import { TypeChip } from "@/components/PokemonCard";
import { getFamily, getPokemon, pokemonList } from "@/data/pokemon";
import { relatedPokemon } from "@/lib/related";
import { ogImages } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return pokemonList.map((pokemon) => ({ slug: pokemon.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pokemon = getPokemon(slug);
  if (!pokemon) notFound();

  const title = `${pokemon.name} — Pokédex, tipos e evolução`;
  const description = `${pokemon.name} (Nº ${String(pokemon.dex).padStart(3, "0")}) — ${pokemon.types.join(", ")}, região de ${pokemon.region}. ${pokemon.description}`;

  return {
    title,
    description,
    alternates: { canonical: `/pokemon/${pokemon.slug}` },
    openGraph: {
      images: ogImages(),
      title: `${title} | PokéDetonado`,
      description,
      url: `/pokemon/${pokemon.slug}`,
      type: "profile",
    },
  };
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pokemon = getPokemon(slug);
  if (!pokemon) notFound();

  const family = getFamily(pokemon);
  const related = relatedPokemon(pokemon, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Pokémon", href: "/pokemon" },
          { label: pokemon.name },
        ]}
      />

      <section className="mt-5 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <CoverArt
            title={pokemon.name}
            colors={pokemon.colors}
            className="h-72 w-full rounded-3xl shadow-card"
            sizes="(max-width: 1024px) 100vw, 320px"
            label={`Ilustração de ${pokemon.name}`}
          />
          <div className="flex items-center justify-between rounded-3xl border border-line bg-surface px-5 py-4">
            <span className="text-sm font-semibold text-muted">
              Nº {String(pokemon.dex).padStart(3, "0")}
            </span>
            <FavoriteButton
              kind="pokemon"
              value={pokemon.slug}
              label={`Favoritar ${pokemon.name}`}
              size="md"
              showLabel
            />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{pokemon.region}</Badge>
            <Badge tone="yellow">{pokemon.generation}ª geração</Badge>
            <Badge tone="neutral">{pokemon.category}</Badge>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">{pokemon.name}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <TypeChip key={type} type={type} />
            ))}
          </div>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {pokemon.description}
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-4">
              <dt className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Região de origem
              </dt>
              <dd className="mt-1.5 text-sm font-semibold text-ink">{pokemon.region}</dd>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <dt className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                <Layers className="h-4 w-4" aria-hidden="true" />
                Categoria
              </dt>
              <dd className="mt-1.5 text-sm font-semibold text-ink">{pokemon.category}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">Método de evolução</h2>

        {family.length > 1 ? (
          <>
            <p className="mt-2 text-sm text-muted">
              Linha completa de {family[0].name} até {family[family.length - 1].name}.
            </p>
            <ol className="mt-5 grid gap-3 md:grid-cols-3">
              {family.map((member, index) => {
                const current = member.slug === pokemon.slug;
                return (
                  <li key={member.slug}>
                    <div
                      className={`flex h-full flex-col gap-2 rounded-3xl border p-5 ${
                        current
                          ? "border-brand-blue bg-brand-blue/5"
                          : "border-line bg-surface"
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-muted">
                        Estágio {index + 1}
                      </span>
                      <span className="text-lg font-bold text-ink">{member.name}</span>
                      <span className="text-sm leading-relaxed text-muted">{member.method}</span>
                      {current ? (
                        <span className="mt-auto text-xs font-semibold text-brand-blue">
                          Pokémon atual
                        </span>
                      ) : (
                        getPokemon(member.slug) && (
                          <Link
                            href={`/pokemon/${member.slug}`}
                            className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition hover:text-brand-blue-dark"
                          >
                            Ver página
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        )
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </>
        ) : (
          <p className="mt-3 rounded-2xl border border-line bg-surface p-5 text-sm text-muted">
            {family[0]?.method ?? "Sem evolução registrada na base atual."}
          </p>
        )}
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-ink sm:text-2xl">Pokémon relacionados</h2>
            <p className="mt-1 text-sm text-muted">
              Primeiro a linha de evolução, depois os de mesmo tipo e região.
            </p>
          </div>
          <Link
            href="/pokemon"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:text-brand-blue-dark"
          >
            Ver Pokédex
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/pokemon/${item.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition hover:border-brand-blue"
            >
              <span>
                <span className="block text-xs tabular-nums text-muted">
                  Nº {String(item.dex).padStart(3, "0")}
                </span>
                <span className="block text-sm font-bold text-ink">{item.name}</span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 text-muted transition group-hover:text-brand-blue"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
