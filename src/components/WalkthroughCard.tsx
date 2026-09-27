import Link from "next/link";

import { Badge } from "@/components/Badge";
import { CoverArt } from "@/components/CoverArt";
import { ProgressBar } from "@/components/ProgressBar";
import { getGame } from "@/data/games";
import type { Walkthrough } from "@/data/types";

interface WalkthroughCardProps {
  walkthrough: Walkthrough;
  completedSlugs?: string[];
}

export function WalkthroughCard({ walkthrough, completedSlugs = [] }: WalkthroughCardProps) {
  const game = getGame(walkthrough.gameSlug);
  const total = walkthrough.chapters.length;
  const completed = walkthrough.chapters.filter((chapter) =>
    completedSlugs.includes(chapter.slug),
  ).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const firstPending = walkthrough.chapters.find(
    (chapter) => !completedSlugs.includes(chapter.slug),
  );
  const target =
    total > 0
      ? `/detonado/${walkthrough.slug}/${(firstPending ?? walkthrough.chapters[0]).slug}`
      : `/detonado/${walkthrough.slug}`;

  return (
    <article className="group card-hover flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
      <Link href={`/detonado/${walkthrough.slug}`} className="block">
        <CoverArt
          title={game?.name ?? walkthrough.title}
          colors={game?.colors ?? ["#2a75bb", "#1d5a94"]}
          cover={game?.cover}
          className="h-40 w-full transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">{game?.region ?? "—"}</Badge>
          <Badge tone={walkthrough.difficulty === "Difícil" ? "red" : "yellow"}>
            {walkthrough.difficulty}
          </Badge>
          <Badge tone="green">
            {total > 0
              ? `${total} etapas`
              : `${walkthrough.plannedChapters?.length ?? 0} planejadas`}
          </Badge>
        </div>

        <h3 className="text-lg font-bold leading-snug text-ink">
          <Link
            href={`/detonado/${walkthrough.slug}`}
            className="transition-colors hover:text-brand-blue"
          >
            {walkthrough.title}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-muted">{walkthrough.summary}</p>

        {total > 0 ? (
          <div className="mt-1 space-y-1.5">
            <ProgressBar value={percent} label="Progresso" />
            <p className="text-xs text-muted">
              {completed > 0
                ? `Você concluiu ${completed} de ${total} etapas.`
                : "Nenhuma etapa concluída ainda."}
            </p>
          </div>
        ) : (
          <p className="rounded-xl bg-canvas px-3 py-2 text-xs text-muted">
            Detonado em produção · veja os capítulos planejados na página.
          </p>
        )}

        <Link
          href={target}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue-dark"
        >
          {completed > 0 ? "Continuar detonado" : "Começar detonado"}
        </Link>
      </div>
    </article>
  );
}
