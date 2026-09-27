import Link from "next/link";
import type { ReactNode } from "react";
import { SearchX, Heart, BookOpen, Compass } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "search" | "favorite" | "guide" | "compass";
  actionLabel?: string;
  actionHref?: string;
}

const icons = {
  search: SearchX,
  favorite: Heart,
  guide: BookOpen,
  compass: Compass,
};

export function EmptyState({
  title,
  description,
  icon = "search",
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-surface px-6 py-14 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-canvas text-muted">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue-dark"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function InlineNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-brand-yellow/60 bg-brand-yellow/15 px-4 py-3 text-sm text-[#7a5c00]">
      {children}
    </p>
  );
}
