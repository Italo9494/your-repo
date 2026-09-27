export type Region = "Kanto" | "Johto" | "Hoenn" | "Sinnoh" | "Unova";

export type ContentStatus = "publicado" | "rascunho";

export type Platform =
  | "Game Boy"
  | "Game Boy Color"
  | "Game Boy Advance"
  | "Nintendo DS";

export type Difficulty = "Fácil" | "Médio" | "Difícil";

export interface Game {
  slug: string;
  name: string;
  shortName: string;
  generation: number;
  platform: Platform;
  region: Region;
  year: number;
  description: string;
  difficulty: Difficulty;
  /** Gradiente usado na capa ilustrada. */
  colors: [string, string];
  /** Arte do mascote do jogo, exibida sobre o gradiente em `CoverArt`. */
  cover?: string;
}

export interface WalkthroughChapter {
  slug: string;
  title: string;
  order: number;
  intro: string;
  objective: string;
  route: string;
  pokemon: { name: string; note: string }[];
  items: { name: string; note: string }[];
  trainers: { name: string; note: string }[];
  tips: string[];
  mapNote?: string;
}

export interface Walkthrough {
  slug: string;
  gameSlug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  featured: boolean;
  updatedAt: string;
  chapters: WalkthroughChapter[];
  /** Capítulos planejados para detonados que ainda estão em produção. */
  plannedChapters?: string[];
  status?: ContentStatus;
  updatedBy?: string;
}

export interface PokemonEvolutionMember {
  slug: string;
  name: string;
  method: string;
}

export interface Pokemon {
  slug: string;
  dex: number;
  name: string;
  types: string[];
  region: Region;
  generation: number;
  category: string;
  description: string;
  familyId: string;
  familyIndex: number;
  colors: [string, string];
  cover?: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export type GuideCategorySlug =
  | "iniciantes"
  | "captura"
  | "evolucao"
  | "batalhas"
  | "itens"
  | "ginasios"
  | "elite-four"
  | "pos-jogo"
  | "segredos";

export interface Guide {
  slug: string;
  title: string;
  category: GuideCategorySlug;
  summary: string;
  date: string;
  readTime: number;
  gameSlugs: string[];
  colors: [string, string];
  sections: GuideSection[];
  status?: ContentStatus;
  updatedAt?: string;
  updatedBy?: string;
}

export interface GuideCategory {
  slug: GuideCategorySlug;
  name: string;
  description: string;
}

export interface MapLocation {
  name: string;
  note: string;
}

export interface GameMap {
  slug: string;
  name: string;
  region: Region;
  gameSlug: string;
  summary: string;
  locations: MapLocation[];
  colors: [string, string];
}

export interface TipArticle {
  slug: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  readTime: number;
  colors: [string, string];
  sections: GuideSection[];
  status?: ContentStatus;
  updatedAt?: string;
  updatedBy?: string;
}
