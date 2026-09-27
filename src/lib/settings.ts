import { readOrSeed, writeJson } from "@/lib/storage";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export interface HeroBackgroundSettings {
  mode: "color" | "image";
  color: string;
  image: string;
  opacity: number;
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  maintenance: boolean;
  heroBackground: HeroBackgroundSettings;
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

  const modeValue = heroBackgroundRaw.mode;
  if (modeValue !== undefined && modeValue !== "color" && modeValue !== "image") {
    return { ok: false, error: "O modo do fundo deve ser 'color' ou 'image'." };
  }

  const mode = modeValue === "image" || modeValue === "color" ? modeValue : "color";
  const color = typeof heroBackgroundRaw.color === "string" ? heroBackgroundRaw.color : "#f5efe9";
  const image = typeof heroBackgroundRaw.image === "string" ? heroBackgroundRaw.image : "";
  const opacity = typeof heroBackgroundRaw.opacity === "number" ? heroBackgroundRaw.opacity : 0.35;

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
    },
  };
}
