import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WalkthroughForm } from "@/components/admin/WalkthroughForm";
import { games } from "@/data/games";
import { getWalkthrough } from "@/lib/content";

export const metadata: Metadata = {
  title: "Editar detonado",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditWalkthroughPage({ params }: PageProps) {
  const { slug } = await params;
  const walkthrough = getWalkthrough(decodeURIComponent(slug));
  if (!walkthrough) notFound();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Editar detonado</h1>
        <p className="text-sm text-muted">{walkthrough.title}</p>
      </div>
      <WalkthroughForm
        games={games.map((game) => ({ slug: game.slug, name: game.name }))}
        initial={walkthrough}
      />
    </div>
  );
}
