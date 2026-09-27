import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { ContentTable, type ContentRow } from "@/components/admin/ContentTable";
import { buttonPrimary } from "@/components/admin/ui";
import { getSessionUser } from "@/lib/auth";
import { getAllTips } from "@/lib/content";
import { formatDate } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Dicas",
  robots: { index: false, follow: false },
};

export default async function AdminTipsPage() {
  const user = await getSessionUser();
  const rows: ContentRow[] = getAllTips().map((tip) => ({
    slug: tip.slug,
    title: tip.title,
    meta: formatDate(tip.date),
    status: tip.status ?? "publicado",
    href: `/dicas/${tip.slug}`,
    item: tip as unknown as Record<string, unknown>,
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Dicas</h1>
          <p className="text-sm text-muted">{rows.length} item(ns) no catálogo.</p>
        </div>
        <Link href="/admin/dicas/novo" className={buttonPrimary}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nova dica
        </Link>
      </div>

      <ContentTable type="dicas" rows={rows} canDelete={user?.role === "ADMIN"} />
    </div>
  );
}
