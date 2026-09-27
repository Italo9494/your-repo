import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavTarget {
  slug: string;
  title: string;
}

interface WalkthroughNavigationProps {
  baseUrl: string;
  prev: NavTarget | null;
  next: NavTarget | null;
}

export function WalkthroughNavigation({ baseUrl, prev, next }: WalkthroughNavigationProps) {
  return (
    <nav
      aria-label="Navegação entre etapas"
      className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
    >
      {prev ? (
        <Link
          href={`${baseUrl}/${prev.slug}`}
          className="group inline-flex max-w-full items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-xs font-normal text-muted">Etapa anterior</span>
            <span className="block truncate">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`${baseUrl}/${next.slug}`}
          className="group inline-flex max-w-full items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue sm:text-right"
        >
          <span className="min-w-0">
            <span className="block text-xs font-normal text-muted">Próxima etapa</span>
            <span className="block truncate">{next.title}</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
    </nav>
  );
}
