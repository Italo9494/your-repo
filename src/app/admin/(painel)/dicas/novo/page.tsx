import type { Metadata } from "next";

import { TipForm } from "@/components/admin/TipForm";
import { getAllTips } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nova dica",
  robots: { index: false, follow: false },
};

export default function NewTipPage() {
  const categories = Array.from(new Set(getAllTips().map((tip) => tip.category)));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Nova dica</h1>
        <p className="text-sm text-muted">
          Preencha os campos e publique quando o conteúdo estiver pronto.
        </p>
      </div>
      <TipForm categories={categories} />
    </div>
  );
}
