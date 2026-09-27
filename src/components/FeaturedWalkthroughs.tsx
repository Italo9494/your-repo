"use client";

import { WalkthroughCard } from "@/components/WalkthroughCard";
import type { Walkthrough } from "@/data/types";
import { useProgress } from "@/lib/progress";

export function FeaturedWalkthroughs({ items }: { items: Walkthrough[] }) {
  const progress = useProgress();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((walkthrough) => (
        <WalkthroughCard
          key={walkthrough.slug}
          walkthrough={walkthrough}
          completedSlugs={progress[walkthrough.gameSlug] ?? []}
        />
      ))}
    </div>
  );
}
