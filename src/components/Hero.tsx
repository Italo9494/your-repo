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
  const heroText = settings.heroText;
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

  const heroTextStyle = {
    color: heroText.textColor,
    fontFamily: heroText.fontFamily,
  } as const;

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div aria-hidden="true" className="absolute inset-0" style={backgroundStyle} />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-20">
        <div className="animate-rise">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: heroText.textColor, fontFamily: heroText.fontFamily }}
          >
            <PokeballIcon className="h-4 w-4" style={{ color: heroText.accentColor }} />
            {heroText.badge}
          </span>

          <h1
            className="mt-5 font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
            style={{
              ...heroTextStyle,
              fontSize: `${heroText.titleSize}px`,
            }}
          >
            {heroText.title.split(" ").map((word, index) =>
              index === heroText.title.split(" ").length - 1 ? (
                <span key={`${word}-${index}`} style={{ color: heroText.accentColor }}>
                  {` ${word}`}
                </span>
              ) : (
                <span key={`${word}-${index}`}>{word} </span>
              ),
            )}
          </h1>

          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{
              ...heroTextStyle,
              fontSize: `${heroText.subtitleSize}px`,
            }}
          >
            {heroText.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/detonados"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-soft transition"
              style={{ backgroundColor: heroText.accentColor }}
            >
              {heroText.primaryButton}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/jogos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-bold transition hover:border-brand-blue hover:text-brand-blue"
              style={{ color: heroText.textColor, fontFamily: heroText.fontFamily }}
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              {heroText.secondaryButton}
            </Link>
          </div>

          <div className="mt-8 max-w-xl">
            <SearchBar large />
            <p className="mt-2 text-xs" style={{ color: heroText.textColor, fontFamily: heroText.fontFamily }}>
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
