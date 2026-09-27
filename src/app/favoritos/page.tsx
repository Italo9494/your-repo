import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FavoritesDashboard } from "@/components/FavoritesDashboard";
import { getGuides, getTips, getWalkthroughs } from "@/lib/content";
import { ogImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Seus favoritos e progresso",
  description:
    "Jogos, guias, Pokémon e etapas de detonados marcados como favoritos, além do progresso salvo no navegador.",
  alternates: { canonical: "/favoritos" },
  robots: { index: false, follow: true },
  openGraph: {
    images: ogImages(),
    title: "Seus favoritos e progresso | PokéDetonado",
    description:
      "Jogos, guias, Pokémon e etapas marcados como favoritos, além do progresso salvo no navegador.",
    url: "/favoritos",
    type: "website",
  },
};

export default function FavoritosPage() {
  const guides = getGuides().map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    summary: guide.summary,
    readTime: guide.readTime,
  }));
  const tips = getTips().map((tip) => ({
    slug: tip.slug,
    title: tip.title,
    summary: tip.summary,
    readTime: tip.readTime,
    category: tip.category,
  }));
  const walkthroughs = getWalkthroughs().map((walkthrough) => ({
    slug: walkthrough.slug,
    title: walkthrough.title,
    gameSlug: walkthrough.gameSlug,
    chapters: walkthrough.chapters.map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
      order: chapter.order,
      objective: chapter.objective,
    })),
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Favoritos" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Sua conta</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Favoritos e progresso
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Tudo o que você marcou como favorito e as etapas de detonados concluídas. Os
          dados ficam salvos no armazenamento local deste navegador.
        </p>
      </header>

      <FavoritesDashboard guides={guides} tips={tips} walkthroughs={walkthroughs} />
    </div>
  );
}
