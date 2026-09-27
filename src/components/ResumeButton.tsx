"use client";

import Link from "next/link";
import { History, Play } from "lucide-react";

import { useResumeTarget } from "@/lib/resume";

interface ResumeButtonProps {
  compact?: boolean;
}

export function ResumeButton({ compact = false }: ResumeButtonProps) {
  const target = useResumeTarget();

  if (!target) return null;

  return (
    <Link
      href={target.href}
      title={target.detail}
      aria-label={`${target.label}. ${target.detail}`}
      className={`inline-flex items-center gap-2 rounded-full bg-brand-blue font-semibold text-white transition hover:bg-brand-blue-dark ${
        compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
      }`}
    >
      <Play className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">Continuar</span>
    </Link>
  );
}

export function ResumeCard() {
  const target = useResumeTarget();

  if (!target) {
    return (
      <Link
        href="/detonados"
        className="flex items-center justify-between gap-4 rounded-3xl border border-dashed border-line bg-surface px-5 py-4 text-sm text-muted transition hover:border-brand-blue hover:text-brand-blue"
      >
        <span className="inline-flex items-center gap-2">
          <History className="h-4 w-4" aria-hidden="true" />
          Nenhum progresso salvo ainda — escolha um detonado para começar.
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={target.href}
      className="group flex items-center justify-between gap-4 rounded-3xl border border-brand-blue/40 bg-brand-blue/5 px-5 py-4 transition hover:border-brand-blue"
    >
      <span className="min-w-0">
        <span className="block text-xs font-bold uppercase tracking-wider text-brand-blue">
          Continuar de onde parei
        </span>
        <span className="mt-1 block truncate text-sm font-semibold text-ink group-hover:text-brand-blue">
          {target.label}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted">{target.detail}</span>
      </span>
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white transition group-hover:bg-brand-blue-dark">
        <Play className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
