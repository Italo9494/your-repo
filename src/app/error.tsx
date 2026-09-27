"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
        <AlertTriangle className="h-8 w-8" aria-hidden="true" />
      </span>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">
        Algo saiu do trilho
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Ocorreu um erro ao carregar esta página. Tente novamente — se persistir, volte
        para o início.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-red-dark"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Tentar novamente
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
