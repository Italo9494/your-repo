import { readOrSeed, writeJson } from "@/lib/storage";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export interface HeroBackgroundSettings {
  mode: "color" | "image";
  color: string;
  image: string;
  opacity: number;
}

export interface HeroTextSettings {
  badge: string;
  title: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  textColor: string;
  titleSize: number;
  subtitleSize: number;
  fontFamily: string;
  accentColor: string;
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  maintenance: boolean;
  heroBackground: HeroBackgroundSettings;
  heroText: HeroTextSettings;
}

const FILE = "settings.json";

function seed(): Settings {
  return {
    siteName: SITE_NAME,
    siteDescription: SITE_DESCRIPTION,
    maintenance: false,
    heroBackground: {
      mode: "color",
      color: "#f5efe9",
      image: "",
      opacity: 0.35,
    },
    heroText: {
      badge: "Guia independente em português",
      title: "Detonados de Pokémon completos e fáceis de seguir",
      subtitle:
        "Guias passo a passo para acompanhar sua aventura do primeiro passo à Liga Pokémon: rotas, cidades, ginásios, itens importantes e dicas de quem já atravessou cada região.",
      primaryButton: "Ver detonados",
      secondaryButton: "Explorar jogos",
      textColor: "#111827",
      titleSize: 64,
      subtitleSize: 19,
      fontFamily: "inherit",
      accentColor: "#d62e0b",
    },
  };
}

export function getSettings(): Settings {
  const value = readOrSeed(FILE, seed) as Partial<Settings>;
  const fallback = seed();
  return {
    ...fallback,
    ...value,
    heroBackground: {
      ...fallback.heroBackground,
      ...(value.heroBackground ?? {}),
    },
    heroText: {
      ...fallback.heroText,
      ...(value.heroText ?? {}),
    },
  };
}

export function saveSettings(next: Settings): void {
  writeJson(FILE, next);
}

export function validateSettings(
  input: unknown,
): { ok: true; value: Settings } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Configurações inválidas." };
  }
  const raw = input as Record<string, unknown>;
  const siteName = typeof raw.siteName === "string" ? raw.siteName.trim() : "";
  const siteDescription =
    typeof raw.siteDescription === "string" ? raw.siteDescription.trim() : "";
  const maintenance = raw.maintenance === true;
  const heroBackgroundRaw =
    typeof raw.heroBackground === "object" && raw.heroBackground !== null
      ? (raw.heroBackground as Record<string, unknown>)
      : {};

  const heroTextRaw =
    typeof raw.heroText === "object" && raw.heroText !== null
      ? (raw.heroText as Record<string, unknown>)
      : {};

  const heroBadgeInput = (raw.heroBadge ?? heroTextRaw.badge) as unknown;
  const heroTitleInput = (raw.heroTitle ?? heroTextRaw.title) as unknown;
  const heroSubtitleInput = (raw.heroSubtitle ?? heroTextRaw.subtitle) as unknown;
  const heroPrimaryButtonInput = (raw.heroPrimaryButton ?? heroTextRaw.primaryButton) as unknown;
  const heroSecondaryButtonInput = (raw.heroSecondaryButton ?? heroTextRaw.secondaryButton) as unknown;
  const heroTextColorInput = (raw.heroTextColor ?? heroTextRaw.textColor) as unknown;
  const heroTitleSizeInput = (raw.heroTitleSize ?? heroTextRaw.titleSize) as unknown;
  const heroSubtitleSizeInput = (raw.heroSubtitleSize ?? heroTextRaw.subtitleSize) as unknown;
  const heroFontFamilyInput = (raw.heroFontFamily ?? heroTextRaw.fontFamily) as unknown;
  const heroAccentColorInput = (raw.heroAccentColor ?? heroTextRaw.accentColor) as unknown;

  const modeValue = heroBackgroundRaw.mode;
  if (modeValue !== undefined && modeValue !== "color" && modeValue !== "image") {
    return { ok: false, error: "O modo do fundo deve ser 'color' ou 'image'." };
  }

  const mode = modeValue === "image" || modeValue === "color" ? modeValue : "color";
  const color = typeof heroBackgroundRaw.color === "string" ? heroBackgroundRaw.color : "#f5efe9";
  const image = typeof heroBackgroundRaw.image === "string" ? heroBackgroundRaw.image : "";
  const opacity = typeof heroBackgroundRaw.opacity === "number" ? heroBackgroundRaw.opacity : 0.35;

  const badge = typeof heroBadgeInput === "string" ? heroBadgeInput.trim() : "Guia independente em português";
  const heroTitle = typeof heroTitleInput === "string" ? heroTitleInput.trim() : "Detonados de Pokémon completos e fáceis de seguir";
  const heroSubtitle =
    typeof heroSubtitleInput === "string"
      ? heroSubtitleInput.trim()
      : "Guias passo a passo para acompanhar sua aventura do primeiro passo à Liga Pokémon: rotas, cidades, ginásios, itens importantes e dicas de quem já atravessou cada região.";
  const primaryButton = typeof heroPrimaryButtonInput === "string" ? heroPrimaryButtonInput.trim() : "Ver detonados";
  const secondaryButton = typeof heroSecondaryButtonInput === "string" ? heroSecondaryButtonInput.trim() : "Explorar jogos";
  const textColor = typeof heroTextColorInput === "string" ? heroTextColorInput : "#111827";
  const titleSize = typeof heroTitleSizeInput === "number" ? heroTitleSizeInput : 64;
  const subtitleSize = typeof heroSubtitleSizeInput === "number" ? heroSubtitleSizeInput : 19;
  const fontFamily = typeof heroFontFamilyInput === "string" ? heroFontFamilyInput : "inherit";
  const accentColor = typeof heroAccentColorInput === "string" ? heroAccentColorInput : "#d62e0b";

  if (siteName.length < 2 || siteName.length > 60) {
    return { ok: false, error: "O nome do site deve ter entre 2 e 60 caracteres." };
  }
  if (siteDescription.length < 10 || siteDescription.length > 220) {
    return { ok: false, error: "A descrição deve ter entre 10 e 220 caracteres." };
  }
  if ((mode === "image" && !image.trim()) || (mode === "color" && !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color))) {
    return { ok: false, error: "O modo do fundo deve ter uma cor válida ou uma imagem definida." };
  }
  if (opacity < 0 || opacity > 1) {
    return { ok: false, error: "A opacidade do fundo deve estar entre 0 e 1." };
  }
  if (titleSize < 24 || titleSize > 120) {
    return { ok: false, error: "O tamanho do título deve estar entre 24 e 120 pixels." };
  }
  if (subtitleSize < 12 || subtitleSize > 40) {
    return { ok: false, error: "O tamanho do subtítulo deve estar entre 12 e 40 pixels." };
  }

  return {
    ok: true,
    value: {
      siteName,
      siteDescription,
      maintenance,
      heroBackground: {
        mode,
        color,
        image: image.trim(),
        opacity,
      },
      heroText: {
        badge,
        title: heroTitle,
        subtitle: heroSubtitle,
        primaryButton,
        secondaryButton,
        textColor,
        titleSize,
        subtitleSize,
        fontFamily,
        accentColor,
      },
      heroBadge: badge,
      heroTitle: heroTitle,
      heroSubtitle: heroSubtitle,
      heroPrimaryButton: primaryButton,
      heroSecondaryButton: secondaryButton,
      heroTextColor: textColor,
      heroTitleSize: titleSize,
      heroSubtitleSize: subtitleSize,
      heroFontFamily: fontFamily,
      heroAccentColor: accentColor,
    },
  };
}
