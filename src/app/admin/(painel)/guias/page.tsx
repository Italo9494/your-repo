import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { ContentTable, type ContentRow } from "@/components/admin/ContentTable";
import { buttonPrimary } from "@/components/admin/ui";
import { getSessionUser } from "@/lib/auth";
import { getAllGuides } from "@/lib/content";
import { formatDate } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guias",
  robots: { index: false, follow: false },
};

export default async function AdminGuidesPage() {
  const user = await getSessionUser();
  const rows: ContentRow[] = getAllGuides().map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    meta: formatDate(guide.date),
    status: guide.status ?? "publicado",
    href: `/guias/${guide.slug}`,
    item: guide as unknown as Record<string, unknown>,
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Guias</h1>
          <p className="text-sm text-muted">{rows.length} item(ns) no catálogo.</p>
        </div>
        <Link href="/admin/guias/novo" className={buttonPrimary}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo guia
        </Link>
      </div>

      <ContentTable type="guias" rows={rows} canDelete={user?.role === "ADMIN"} />
    </div>
  );
}
