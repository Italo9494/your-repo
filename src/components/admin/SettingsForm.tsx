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
  const [heroBadge, setHeroBadge] = useState(initial.heroText?.badge ?? "Guia independente em português");
  const [heroTitle, setHeroTitle] = useState(
    initial.heroText?.title ?? "Detonados de Pokémon completos e fáceis de seguir",
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    initial.heroText?.subtitle ??
      "Guias passo a passo para acompanhar sua aventura do primeiro passo à Liga Pokémon: rotas, cidades, ginásios, itens importantes e dicas de quem já atravessou cada região.",
  );
  const [heroPrimaryButton, setHeroPrimaryButton] = useState(
    initial.heroText?.primaryButton ?? "Ver detonados",
  );
  const [heroSecondaryButton, setHeroSecondaryButton] = useState(
    initial.heroText?.secondaryButton ?? "Explorar jogos",
  );
  const [heroTextColor, setHeroTextColor] = useState(initial.heroText?.textColor ?? "#111827");
  const [heroTitleSize, setHeroTitleSize] = useState(initial.heroText?.titleSize ?? 64);
  const [heroSubtitleSize, setHeroSubtitleSize] = useState(initial.heroText?.subtitleSize ?? 19);
  const [heroFontFamily, setHeroFontFamily] = useState(
    initial.heroText?.fontFamily ?? "inherit",
  );
  const [heroAccentColor, setHeroAccentColor] = useState(
    initial.heroText?.accentColor ?? "#d62e0b",
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const previewBackgroundStyle =
    heroMode === "image" && heroImage
      ? {
          backgroundColor: heroColor,
          backgroundImage: `linear-gradient(rgba(255,255,255,${1 - heroOpacity}), rgba(255,255,255,${1 - heroOpacity})), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: heroOpacity,
        }
      : {
          backgroundColor: heroColor,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(227,53,13,0.3) 0, transparent 45%), radial-gradient(circle at 80% 30%, rgba(42,117,187,0.28) 0, transparent 45%), radial-gradient(circle at 50% 90%, rgba(255,203,5,0.25) 0, transparent 40%)",
          opacity: heroOpacity,
        };

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
            heroText: {
              badge: heroBadge,
              title: heroTitle,
              subtitle: heroSubtitle,
              primaryButton: heroPrimaryButton,
              secondaryButton: heroSecondaryButton,
              textColor: heroTextColor,
              titleSize: heroTitleSize,
              subtitleSize: heroSubtitleSize,
              fontFamily: heroFontFamily,
              accentColor: heroAccentColor,
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-ink">Dados gerais</h2>
              <p className="mt-1 text-sm text-muted">Identidade principal do site e estado de operação.</p>
            </div>

            <div className="space-y-4">
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
                    Quando ativo, o site público responde 503 para visitantes.
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-ink">Fundo da área inicial</h2>
              <p className="mt-1 text-sm text-muted">Escolha uma cor sólida ou uma imagem para o banner principal.</p>
            </div>

            <div className="space-y-4">
              <Field label="Tipo de fundo">
                <select
                  value={heroMode}
                  onChange={(event) => setHeroMode(event.target.value as "color" | "image")}
                  className={inputClass}
                >
                  <option value="color">Cor sólida</option>
                  <option value="image">Imagem de fundo</option>
                </select>
              </Field>

              {heroMode === "color" ? (
                <Field label="Cor do fundo">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={heroColor}
                      onChange={(event) => setHeroColor(event.target.value)}
                      className="h-11 w-16 rounded border border-line bg-transparent p-1"
                    />
                    <span className="text-sm text-muted">{heroColor}</span>
                  </div>
                </Field>
              ) : (
                <Field label="Imagem de fundo" hint="Use uma URL pública ou caminho dentro do projeto.">
                  <input
                    type="text"
                    value={heroImage}
                    onChange={(event) => setHeroImage(event.target.value)}
                    placeholder="/covers/hero-bg.jpg ou URL"
                    className={inputClass}
                  />
                </Field>
              )}

              <Field label="Opacidade do fundo">
                <div className="space-y-2">
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
                </div>
              </Field>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-ink">Texto e tipografia</h2>
              <p className="mt-1 text-sm text-muted">Ajuste a mensagem do banner, o estilo e os botões.</p>
            </div>

            <div className="space-y-4">
              <Field label="Badge">
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(event) => setHeroBadge(event.target.value)}
                  placeholder="Guia independente em português"
                  className={inputClass}
                />
              </Field>

              <Field label="Título">
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(event) => setHeroTitle(event.target.value)}
                  placeholder="Detonados de Pokémon completos e fáceis de seguir"
                  className={inputClass}
                />
              </Field>

              <Field label="Subtítulo">
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(event) => setHeroSubtitle(event.target.value)}
                  placeholder="Texto principal da área inicial"
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Botão principal">
                  <input
                    type="text"
                    value={heroPrimaryButton}
                    onChange={(event) => setHeroPrimaryButton(event.target.value)}
                    placeholder="Ver detonados"
                    className={inputClass}
                  />
                </Field>
                <Field label="Botão secundário">
                  <input
                    type="text"
                    value={heroSecondaryButton}
                    onChange={(event) => setHeroSecondaryButton(event.target.value)}
                    placeholder="Explorar jogos"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cor do texto">
                  <input
                    type="color"
                    value={heroTextColor}
                    onChange={(event) => setHeroTextColor(event.target.value)}
                    className="h-11 w-full rounded border border-line bg-transparent p-1"
                  />
                </Field>
                <Field label="Cor de destaque">
                  <input
                    type="color"
                    value={heroAccentColor}
                    onChange={(event) => setHeroAccentColor(event.target.value)}
                    className="h-11 w-full rounded border border-line bg-transparent p-1"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Tamanho do título">
                  <input
                    type="number"
                    min={24}
                    max={120}
                    value={heroTitleSize}
                    onChange={(event) => setHeroTitleSize(Number(event.target.value))}
                    className={inputClass}
                  />
                </Field>
                <Field label="Tamanho do subtítulo">
                  <input
                    type="number"
                    min={12}
                    max={40}
                    value={heroSubtitleSize}
                    onChange={(event) => setHeroSubtitleSize(Number(event.target.value))}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Família da fonte">
                <input
                  type="text"
                  value={heroFontFamily}
                  onChange={(event) => setHeroFontFamily(event.target.value)}
                  placeholder="inherit, 'Trebuchet MS', sans-serif"
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-ink">Prévia ao vivo</h2>
              <p className="mt-1 text-sm text-muted">Veja o banner principal refletindo as alterações em tempo real.</p>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-line bg-surface shadow-soft">
              <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface">
                <div aria-hidden="true" className="absolute inset-0" style={previewBackgroundStyle} />

                <div className="relative p-4 sm:p-5">
                  <span
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: heroTextColor, fontFamily: heroFontFamily }}
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: heroAccentColor }}
                    />
                    {heroBadge || "Badge"}
                  </span>

                  <h3
                    className="mt-4 font-extrabold leading-[1.08] tracking-tight"
                    style={{
                      color: heroTextColor,
                      fontFamily: heroFontFamily,
                      fontSize: `${heroTitleSize}px`,
                    }}
                  >
                    {heroTitle || "Seu título aqui"}
                  </h3>

                  <p
                    className="mt-3 max-w-lg text-sm leading-relaxed"
                    style={{
                      color: heroTextColor,
                      fontFamily: heroFontFamily,
                      fontSize: `${heroSubtitleSize}px`,
                    }}
                  >
                    {heroSubtitle || "Seu subtítulo vai aparecer aqui."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-full px-4 py-2 text-xs font-bold text-white"
                      style={{ backgroundColor: heroAccentColor }}
                    >
                      {heroPrimaryButton || "Ver detonados"}
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold"
                      style={{ color: heroTextColor, fontFamily: heroFontFamily }}
                    >
                      {heroSecondaryButton || "Explorar jogos"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={saving} className={buttonPrimary}>
          {saving ? "Salvando..." : "Salvar configurações"}
        </button>
      </div>
    </form>
  );
}
