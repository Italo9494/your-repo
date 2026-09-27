import Link from "next/link";
import { ArrowRight, BookOpen, Compass } from "lucide-react";

import { PokeballIcon } from "@/components/icons/PokeballIcon";
import { SearchBar } from "@/components/SearchBar";
import { getSettings } from "@/lib/settings";

const highlights = [
  { label: "Detonados passo a passo", detail: "Etapa por etapa, com itens e dicas" },
  { label: "Mapas das regiões", detail: "Kanto, Johto, Hoenn, Sinnoh e Unova" },
  { label: "Guias e dicas práticas", detail: "Captura, evolução, ginásios e liga" },
];

export function Hero() {
  const settings = getSettings();
  const background = settings.heroBackground;
  const backgroundStyle =
    background.mode === "image" && background.image
      ? {
          backgroundColor: background.color,
          backgroundImage: `linear-gradient(rgba(255,255,255,${1 - background.opacity}), rgba(255,255,255,${1 - background.opacity})), url(${background.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: background.opacity,
        }
      : {
          backgroundColor: background.color,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(227,53,13,0.3) 0, transparent 45%), radial-gradient(circle at 80% 30%, rgba(42,117,187,0.28) 0, transparent 45%), radial-gradient(circle at 50% 90%, rgba(255,203,5,0.25) 0, transparent 40%)",
          opacity: background.opacity,
        };

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div aria-hidden="true" className="absolute inset-0" style={backgroundStyle} />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-20">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted">
            <PokeballIcon className="h-4 w-4 text-brand-red" />
            Guia independente em português
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Detonados de Pokémon completos e{" "}
            <span className="text-brand-red">fáceis de seguir</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Guias passo a passo para acompanhar sua aventura do primeiro passo à Liga
            Pokémon: rotas, cidades, ginásios, itens importantes e dicas de quem já
            atravessou cada região.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/detonados"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand-red-dark"
            >
              Ver detonados
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/jogos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Explorar jogos
            </Link>
          </div>

          <div className="mt-8 max-w-xl">
            <SearchBar large />
            <p className="mt-2 text-xs text-muted">
              Exemplo: pesquise por <strong>charizard</strong>,{" "}
              <strong>fire red</strong> ou <strong>ginásio</strong>.
            </p>
          </div>
        </div>

        <ul className="grid gap-3">
          {highlights.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-3 rounded-3xl border border-line bg-surface/80 p-5 shadow-soft backdrop-blur"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-bold text-ink">{item.label}</span>
                <span className="block text-sm text-muted">{item.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
