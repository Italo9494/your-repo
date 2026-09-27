import type { Metadata } from "next";

import { WalkthroughForm } from "@/components/admin/WalkthroughForm";
import { games } from "@/data/games";

export const metadata: Metadata = {
  title: "Novo detonado",
  robots: { index: false, follow: false },
};

export default function NewWalkthroughPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Novo detonado</h1>
        <p className="text-sm text-muted">
          Crie o título, o jogo e adicione os capítulos na ordem do jogo.
        </p>
      </div>
      <WalkthroughForm games={games.map((game) => ({ slug: game.slug, name: game.name }))} />
    </div>
  );
}
