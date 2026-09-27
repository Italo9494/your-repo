"use client";

import { useMemo, useState } from "react";

import { GuideCard } from "@/components/GuideCard";
import { EmptyState } from "@/components/EmptyState";
import { FilterChip } from "@/components/FilterChip";
import { guideCategories } from "@/data/guides";
import type { Guide } from "@/data/types";

export function GuideExplorer({ guides }: { guides: Guide[] }) {
  const [category, setCategory] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of guides) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [guides]);

  const filtered = useMemo(
    () => (category ? guides.filter((guide) => guide.category === category) : guides),
    [guides, category],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <FilterChip active={category === null} onClick={() => setCategory(null)} size="md">
          Todas
        </FilterChip>

        {guideCategories.map((item) => (
          <FilterChip
            key={item.slug}
            active={category === item.slug}
            onClick={() => setCategory(item.slug)}
            size="md"
          >
            {item.name}
            <span className="ml-1.5 text-xs">{counts[item.slug] ?? 0}</span>
          </FilterChip>
        ))}
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        {filtered.length === 1 ? "1 guia encontrado" : `${filtered.length} guias encontrados`}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum guia nesta categoria"
          description="Ainda não publicamos artigos nesta categoria. Escolha outra opção acima."
        />
      )}
    </div>
  );
}
