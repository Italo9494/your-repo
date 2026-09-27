import { GameCard } from "@/components/GameCard";
import type { Game } from "@/data/types";

interface GameGridProps {
  games: Game[];
  walkthroughSlugs?: string[];
}

export function GameGrid({ games, walkthroughSlugs = [] }: GameGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <GameCard
          key={game.slug}
          game={game}
          hasWalkthrough={walkthroughSlugs.includes(game.slug)}
        />
      ))}
    </div>
  );
}
