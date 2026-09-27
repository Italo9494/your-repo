import type { MetadataRoute } from "next";

import { maps } from "@/data/maps";
import { pokemonList } from "@/data/pokemon";
import { getAllCategories } from "@/lib/categories";
import { getGuides, getTips, getWalkthroughs } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const guides = getGuides();
  const tips = getTips();
  const walkthroughs = getWalkthroughs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/jogos"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/detonados"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/guias"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/pokemon"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/mapas"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/dicas"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/categorias"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/sobre"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/contato"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    {
      url: absoluteUrl("/politica-de-privacidade"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/termos-de-uso"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const walkthroughPages: MetadataRoute.Sitemap = walkthroughs.flatMap((walkthrough) => [
    {
      url: absoluteUrl(`/detonado/${walkthrough.slug}`),
      lastModified: new Date(walkthrough.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...walkthrough.chapters.map((chapter) => ({
      url: absoluteUrl(`/detonado/${walkthrough.slug}/${chapter.slug}`),
      lastModified: new Date(walkthrough.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]);

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guias/${guide.slug}`),
    lastModified: new Date(guide.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tipPages: MetadataRoute.Sitemap = tips.map((tip) => ({
    url: absoluteUrl(`/dicas/${tip.slug}`),
    lastModified: new Date(tip.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const pokemonPages: MetadataRoute.Sitemap = pokemonList.map((pokemon) => ({
    url: absoluteUrl(`/pokemon/${pokemon.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const mapPages: MetadataRoute.Sitemap = maps.map((map) => ({
    url: absoluteUrl(`/mapas/${map.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: absoluteUrl(`/categorias/${category.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...walkthroughPages,
    ...guidePages,
    ...tipPages,
    ...pokemonPages,
    ...mapPages,
  ];
}
