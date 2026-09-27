"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import type { Settings } from "@/lib/settings";
import {
  ErrorMessage,
  Field,
  SuccessMessage,
  buttonPrimary,
  inputClass,
} from "@/components/admin/ui";

export function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [siteName, setSiteName] = useState(initial.siteName);
  const [siteDescription, setSiteDescription] = useState(initial.siteDescription);
  const [maintenance, setMaintenance] = useState(initial.maintenance);
  const [heroMode, setHeroMode] = useState(initial.heroBackground?.mode ?? "color");
  const [heroColor, setHeroColor] = useState(initial.heroBackground?.color ?? "#f5efe9");
  const [heroImage, setHeroImage] = useState(initial.heroBackground?.image ?? "");
  const [heroOpacity, setHeroOpacity] = useState(initial.heroBackground?.opacity ?? 0.35);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          settings: {
            siteName,
            siteDescription,
            maintenance,
            heroBackground: {
              mode: heroMode,
              color: heroColor,
              image: heroImage,
              opacity: heroOpacity,
            },
          },
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Não foi possível salvar as configurações.");
        setSaving(false);
        return;
      }
      setSuccess("Configurações salvas.");
      setSaving(false);
      router.refresh();
    } catch {
      setError("Falha de conexão com o servidor.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <Field label="Nome do site">
        <input
          type="text"
          required
          minLength={2}
          maxLength={60}
          value={siteName}
          onChange={(event) => setSiteName(event.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Descrição do site" hint={`${siteDescription.length}/160 caracteres`}>
        <textarea
          required
          rows={3}
          maxLength={160}
          value={siteDescription}
          onChange={(event) => setSiteDescription(event.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Fundo da área inicial" hint="Escolha uma cor sólida ou uma imagem.">
        <div className="space-y-3">
          <select
            value={heroMode}
            onChange={(event) => setHeroMode(event.target.value as "color" | "image")}
            className={inputClass}
          >
            <option value="color">Cor sólida</option>
            <option value="image">Imagem de fundo</option>
          </select>

          {heroMode === "color" ? (
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={heroColor}
                onChange={(event) => setHeroColor(event.target.value)}
                className="h-11 w-16 rounded border border-line bg-transparent p-1"
              />
              <span className="text-sm text-muted">{heroColor}</span>
            </div>
          ) : (
            <input
              type="text"
              value={heroImage}
              onChange={(event) => setHeroImage(event.target.value)}
              placeholder="/covers/hero-bg.jpg ou URL"
              className={inputClass}
            />
          )}

          <label className="block text-sm font-medium text-ink">
            Opacidade do fundo
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={heroOpacity}
              onChange={(event) => setHeroOpacity(Number(event.target.value))}
              className="mt-2 w-full accent-[#d62e0b]"
            />
            <span className="text-xs text-muted">{heroOpacity.toFixed(2)}</span>
          </label>
        </div>
      </Field>

      <label className="flex items-start gap-3 rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 p-4">
        <input
          type="checkbox"
          checked={maintenance}
          onChange={(event) => setMaintenance(event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-line accent-[#d62e0b]"
        />
        <span>
          <span className="block text-sm font-bold text-ink">Modo manutenção</span>
          <span className="block text-xs text-muted">
            Quando ativo, o site público responde 503 para visitantes. O painel continua
            acessível para a equipe.
          </span>
        </span>
      </label>

      <button type="submit" disabled={saving} className={buttonPrimary}>
        {saving ? "Salvando..." : "Salvar configurações"}
      </button>
    </form>
  );
}
