import { games } from "@/data/games";
import { guideCategories, guides as baseGuides } from "@/data/guides";
import { tips as baseTips } from "@/data/tips";
import { walkthroughs as baseWalkthroughs } from "@/data/walkthroughs";
import type {
  ContentStatus,
  Guide,
  GuideSection,
  TipArticle,
  Walkthrough,
  WalkthroughChapter,
} from "@/data/types";
import { readOrSeed, writeJson } from "@/lib/storage";

export type ContentType = "guias" | "dicas" | "detonados";

interface ContentStore {
  guides: Guide[];
  tips: TipArticle[];
  walkthroughs: Walkthrough[];
  deleted: Record<ContentType, string[]>;
}

const FILE = "content.json";

const LIST_KEY: Record<ContentType, "guides" | "tips" | "walkthroughs"> = {
  guias: "guides",
  dicas: "tips",
  detonados: "walkthroughs",
};

type Storable = Guide | TipArticle | Walkthrough;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DIFFICULTIES = ["Fácil", "Médio", "Difícil"];

export type UpsertError = { ok: false; error: string };
export type UpsertOk = { ok: true; value: { slug: string; created: boolean; status: ContentStatus } };
export type UpsertResult = UpsertOk | UpsertError;

function seedStore(): ContentStore {
  return {
    guides: [],
    tips: [],
    walkthroughs: [],
    deleted: { guias: [], dicas: [], detonados: [] },
  };
}

function store(): ContentStore {
  const raw = readOrSeed<Partial<ContentStore>>(FILE, seedStore);
  const deleted: Partial<Record<ContentType, string[]>> = raw.deleted ?? {};
  return {
    guides: Array.isArray(raw.guides) ? raw.guides : [],
    tips: Array.isArray(raw.tips) ? raw.tips : [],
    walkthroughs: Array.isArray(raw.walkthroughs) ? raw.walkthroughs : [],
    deleted: {
      guias: Array.isArray(deleted.guias) ? deleted.guias : [],
      dicas: Array.isArray(deleted.dicas) ? deleted.dicas : [],
      detonados: Array.isArray(deleted.detonados) ? deleted.detonados : [],
    },
  };
}

function saveStore(next: ContentStore): void {
  writeJson(FILE, next);
}

function merge<T extends { slug: string }>(
  base: T[],
  overlays: T[],
  removed: string[],
): T[] {
  const hidden = new Set(removed);
  const overlayBySlug = new Map(overlays.map((item) => [item.slug, item]));
  const baseSlugs = new Set(base.map((item) => item.slug));
  const merged: T[] = [];
  for (const item of base) {
    if (hidden.has(item.slug)) continue;
    merged.push(overlayBySlug.get(item.slug) ?? item);
  }
  for (const item of overlays) {
    if (hidden.has(item.slug) || baseSlugs.has(item.slug)) continue;
    merged.push(item);
  }
  return merged;
}

function published<T extends { status?: ContentStatus }>(items: T[]): T[] {
  return items.filter((item) => !item.status || item.status === "publicado");
}

export function getAllGuides(): Guide[] {
  const data = store();
  return merge(baseGuides, data.guides, data.deleted.guias);
}

export function getGuides(): Guide[] {
  return published(getAllGuides());
}

export function getGuide(slug: string): Guide | undefined {
  return getGuides().find((item) => item.slug === slug);
}

export function getAllTips(): TipArticle[] {
  const data = store();
  return merge(baseTips, data.tips, data.deleted.dicas);
}

export function getTips(): TipArticle[] {
  return published(getAllTips());
}

export function getTip(slug: string): TipArticle | undefined {
  return getTips().find((item) => item.slug === slug);
}

export function getAllWalkthroughs(): Walkthrough[] {
  const data = store();
  return merge(baseWalkthroughs, data.walkthroughs, data.deleted.detonados);
}

export function getWalkthroughs(): Walkthrough[] {
  return published(getAllWalkthroughs());
}

export function getWalkthrough(slug: string): Walkthrough | undefined {
  return getWalkthroughs().find((item) => item.slug === slug);
}

export function getFeaturedWalkthroughs(): Walkthrough[] {
  return getWalkthroughs().filter((item) => item.featured);
}

export function getWalkthroughByGame(gameSlug: string): Walkthrough | undefined {
  return getWalkthroughs().find((item) => item.gameSlug === gameSlug);
}

function record(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function text(value: unknown, min: number, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) return null;
  return trimmed;
}

function parseStatus(value: unknown, fallback: ContentStatus): ContentStatus {
  return value === "publicado" || value === "rascunho" ? value : fallback;
}

function parseColors(value: unknown): [string, string] | string {
  if (!Array.isArray(value) || value.length !== 2) return "Informe as duas cores da capa.";
  const [first, second] = value;
  if (typeof first !== "string" || !HEX_RE.test(first)) return "Cor primária inválida (use #rrggbb).";
  if (typeof second !== "string" || !HEX_RE.test(second)) return "Cor secundária inválida (use #rrggbb).";
  return [first, second];
}

function parseSections(value: unknown): GuideSection[] | string {
  if (!Array.isArray(value) || value.length === 0) return "Adicione ao menos uma seção.";
  const sections: GuideSection[] = [];
  for (const entry of value) {
    const section = record(entry);
    if (!section) return "Seção inválida.";
    const heading = text(section.heading, 3, 140);
    if (!heading) return "Cada seção precisa de um título entre 3 e 140 caracteres.";
    if (!Array.isArray(section.paragraphs)) return "Cada seção precisa de parágrafos.";
    const paragraphs = section.paragraphs
      .map((paragraph) => (typeof paragraph === "string" ? paragraph.trim() : ""))
      .filter(Boolean);
    if (paragraphs.length === 0) return "Cada seção precisa de ao menos um parágrafo.";
    if (paragraphs.some((paragraph) => paragraph.length > 1400)) {
      return "Parágrafo longo demais (máximo 1400 caracteres).";
    }
    let bullets: string[] | undefined;
    if (section.bullets !== undefined && section.bullets !== null) {
      if (!Array.isArray(section.bullets)) return "Lista de tópicos inválida.";
      const items = section.bullets
        .map((bullet) => (typeof bullet === "string" ? bullet.trim() : ""))
        .filter(Boolean);
      if (items.length > 0) bullets = items;
    }
    sections.push(bullets ? { heading, paragraphs, bullets } : { heading, paragraphs });
  }
  return sections;
}

function parseStringList(value: unknown, max: number, label: string): string[] | string {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) return `${label} inválidos.`;
  const items = value.map((entry) => (typeof entry === "string" ? entry.trim() : "")).filter(Boolean);
  if (items.length > max) return `${label} demais (máximo ${max}).`;
  if (items.some((item) => item.length > 400)) return `${label}: item longo demais.`;
  return items;
}

function parseNamedList(
  value: unknown,
  max: number,
  label: string,
): { name: string; note: string }[] | string {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) return `${label} inválidos.`;
  const items: { name: string; note: string }[] = [];
  for (const entry of value) {
    const item = record(entry);
    if (!item) return `${label} inválidos.`;
    const name = text(item.name, 1, 80);
    if (!name) return `${label}: nome obrigatório (até 80 caracteres).`;
    const note = typeof item.note === "string" ? item.note.trim().slice(0, 300) : "";
    items.push({ name, note });
  }
  if (items.length > max) return `${label} demais (máximo ${max}).`;
  return items;
}

function parseGameSlugs(value: unknown): string[] | string {
  if (!Array.isArray(value)) return "Jogos inválidos.";
  const slugs = value.filter((entry): entry is string => typeof entry === "string");
  if (slugs.length !== value.length) return "Jogos inválidos.";
  for (const slug of slugs) {
    if (!games.some((game) => game.slug === slug)) return `Jogo desconhecido: ${slug}.`;
  }
  if (slugs.length > 6) return "Selecione no máximo 6 jogos.";
  return slugs;
}

function parseDate(value: unknown): string | null {
  if (typeof value !== "string" || !DATE_RE.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return value;
}

function parseReadTime(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const rounded = Math.round(value);
  if (rounded < 1 || rounded > 240) return null;
  return rounded;
}

function parseGuide(raw: unknown): { ok: true; value: Guide; status: ContentStatus } | UpsertError {
  const input = record(raw);
  if (!input) return { ok: false, error: "Dados do guia inválidos." };
  const slug = text(input.slug, 3, 80);
  if (!slug || !SLUG_RE.test(slug)) return { ok: false, error: "Slug inválido (use letras minúsculas, números e hífens)." };
  const title = text(input.title, 5, 140);
  if (!title) return { ok: false, error: "Título deve ter entre 5 e 140 caracteres." };
  const category = typeof input.category === "string" ? input.category : "";
  if (!guideCategories.some((item) => item.slug === category)) {
    return { ok: false, error: "Categoria inválida." };
  }
  const summary = text(input.summary, 20, 300);
  if (!summary) return { ok: false, error: "Resumo deve ter entre 20 e 300 caracteres." };
  const date = parseDate(input.date);
  if (!date) return { ok: false, error: "Data inválida (use AAAA-MM-DD)." };
  const readTime = parseReadTime(input.readTime);
  if (!readTime) return { ok: false, error: "Tempo de leitura inválido (1 a 240)." };
  const gameSlugs = parseGameSlugs(input.gameSlugs);
  if (typeof gameSlugs === "string") return { ok: false, error: gameSlugs };
  const colors = parseColors(input.colors);
  if (typeof colors === "string") return { ok: false, error: colors };
  const sections = parseSections(input.sections);
  if (typeof sections === "string") return { ok: false, error: sections };
  const status = parseStatus(input.status, "rascunho");
  return {
    ok: true,
    status,
    value: { slug, title, category: category as Guide["category"], summary, date, readTime, gameSlugs, colors, sections, status },
  };
}

function parseTip(raw: unknown): { ok: true; value: TipArticle; status: ContentStatus } | UpsertError {
  const input = record(raw);
  if (!input) return { ok: false, error: "Dados da dica inválidos." };
  const slug = text(input.slug, 3, 80);
  if (!slug || !SLUG_RE.test(slug)) return { ok: false, error: "Slug inválido (use letras minúsculas, números e hífens)." };
  const title = text(input.title, 5, 140);
  if (!title) return { ok: false, error: "Título deve ter entre 5 e 140 caracteres." };
  const category = text(input.category, 2, 60);
  if (!category) return { ok: false, error: "Categoria deve ter entre 2 e 60 caracteres." };
  const summary = text(input.summary, 20, 300);
  if (!summary) return { ok: false, error: "Resumo deve ter entre 20 e 300 caracteres." };
  const date = parseDate(input.date);
  if (!date) return { ok: false, error: "Data inválida (use AAAA-MM-DD)." };
  const readTime = parseReadTime(input.readTime);
  if (!readTime) return { ok: false, error: "Tempo de leitura inválido (1 a 240)." };
  const colors = parseColors(input.colors);
  if (typeof colors === "string") return { ok: false, error: colors };
  const sections = parseSections(input.sections);
  if (typeof sections === "string") return { ok: false, error: sections };
  const status = parseStatus(input.status, "rascunho");
  return {
    ok: true,
    status,
    value: { slug, title, category, summary, date, readTime, colors, sections, status },
  };
}

function parseChapters(value: unknown): WalkthroughChapter[] | string {
  if (!Array.isArray(value)) return "Capítulos inválidos.";
  if (value.length > 200) return "Quantidade de capítulos alta demais.";
  const seen = new Set<string>();
  const chapters: WalkthroughChapter[] = [];
  for (let index = 0; index < value.length; index += 1) {
    const input = record(value[index]);
    if (!input) return "Capítulo inválido.";
    const slug = text(input.slug, 2, 80);
    if (!slug || !SLUG_RE.test(slug)) return `Capítulo ${index + 1}: slug inválido.`;
    if (seen.has(slug)) return `Capítulo ${index + 1}: slug repetido (${slug}).`;
    seen.add(slug);
    const title = text(input.title, 2, 100);
    if (!title) return `Capítulo ${index + 1}: título obrigatório.`;
    const intro = text(input.intro, 3, 1200);
    if (!intro) return `Capítulo ${index + 1}: introdução obrigatória (até 1200 caracteres).`;
    const objective = text(input.objective, 3, 400);
    if (!objective) return `Capítulo ${index + 1}: objetivo obrigatório (até 400 caracteres).`;
    const route = typeof input.route === "string" ? input.route.trim().slice(0, 2000) : "";
    const tips = parseStringList(input.tips, 20, "Dicas");
    if (typeof tips === "string") return `Capítulo ${index + 1}: ${tips}`;
    const pokemon = parseNamedList(input.pokemon, 30, "Pokémon");
    if (typeof pokemon === "string") return `Capítulo ${index + 1}: ${pokemon}`;
    const items = parseNamedList(input.items, 30, "Itens");
    if (typeof items === "string") return `Capítulo ${index + 1}: ${items}`;
    const trainers = parseNamedList(input.trainers, 40, "Treinadores");
    if (typeof trainers === "string") return `Capítulo ${index + 1}: ${trainers}`;
    const mapNote =
      typeof input.mapNote === "string" && input.mapNote.trim()
        ? input.mapNote.trim().slice(0, 400)
        : undefined;
    chapters.push({
      slug,
      title,
      order: index + 1,
      intro,
      objective,
      route,
      pokemon,
      items,
      trainers,
      tips,
      ...(mapNote ? { mapNote } : {}),
    });
  }
  return chapters;
}

function parseWalkthrough(
  raw: unknown,
): { ok: true; value: Walkthrough; status: ContentStatus } | UpsertError {
  const input = record(raw);
  if (!input) return { ok: false, error: "Dados do detonado inválidos." };
  const slug = text(input.slug, 3, 80);
  if (!slug || !SLUG_RE.test(slug)) return { ok: false, error: "Slug inválido (use letras minúsculas, números e hífens)." };
  const gameSlug = typeof input.gameSlug === "string" ? input.gameSlug : "";
  if (!games.some((game) => game.slug === gameSlug)) return { ok: false, error: "Jogo inválido." };
  const title = text(input.title, 5, 140);
  if (!title) return { ok: false, error: "Título deve ter entre 5 e 140 caracteres." };
  const summary = text(input.summary, 20, 300);
  if (!summary) return { ok: false, error: "Resumo deve ter entre 20 e 300 caracteres." };
  const difficulty = typeof input.difficulty === "string" ? input.difficulty : "";
  if (!DIFFICULTIES.includes(difficulty)) return { ok: false, error: "Dificuldade inválida." };
  const chapters = parseChapters(input.chapters);
  if (typeof chapters === "string") return { ok: false, error: chapters };
  const planned = parseStringList(input.plannedChapters, 40, "Capítulos planejados");
  if (typeof planned === "string") return { ok: false, error: planned };
  const status = parseStatus(input.status, "rascunho");
  const today = new Date().toISOString().slice(0, 10);
  const date = parseDate(input.updatedAt) ?? today;
  return {
    ok: true,
    status,
    value: {
      slug,
      gameSlug,
      title,
      summary,
      difficulty: difficulty as Walkthrough["difficulty"],
      featured: input.featured === true,
      updatedAt: date,
      chapters,
      ...(planned.length > 0 ? { plannedChapters: planned } : {}),
      status,
    },
  };
}

export function upsertContent(
  type: ContentType,
  raw: unknown,
  user: { id: string },
): UpsertResult {
  const parsed =
    type === "guias"
      ? parseGuide(raw)
      : type === "dicas"
        ? parseTip(raw)
        : parseWalkthrough(raw);
  if (!parsed.ok) return parsed;

  const data = store();
  const list = data[LIST_KEY[type]] as Storable[];
  const existingIndex = list.findIndex((item) => item.slug === parsed.value.slug);
  const created = existingIndex < 0;
  const stamped = {
    ...parsed.value,
    updatedAt: parsed.value.updatedAt ?? new Date().toISOString(),
    updatedBy: user.id,
  };
  if (existingIndex >= 0) list[existingIndex] = stamped;
  else list.push(stamped);

  data.deleted[type] = data.deleted[type].filter((slug) => slug !== parsed.value.slug);
  saveStore(data);

  return { ok: true, value: { slug: parsed.value.slug, created, status: parsed.status } };
}

export function removeContent(type: ContentType, slug: string): boolean {
  const data = store();
  const list = data[LIST_KEY[type]] as Storable[];
  const index = list.findIndex((item) => item.slug === slug);
  const baseList: Array<{ slug: string }> =
    type === "guias" ? baseGuides : type === "dicas" ? baseTips : baseWalkthroughs;
  const isBase = baseList.some((item) => item.slug === slug);

  if (index >= 0) list.splice(index, 1);
  if (!isBase && index < 0) return false;
  if (isBase && !data.deleted[type].includes(slug)) data.deleted[type].push(slug);

  saveStore(data);
  return true;
}

export function contentTypeFromParam(param: string): ContentType | null {
  if (param === "guias" || param === "dicas" || param === "detonados") return param;
  return null;
}
