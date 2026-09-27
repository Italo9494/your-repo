import { guideCategories } from "@/data/guides";
import { getGuides, getTips } from "@/lib/content";
import { normalizeText } from "@/lib/seo";

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  kind: "guia" | "dica" | "misto";
  guideCount: number;
  tipCount: number;
  total: number;
}

export function categorySlug(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllCategories(): CategoryInfo[] {
  const map = new Map<string, CategoryInfo>();
  const guides = getGuides();
  const tips = getTips();

  for (const category of guideCategories) {
    map.set(category.slug, {
      slug: category.slug,
      name: category.name,
      description: category.description,
      kind: "guia",
      guideCount: guides.filter((guide) => guide.category === category.slug).length,
      tipCount: 0,
      total: 0,
    });
  }

  for (const tip of tips) {
    const slug = categorySlug(tip.category);
    const existing = map.get(slug);
    if (existing) {
      existing.tipCount += 1;
      existing.kind = "misto";
    } else {
      map.set(slug, {
        slug,
        name: tip.category,
        description: `Dicas curtas de ${normalizeText(tip.category)} para aplicar já na próxima sessão de jogo.`,
        kind: "dica",
        guideCount: 0,
        tipCount: 1,
        total: 0,
      });
    }
  }

  return Array.from(map.values())
    .map((item) => ({ ...item, total: item.guideCount + item.tipCount }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "pt-BR"));
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return getAllCategories().find((item) => item.slug === slug);
}

export function getCategoryGuides(slug: string) {
  return getGuides().filter((guide) => guide.category === slug);
}

export function getCategoryTips(slug: string) {
  return getTips().filter((tip) => categorySlug(tip.category) === slug);
}
