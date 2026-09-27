export const SITE_NAME = "PokéDetonado";
export const SITE_URL = "https://pokedetonado.com.br";
export const SITE_DESCRIPTION =
  "Detonados completos, guias passo a passo, mapas, dicas e informações sobre jogos da franquia Pokémon em português do Brasil.";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogImages() {
  return [
    {
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} — detonados, guias, mapas e dicas de Pokémon`,
    },
  ];
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
