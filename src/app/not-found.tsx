import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";

import { PokeballIcon } from "@/components/icons/PokeballIcon";
import { SearchBar } from "@/components/SearchBar";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
        <PokeballIcon className="h-9 w-9" />
      </span>

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Erro 404</p>

      <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
        Ops! Parece que você entrou em uma área desconhecida.
      </h1>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Esta página não existe ou foi movida. Não se preocupe: seu progresso e favoritos
        continuam salvos. Volte para o início ou pesquise o que procura.
      </p>

      <div className="mt-7 w-full max-w-lg">
        <SearchBar large />
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-red-dark"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Voltar para o início
        </Link>
        <Link
          href="/detonados"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue"
        >
          <Compass className="h-4 w-4" aria-hidden="true" />
          Ver detonados
        </Link>
      </div>

      <p className="mt-8 flex items-center gap-2 text-sm text-muted">
        <Search className="h-4 w-4" aria-hidden="true" />
        Dica: pesquise por <strong>fire red</strong> para encontrar o detonado principal.
      </p>
    </div>
  );
}
