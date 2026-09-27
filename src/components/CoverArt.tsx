import { PokeballIcon } from "@/components/icons/PokeballIcon";

interface CoverArtProps {
  title: string;
  colors: [string, string];
  /** Caminho/URL da arte real. Quando ausente, o componente renderiza uma capa ilustrada. */
  cover?: string;
  label?: string;
  className?: string;
  /** Proporção: usado apenas para o tamanho das imagens otimizadas. */
  sizes?: string;
  compact?: boolean;
}

export function CoverArt({
  title,
  colors,
  cover,
  label,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  compact = false,
}: CoverArtProps) {
  const accessibleLabel = label ?? `Capa ilustrada de ${title}`;
  const gradient = {
    backgroundImage: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
  };

  if (cover) {
    return (
      <div
        role="img"
        aria-label={accessibleLabel}
        className={`relative overflow-hidden ${className}`}
        style={gradient}
      >
        <span
          aria-hidden="true"
          className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/15"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-black/10"
        />
        <span aria-hidden="true" className="absolute inset-y-0 right-0 w-[56%]">
          <img
            src={cover}
            alt=""
            loading={compact ? "eager" : "lazy"}
            className="h-full w-full object-contain p-1.5 drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] sm:p-3"
          />
        </span>
        {!compact && (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
            />
            <span className="absolute inset-x-3 bottom-3 z-10 truncate pr-[52%] text-xs font-semibold tracking-wide text-white drop-shadow-sm sm:text-sm">
              {title}
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={accessibleLabel}
      className={`relative overflow-hidden ${className}`}
      style={gradient}
    >
      <span
        aria-hidden="true"
        className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/15"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-black/10"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40"
      >
        <PokeballIcon
          className={compact ? "h-10 w-10" : "h-16 w-16"}
          strokeWidth={1.6}
        />
      </span>
      {!compact && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 via-black/35 to-transparent"
          />
          <span className="absolute inset-x-3 bottom-3 truncate text-xs font-semibold tracking-wide text-white drop-shadow-sm sm:text-sm">
            {title}
          </span>
        </>
      )}
    </div>
  );
}
