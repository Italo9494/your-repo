"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import type { Walkthrough, WalkthroughChapter } from "@/data/types";
import { ErrorMessage, Field, SuccessMessage, buttonPrimary, buttonSecondary, inputClass, labelClass } from "@/components/admin/ui";
import { slugify } from "@/components/admin/GuideForm";

interface GameOption {
  slug: string;
  name: string;
}

interface ChapterDraft {
  slug: string;
  title: string;
  intro: string;
  objective: string;
  route: string;
  tipsText: string;
  mapNote: string;
  pokemonText: string;
  itemsText: string;
  trainersText: string;
}

function namedToList(text: string): { name: string; note: string }[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, ...rest] = line.split("|");
      return { name: name.trim(), note: rest.join("|").trim() };
    });
}

function listToNamed(items: { name: string; note: string }[]): string {
  return items.map((item) => (item.note ? `${item.name} | ${item.note}` : item.name)).join("\n");
}

function chapterToDraft(chapter: WalkthroughChapter): ChapterDraft {
  return {
    slug: chapter.slug,
    title: chapter.title,
    intro: chapter.intro,
    objective: chapter.objective,
    route: chapter.route ?? "",
    tipsText: chapter.tips.join("\n"),
    mapNote: chapter.mapNote ?? "",
    pokemonText: listToNamed(chapter.pokemon),
    itemsText: listToNamed(chapter.items),
    trainersText: listToNamed(chapter.trainers),
  };
}

function emptyChapter(): ChapterDraft {
  return {
    slug: "",
    title: "",
    intro: "",
    objective: "",
    route: "",
    tipsText: "",
    mapNote: "",
    pokemonText: "",
    itemsText: "",
    trainersText: "",
  };
}

function draftToChapter(draft: ChapterDraft, order: number): WalkthroughChapter {
  return {
    slug: draft.slug,
    title: draft.title,
    order,
    intro: draft.intro,
    objective: draft.objective,
    route: draft.route,
    pokemon: namedToList(draft.pokemonText),
    items: namedToList(draft.itemsText),
    trainers: namedToList(draft.trainersText),
    tips: draft.tipsText.split("\n").map((line) => line.trim()).filter(Boolean),
    ...(draft.mapNote.trim() ? { mapNote: draft.mapNote.trim() } : {}),
  };
}

interface Props {
  games: GameOption[];
  initial?: Walkthrough;
}

export function WalkthroughForm({ games, initial }: Props) {
  const router = useRouter();
  const editing = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(true);
  const [gameSlug, setGameSlug] = useState(initial?.gameSlug ?? games[0]?.slug ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [difficulty, setDifficulty] = useState<Walkthrough["difficulty"]>(initial?.difficulty ?? "Médio");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<"publicado" | "rascunho">(initial?.status ?? "rascunho");
  const [plannedText, setPlannedText] = useState((initial?.plannedChapters ?? []).join("\n"));
  const [chapters, setChapters] = useState<ChapterDraft[]>(
    initial ? initial.chapters.map(chapterToDraft) : [],
  );

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleTitle(value: string) {
    setTitle(value);
    if (!editing && !slugTouched) setSlug(slugify(value));
  }

  function updateChapter(index: number, patch: Partial<ChapterDraft>) {
    setChapters((current) =>
      current.map((chapter, i) => (i === index ? { ...chapter, ...patch } : chapter)),
    );
  }

  function moveChapter(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= chapters.length) return;
    setChapters((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const item = {
      slug,
      title,
      gameSlug,
      summary,
      difficulty,
      featured,
      status,
      plannedChapters: plannedText.split("\n").map((line) => line.trim()).filter(Boolean),
      chapters: chapters.map((draft, index) => draftToChapter(draft, index + 1)),
      updatedAt: initial?.updatedAt,
    };

    try {
      const response = await fetch(
        editing
          ? `/api/admin/content/detonados/${encodeURIComponent(initial!.slug)}`
          : "/api/admin/content/detonados",
        {
          method: editing ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ item }),
        },
      );
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Não foi possível salvar o detonado.");
        setSaving(false);
        return;
      }
      setSuccess(editing ? "Detonado atualizado." : "Detonado criado.");
      if (!editing) {
        router.push(`/admin/detonados/${encodeURIComponent(slug)}`);
        router.refresh();
        return;
      }
      router.refresh();
      setSaving(false);
    } catch {
      setError("Falha de conexão com o servidor.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Título">
          <input
            type="text"
            required
            value={title}
            onChange={(event) => handleTitle(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Slug" hint={editing ? "O slug não pode ser alterado após a criação." : "Gerado a partir do título."}>
          <input
            type="text"
            required
            value={slug}
            disabled={editing}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
            className={`${inputClass} disabled:opacity-60`}
            placeholder="pokemon-fire-red"
          />
        </Field>
      </div>

      <Field label="Resumo" hint={`${summary.length}/300 caracteres`}>
        <textarea
          required
          rows={3}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Jogo">
          <select value={gameSlug} onChange={(event) => setGameSlug(event.target.value)} className={inputClass}>
            {games.map((game) => (
              <option key={game.slug} value={game.slug}>
                {game.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Dificuldade">
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as Walkthrough["difficulty"])}
            className={inputClass}
          >
            <option value="Fácil">Fácil</option>
            <option value="Médio">Médio</option>
            <option value="Difícil">Difícil</option>
          </select>
        </Field>
        <Field label="Status">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as "publicado" | "rascunho")}
            className={inputClass}
          >
            <option value="rascunho">Rascunho</option>
            <option value="publicado">Publicado</option>
          </select>
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) => setFeatured(event.target.checked)}
            className="h-4 w-4 rounded border-line accent-[#d62e0b]"
          />
          Destacar na home
        </label>
        {editing && initial?.updatedAt ? (
          <p className="text-xs text-muted">Última atualização: {initial.updatedAt}</p>
        ) : null}
      </div>

      <Field label="Capítulos planejados (opcional)" hint="Um nome por linha, para detonados em produção.">
        <textarea
          rows={2}
          value={plannedText}
          onChange={(event) => setPlannedText(event.target.value)}
          className={`${inputClass} font-mono text-[13px]`}
        />
      </Field>

      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">
            Capítulos ({chapters.length})
          </p>
          <button
            type="button"
            onClick={() => setChapters([...chapters, emptyChapter()])}
            className={buttonSecondary}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Adicionar capítulo
          </button>
        </div>

        <div className="mt-3 space-y-4">
          {chapters.map((chapter, index) => (
            <div key={index} className="rounded-2xl border border-line bg-canvas p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  Etapa {index + 1}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="rounded-lg border border-line bg-surface p-1.5 text-ink hover:border-brand-blue hover:text-brand-blue disabled:opacity-40"
                    onClick={() => moveChapter(index, -1)}
                    disabled={index === 0}
                    aria-label={`Mover etapa ${index + 1} para cima`}
                  >
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-line bg-surface p-1.5 text-ink hover:border-brand-blue hover:text-brand-blue disabled:opacity-40"
                    onClick={() => moveChapter(index, 1)}
                    disabled={index === chapters.length - 1}
                    aria-label={`Mover etapa ${index + 1} para baixo`}
                  >
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-line bg-surface p-1.5 text-brand-red-dark hover:border-brand-red hover:bg-brand-red hover:text-white"
                    onClick={() => setChapters(chapters.filter((_, i) => i !== index))}
                    aria-label={`Remover etapa ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field label="Título da etapa">
                  <input
                    type="text"
                    value={chapter.title}
                    onChange={(event) => {
                      const patch: Partial<ChapterDraft> = { title: event.target.value };
                      if (!editing && !chapter.slug) patch.slug = slugify(event.target.value);
                      updateChapter(index, patch);
                    }}
                    className={inputClass}
                  />
                </Field>
                <Field label="Slug da etapa">
                  <input
                    type="text"
                    value={chapter.slug}
                    onChange={(event) => updateChapter(index, { slug: slugify(event.target.value) })}
                    className={inputClass}
                    placeholder="pallet-town"
                  />
                </Field>
              </div>

              <div className="mt-3 space-y-3">
                <Field label="Introdução">
                  <textarea
                    rows={2}
                    value={chapter.intro}
                    onChange={(event) => updateChapter(index, { intro: event.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Objetivo">
                  <input
                    type="text"
                    value={chapter.objective}
                    onChange={(event) => updateChapter(index, { objective: event.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Rota / passo a passo" hint="Opcional. Texto livre descrevendo o caminho.">
                  <textarea
                    rows={3}
                    value={chapter.route}
                    onChange={(event) => updateChapter(index, { route: event.target.value })}
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Pokémon da etapa" hint="Um por linha: Nome | observação">
                    <textarea
                      rows={3}
                      value={chapter.pokemonText}
                      onChange={(event) => updateChapter(index, { pokemonText: event.target.value })}
                      className={`${inputClass} font-mono text-[13px]`}
                      placeholder="Rattata | Encontrado na Rota 1"
                    />
                  </Field>
                  <Field label="Itens da etapa" hint="Um por linha: Nome | observação">
                    <textarea
                      rows={3}
                      value={chapter.itemsText}
                      onChange={(event) => updateChapter(index, { itemsText: event.target.value })}
                      className={`${inputClass} font-mono text-[13px]`}
                      placeholder="Potion | Na casa da Rota 1"
                    />
                  </Field>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Treinadores" hint="Um por linha: Nome | observação">
                    <textarea
                      rows={3}
                      value={chapter.trainersText}
                      onChange={(event) => updateChapter(index, { trainersText: event.target.value })}
                      className={`${inputClass} font-mono text-[13px]`}
                      placeholder="Agente Jake | 2x Rattata nível 9"
                    />
                  </Field>
                  <div className="space-y-3">
                    <Field label="Dicas da etapa" hint="Uma dica por linha.">
                      <textarea
                        rows={3}
                        value={chapter.tipsText}
                        onChange={(event) => updateChapter(index, { tipsText: event.target.value })}
                        className={`${inputClass} font-mono text-[13px]`}
                      />
                    </Field>
                    <Field label="Nota de mapa (opcional)">
                      <input
                        type="text"
                        value={chapter.mapNote}
                        onChange={(event) => updateChapter(index, { mapNote: event.target.value })}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {chapters.length === 0 ? (
            <p className={labelClass}>Nenhum capítulo adicionado ainda.</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <button type="submit" disabled={saving} className={buttonPrimary}>
          {saving ? "Salvando..." : editing ? "Salvar alterações" : "Criar detonado"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/detonados")}
          className={buttonSecondary}
        >
          Voltar
        </button>
      </div>
    </form>
  );
}
