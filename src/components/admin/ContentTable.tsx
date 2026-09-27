"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, PencilLine, Trash2 } from "lucide-react";

import type { ContentType } from "@/lib/content";
import { StatusBadge, buttonDanger } from "@/components/admin/ui";

export interface ContentRow {
  slug: string;
  title: string;
  meta: string;
  status: "publicado" | "rascunho";
  href: string;
  item: Record<string, unknown>;
}

interface Props {
  type: ContentType;
  rows: ContentRow[];
  canDelete: boolean;
}

export function ContentTable({ type, rows, canDelete }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggleStatus(row: ContentRow) {
    setBusy(row.slug);
    setError(null);
    const next = row.status === "publicado" ? "rascunho" : "publicado";
    try {
      const response = await fetch(
        `/api/admin/content/${type}/${encodeURIComponent(row.slug)}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ item: { ...row.item, status: next } }),
        },
      );
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Não foi possível alterar o status.");
      }
      router.refresh();
      setBusy(null);
    } catch {
      setError("Falha de conexão com o servidor.");
      setBusy(null);
    }
  }

  async function handleDelete(row: ContentRow) {
    if (!window.confirm(`Excluir "${row.title}"? Esta ação remove o item do site.`)) return;
    setBusy(row.slug);
    setError(null);
    try {
      const response = await fetch(
        `/api/admin/content/${type}/${encodeURIComponent(row.slug)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Não foi possível excluir.");
      }
      router.refresh();
      setBusy(null);
    } catch {
      setError("Falha de conexão com o servidor.");
      setBusy(null);
    }
  }

  if (rows.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
        Nenhum item cadastrado ainda.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {error ? (
        <p className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-sm font-semibold text-brand-red-dark">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-soft">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-bold uppercase tracking-wider text-muted">
              <th scope="col" className="px-4 py-3">
                Título
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                {type === "detonados" ? "Atualizado" : "Publicado em"}
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug} className="border-b border-line/70 last:border-b-0">
                <td className="px-4 py-3">
                  <p className="font-bold text-ink">{row.title}</p>
                  <p className="text-xs text-muted">/{type}/{row.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-xs text-muted">{row.meta}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      Ver
                    </a>
                    <Link
                      href={`/admin/${type}/${encodeURIComponent(row.slug)}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue"
                    >
                      <PencilLine className="h-3.5 w-3.5" aria-hidden="true" />
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleStatus(row)}
                      disabled={busy === row.slug}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/40 bg-brand-blue/5 px-3 py-1.5 text-xs font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white disabled:opacity-50"
                    >
                      {row.status === "publicado" ? "Despublicar" : "Publicar"}
                    </button>
                    {canDelete ? (
                      <button
                        type="button"
                        onClick={() => handleDelete(row)}
                        disabled={busy === row.slug}
                        className={`${buttonDanger} !px-3`}
                        aria-label={`Excluir ${row.title}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
