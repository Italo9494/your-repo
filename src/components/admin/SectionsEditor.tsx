"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import type { GuideSection } from "@/data/types";
import { buttonSecondary, inputClass, labelClass } from "@/components/admin/ui";

export interface SectionDraft {
  heading: string;
  paragraphsText: string;
  bulletsText: string;
}

export function sectionsToDrafts(sections: GuideSection[]): SectionDraft[] {
  return sections.map((section) => ({
    heading: section.heading,
    paragraphsText: section.paragraphs.join("\n"),
    bulletsText: (section.bullets ?? []).join("\n"),
  }));
}

export function draftsToSections(drafts: SectionDraft[]): GuideSection[] {
  return drafts
    .map((draft) => {
      const paragraphs = draft.paragraphsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const bullets = draft.bulletsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      return {
        heading: draft.heading.trim(),
        paragraphs,
        ...(bullets.length > 0 ? { bullets } : {}),
      };
    })
    .filter((section) => section.heading && section.paragraphs.length > 0);
}

function emptyDraft(): SectionDraft {
  return { heading: "", paragraphsText: "", bulletsText: "" };
}

export function SectionsEditor({
  value,
  onChange,
}: {
  value: SectionDraft[];
  onChange: (next: SectionDraft[]) => void;
}) {
  function update(index: number, patch: Partial<SectionDraft>) {
    onChange(value.map((section, i) => (i === index ? { ...section, ...patch } : section)));
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      {value.map((section, index) => (
        <div key={index} className="rounded-2xl border border-line bg-canvas p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Seção {index + 1}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="rounded-lg border border-line bg-surface p-1.5 text-ink hover:border-brand-blue hover:text-brand-blue disabled:opacity-40"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Mover seção ${index + 1} para cima`}
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="rounded-lg border border-line bg-surface p-1.5 text-ink hover:border-brand-blue hover:text-brand-blue disabled:opacity-40"
                onClick={() => move(index, 1)}
                disabled={index === value.length - 1}
                aria-label={`Mover seção ${index + 1} para baixo`}
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="rounded-lg border border-line bg-surface p-1.5 text-brand-red-dark hover:border-brand-red hover:bg-brand-red hover:text-white"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                aria-label={`Remover seção ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            <label className="block">
              <span className={labelClass}>Título da seção</span>
              <input
                type="text"
                value={section.heading}
                onChange={(event) => update(index, { heading: event.target.value })}
                className={`mt-1.5 ${inputClass}`}
                placeholder="Ex.: Escolha do inicial"
              />
            </label>
            <label className="block">
              <span className={labelClass}>Parágrafos</span>
              <span className="mt-1 block text-xs text-muted">Uma linha de texto por parágrafo.</span>
              <textarea
                value={section.paragraphsText}
                onChange={(event) => update(index, { paragraphsText: event.target.value })}
                rows={4}
                className={`mt-1.5 ${inputClass} font-mono text-[13px]`}
                placeholder={"Primeiro parágrafo\nSegundo parágrafo"}
              />
            </label>
            <label className="block">
              <span className={labelClass}>Tópicos (opcional)</span>
              <span className="mt-1 block text-xs text-muted">Um tópico por linha.</span>
              <textarea
                value={section.bulletsText}
                onChange={(event) => update(index, { bulletsText: event.target.value })}
                rows={2}
                className={`mt-1.5 ${inputClass} font-mono text-[13px]`}
                placeholder={"Primeiro tópico\nSegundo tópico"}
              />
            </label>
          </div>
        </div>
      ))}

      <button type="button" onClick={() => onChange([...value, emptyDraft()])} className={buttonSecondary}>
        <Plus className="h-4 w-4" aria-hidden="true" />
        Adicionar seção
      </button>
      {value.length === 0 ? (
        <p className="text-xs font-semibold text-brand-red-dark">
          Adicione ao menos uma seção antes de salvar.
        </p>
      ) : null}
    </div>
  );
}
