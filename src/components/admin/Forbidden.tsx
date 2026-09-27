import { ShieldAlert } from "lucide-react";

export function Forbidden({ area }: { area: string }) {
  return (
    <div className="rounded-3xl border border-brand-yellow/40 bg-brand-yellow/10 p-8 text-center">
      <ShieldAlert className="mx-auto h-10 w-10 text-[#7a5c00]" aria-hidden="true" />
      <h1 className="mt-4 text-xl font-extrabold text-ink">403 — Acesso restrito</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">
        A área de {area} é exclusiva de administradores (papel ADMIN). Se você precisa de
        acesso, fale com um administrador da equipe.
      </p>
    </div>
  );
}
