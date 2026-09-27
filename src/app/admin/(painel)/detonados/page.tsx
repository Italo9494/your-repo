import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { ContentTable, type ContentRow } from "@/components/admin/ContentTable";
import { buttonPrimary } from "@/components/admin/ui";
import { getSessionUser } from "@/lib/auth";
import { getAllWalkthroughs } from "@/lib/content";
import { formatDate } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Detonados",
  robots: { index: false, follow: false },
};

export default async function AdminWalkthroughsPage() {
  const user = await getSessionUser();
  const rows: ContentRow[] = getAllWalkthroughs().map((walkthrough) => ({
    slug: walkthrough.slug,
    title: walkthrough.title,
    meta: walkthrough.updatedAt ? formatDate(walkthrough.updatedAt) : "—",
    status: walkthrough.status ?? "publicado",
    href: `/detonado/${walkthrough.slug}`,
    item: walkthrough as unknown as Record<string, unknown>,
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Detonados</h1>
          <p className="text-sm text-muted">{rows.length} item(ns) no catálogo.</p>
        </div>
        <Link href="/admin/detonados/novo" className={buttonPrimary}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo detonado
        </Link>
      </div>

      <ContentTable type="detonados" rows={rows} canDelete={user?.role === "ADMIN"} />
    </div>
  );
}
