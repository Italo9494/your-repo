"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import type { TipArticle } from "@/data/types";
import { ErrorMessage, Field, SuccessMessage, buttonPrimary, buttonSecondary, inputClass } from "@/components/admin/ui";
import { slugify } from "@/components/admin/GuideForm";
import {
  SectionsEditor,
  draftsToSections,
  sectionsToDrafts,
  type SectionDraft,
} from "@/components/admin/SectionsEditor";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

interface Props {
  categories: string[];
  initial?: TipArticle;
}

export function TipForm({ categories, initial }: Props) {
  const router = useRouter();
  const editing = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(true);
  const [category, setCategory] = useState(initial?.category ?? categories[0] ?? "Exploração");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [date, setDate] = useState(initial?.date ?? today());
  const [readTime, setReadTime] = useState(initial?.readTime ?? 4);
  const [firstColor, setFirstColor] = useState(initial?.colors[0] ?? "#3aa655");
  const [secondColor, setSecondColor] = useState(initial?.colors[1] ?? "#1f6d38");
  const [status, setStatus] = useState<"publicado" | "rascunho">(initial?.status ?? "rascunho");
  const [sections, setSections] = useState<SectionDraft[]>(
    initial ? sectionsToDrafts(initial.sections) : [],
  );

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleTitle(value: string) {
    setTitle(value);
    if (!editing && !slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const item = {
      slug,
      title,
      category,
      summary,
      date,
      readTime: Number(readTime),
      colors: [firstColor, secondColor],
      status,
      sections: draftsToSections(sections),
    };

    try {
      const response = await fetch(
        editing ? `/api/admin/content/dicas/${encodeURIComponent(initial!.slug)}` : "/api/admin/content/dicas",
        {
          method: editing ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ item }),
        },
      );
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Não foi possível salvar a dica.");
        setSaving(false);
        return;
      }
      setSuccess(editing ? "Dica atualizada." : "Dica criada.");
      if (!editing) {
        router.push(`/admin/dicas/${encodeURIComponent(slug)}`);
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
            placeholder="minha-dica"
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
        <Field label="Categoria">
          <input
            type="text"
            required
            list="dicas-categorias"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputClass}
          />
          <datalist id="dicas-categorias">
            {categories.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </Field>
        <Field label="Data de publicação">
          <input
            type="date"
            required
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Tempo de leitura (min)">
          <input
            type="number"
            min={1}
            max={240}
            required
            value={readTime}
            onChange={(event) => setReadTime(Number(event.target.value))}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
        <Field label="Cor primária da capa">
          <input
            type="color"
            value={firstColor}
            onChange={(event) => setFirstColor(event.target.value)}
            className="h-11 w-full cursor-pointer rounded-xl border border-line bg-surface p-1"
          />
        </Field>
        <Field label="Cor secundária da capa">
          <input
            type="color"
            value={secondColor}
            onChange={(event) => setSecondColor(event.target.value)}
            className="h-11 w-full cursor-pointer rounded-xl border border-line bg-surface p-1"
          />
        </Field>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted">Seções do artigo</p>
        <div className="mt-2">
          <SectionsEditor value={sections} onChange={setSections} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <button type="submit" disabled={saving} className={buttonPrimary}>
          {saving ? "Salvando..." : editing ? "Salvar alterações" : "Criar dica"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/dicas")}
          className={buttonSecondary}
        >
          Voltar
        </button>
      </div>
    </form>
  );
}
