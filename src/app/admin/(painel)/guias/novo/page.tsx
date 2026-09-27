import type { Metadata } from "next";

import { GuideForm } from "@/components/admin/GuideForm";
import { games } from "@/data/games";
import { guideCategories } from "@/data/guides";

export const metadata: Metadata = {
  title: "Novo guia",
  robots: { index: false, follow: false },
};

export default function NewGuidePage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Novo guia</h1>
        <p className="text-sm text-muted">
          Preencha os campos e publique quando o conteúdo estiver pronto.
        </p>
      </div>
      <GuideForm
        categories={guideCategories}
        games={games.map((game) => ({ slug: game.slug, name: game.name }))}
      />
    </div>
  );
}
