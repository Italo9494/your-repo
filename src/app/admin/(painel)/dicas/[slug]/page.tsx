import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TipForm } from "@/components/admin/TipForm";
import { getAllTips, getTip } from "@/lib/content";

export const metadata: Metadata = {
  title: "Editar dica",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditTipPage({ params }: PageProps) {
  const { slug } = await params;
  const tip = getTip(decodeURIComponent(slug));
  if (!tip) notFound();

  const categories = Array.from(new Set(getAllTips().map((item) => item.category)));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Editar dica</h1>
        <p className="text-sm text-muted">{tip.title}</p>
      </div>
      <TipForm categories={categories} initial={tip} />
    </div>
  );
}
