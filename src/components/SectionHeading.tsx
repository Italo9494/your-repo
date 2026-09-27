import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "Ver tudo",
}: SectionHeadingProps) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold leading-tight text-ink sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-muted sm:text-base">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-blue hover:text-brand-blue sm:self-auto"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
