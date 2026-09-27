import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition focus:border-brand-blue focus:outline-none";

export const labelClass = "block text-xs font-bold uppercase tracking-wider text-muted";

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-red-dark focus:outline-none focus:ring-2 focus:ring-brand-red/40 disabled:cursor-not-allowed disabled:opacity-50";

export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 disabled:cursor-not-allowed disabled:opacity-50";

export const buttonDanger =
  "inline-flex items-center justify-center gap-2 rounded-full border border-brand-red/40 bg-surface px-4 py-2 text-xs font-bold text-brand-red-dark transition hover:bg-brand-red hover:text-white disabled:cursor-not-allowed disabled:opacity-50";

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
      <span className="mt-1.5 block">{children}</span>
      {error ? <span className="mt-1 block text-xs font-semibold text-brand-red-dark">{error}</span> : null}
    </label>
  );
}

export function StatusBadge({ status }: { status: "publicado" | "rascunho" }) {
  const published = status === "publicado";
  return (
    <span
      className={
        published
          ? "inline-flex rounded-full bg-brand-green/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-green-dark"
          : "inline-flex rounded-full bg-brand-yellow/25 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#7a5c00]"
      }
    >
      {published ? "Publicado" : "Rascunho"}
    </span>
  );
}

export function Panel({
  title,
  description,
  children,
  aside,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-ink">{title}</h2>
          {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
        </div>
        {aside}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function ErrorMessage({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-sm font-semibold text-brand-red-dark">
      {message}
    </p>
  );
}

export function SuccessMessage({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="rounded-2xl border border-brand-green/30 bg-brand-green/10 px-4 py-3 text-sm font-semibold text-brand-green-dark">
      {message}
    </p>
  );
}
