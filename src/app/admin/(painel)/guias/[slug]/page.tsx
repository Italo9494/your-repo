import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideForm } from "@/components/admin/GuideForm";
import { games } from "@/data/games";
import { guideCategories } from "@/data/guides";
import { getGuide } from "@/lib/content";

export const metadata: Metadata = {
  title: "Editar guia",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(decodeURIComponent(slug));
  if (!guide) notFound();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Editar guia</h1>
        <p className="text-sm text-muted">{guide.title}</p>
      </div>
      <GuideForm
        categories={guideCategories}
        games={games.map((game) => ({ slug: game.slug, name: game.name }))}
        initial={guide}
      />
    </div>
  );
}
