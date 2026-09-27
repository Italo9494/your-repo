import { games } from "@/data/games";
import { guides as baseGuides } from "@/data/guides";
import { maps } from "@/data/maps";
import { pokemonList } from "@/data/pokemon";
import { tips as baseTips } from "@/data/tips";
import { walkthroughs as baseWalkthroughs } from "@/data/walkthroughs";
import type { Guide, TipArticle, Walkthrough } from "@/data/types";

export type RankKind = "detonado" | "guia" | "dica" | "jogo" | "pokemon" | "mapa";

export interface RankedSources {
  guides?: Guide[];
  tips?: TipArticle[];
  walkthroughs?: Walkthrough[];
}

export interface RankedItem {
  kind: RankKind;
  slug: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
  views: number;
  date?: string;
}

/**
 * Audiência de demonstração (pageviews) por tipo de conteúdo.
 * Em produção, substitua por métricas reais vindas de uma API.
 */
const demoViews: Record<RankKind, Record<string, number>> = {
  detonado: {
    "pokemon-fire-red": 48210,
    "pokemon-emerald": 36740,
    "pokemon-diamond": 28105,
    "pokemon-leaf-green": 19870,
    "pokemon-yellow": 17455,
    "pokemon-platinum": 16220,
    "pokemon-heart-gold": 15480,
    "pokemon-soul-silver": 14930,
    "pokemon-gold": 14015,
    "pokemon-red": 13640,
    "pokemon-blue": 13210,
    "pokemon-crystal": 11985,
    "pokemon-ruby": 10740,
    "pokemon-sapphire": 10415,
    "pokemon-black": 9860,
    "pokemon-white": 9420,
    "pokemon-pearl": 8975,
    "pokemon-silver": 8610,
  },
  guia: {
    "como-comecar-sua-jornada": 22480,
    "capturar-pokemon-raros": 19735,
    "preparando-elite-four": 17210,
    "montando-time-equilibrado": 15980,
    "evolucoes-por-amizade": 14420,
    "vencendo-primeiro-ginasio": 13875,
    "completando-pokedex": 12640,
    "tipos-na-pratica": 11905,
    "o-que-fazer-pos-jogo": 10870,
    "itens-que-vale-a-pena-guardar": 9765,
    "areas-secretas-de-kanto": 8940,
    "ataques-opcionais-valem-a-pena": 7825,
  },
  dica: {
    "farm-de-experiencia": 16320,
    "economizar-pp-nas-rotas": 14745,
    "antes-de-desafiar-o-ginasio": 12980,
    "pokemon-que-vale-a-pena-desde-cedo": 11640,
    "capturar-sem-perder-o-alvo": 10455,
    "horario-e-pokemon-exclusivos": 9320,
    "erros-comuns-no-primeiro-jogo": 8475,
    "organizando-a-caixa-de-pokemon": 7690,
    "uso-eficiente-da-corda-de-escape": 6845,
  },
  jogo: {
    "pokemon-fire-red": 31450,
    "pokemon-emerald": 29875,
    "pokemon-diamond": 24310,
    "pokemon-yellow": 21760,
    "pokemon-platinum": 20145,
    "pokemon-heart-gold": 19620,
    "pokemon-soul-silver": 18975,
    "pokemon-leaf-green": 17430,
    "pokemon-gold": 16815,
    "pokemon-red": 15925,
    "pokemon-blue": 15470,
    "pokemon-crystal": 14260,
    "pokemon-ruby": 13185,
    "pokemon-sapphire": 12840,
    "pokemon-black": 11965,
    "pokemon-white": 11420,
    "pokemon-pearl": 10735,
    "pokemon-silver": 10215,
  },
  pokemon: {
    pikachu: 41250,
    charizard: 38740,
    gengar: 26815,
    eevee: 24970,
    dragonite: 23145,
    tyranitar: 21870,
    mewtwo: 20940,
    lucario: 19685,
    blastoise: 18420,
    venusaur: 17930,
    gyarados: 17215,
    umbreon: 16480,
    espeon: 15725,
    dragonair: 14930,
    raichu: 14260,
    garchomp: 13845,
    metagross: 13210,
    gardevoir: 12755,
    torterra: 11980,
    infernape: 11640,
    empoleon: 11215,
    typhlosion: 10740,
    feraligatr: 10320,
    ampharos: 9865,
  },
  mapa: {
    "mapa-kanto": 18640,
    "mapa-johto": 15320,
    "mapa-hoenn": 13745,
    "mapa-sinnoh": 12480,
    "mapa-unova": 10965,
  },
};

function hashViews(seed: string): number {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 100000;
  }
  return 420 + (hash % 3600);
}

export function getViews(kind: RankKind, slug: string): number {
  return demoViews[kind][slug] ?? hashViews(`${kind}:${slug}`);
}

export function formatViews(views: number): string {
  if (views >= 1000) {
    const thousands = views / 1000;
    const label =
      thousands >= 100
        ? thousands.toFixed(0)
        : thousands.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
    return `${label} mil leituras`;
  }
  return `${views} leituras`;
}

function toItem(
  kind: RankKind,
  slug: string,
  title: string,
  description: string,
  href: string,
  meta?: string,
  date?: string,
): RankedItem {
  return { kind, slug, title, description, href, meta, date, views: getViews(kind, slug) };
}

export function rankedWalkthroughs(sources?: RankedSources): RankedItem[] {
  const walkthroughs = sources?.walkthroughs ?? baseWalkthroughs;
  return walkthroughs
    .filter((item) => item.chapters.length > 0)
    .map((item) => {
      const game = games.find((gameItem) => gameItem.slug === item.gameSlug);
      return toItem(
        "detonado",
        item.slug,
        item.title,
        item.summary,
        `/detonado/${item.slug}`,
        `${item.chapters.length} etapas · ${game?.region ?? ""}`.trim(),
        item.updatedAt,
      );
    });
}

export function rankedGuides(sources?: RankedSources): RankedItem[] {
  const guides = sources?.guides ?? baseGuides;
  return guides.map((item) =>
    toItem("guia", item.slug, item.title, item.summary, `/guias/${item.slug}`, `${item.readTime} min de leitura`, item.date),
  );
}

export function rankedTips(sources?: RankedSources): RankedItem[] {
  const tips = sources?.tips ?? baseTips;
  return tips.map((item) =>
    toItem("dica", item.slug, item.title, item.summary, `/dicas/${item.slug}`, `${item.category} · ${item.readTime} min`, item.date),
  );
}

export function rankedGames(): RankedItem[] {
  return games.map((item) =>
    toItem(
      "jogo",
      item.slug,
      item.name,
      item.description,
      `/detonado/${item.slug}`,
      `${item.region} · ${item.platform}`,
      String(item.year),
    ),
  );
}

export function rankedPokemon(): RankedItem[] {
  return pokemonList.map((item) =>
    toItem(
      "pokemon",
      item.slug,
      item.name,
      item.description,
      `/pokemon/${item.slug}`,
      `Nº ${String(item.dex).padStart(3, "0")} · ${item.types.join(" / ")}`,
    ),
  );
}

export function rankedMaps(): RankedItem[] {
  return maps.map((item) =>
    toItem("mapa", item.slug, item.name, item.summary, `/mapas/${item.slug}`, item.region),
  );
}

function allRanked(sources?: RankedSources): RankedItem[] {
  return [
    ...rankedWalkthroughs(sources),
    ...rankedGuides(sources),
    ...rankedTips(sources),
    ...rankedGames(),
    ...rankedPokemon(),
    ...rankedMaps(),
  ];
}

export function popularItems(
  limit = 6,
  kinds?: RankKind[],
  sources?: RankedSources,
): RankedItem[] {
  const pool = allRanked(sources).filter((item) => (kinds ? kinds.includes(item.kind) : true));
  return pool.sort((a, b) => b.views - a.views).slice(0, limit);
}

export function recentlyUpdated(limit = 6, sources?: RankedSources): RankedItem[] {
  return allRanked(sources)
    .filter((item) => Boolean(item.date) && !Number.isNaN(Date.parse(item.date ?? "")))
    .sort((a, b) => Date.parse(b.date ?? "") - Date.parse(a.date ?? ""))
    .slice(0, limit);
}
