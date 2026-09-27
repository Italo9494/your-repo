import test from "node:test";
import assert from "node:assert/strict";

import { validateSettings } from "./settings";

test("validateSettings accepts hero background configuration", () => {
  const result = validateSettings({
    siteName: "PokéDetonado",
    siteDescription: "Descrição do site para testar",
    maintenance: false,
    heroBackground: {
      mode: "image",
      color: "#ffffff",
      image: "/covers/hero-bg.jpg",
      opacity: 0.35,
    },
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.value.heroBackground?.mode, "image");
  assert.equal(result.value.heroBackground?.image, "/covers/hero-bg.jpg");
});

test("validateSettings rejects invalid hero background mode", () => {
  const result = validateSettings({
    siteName: "PokéDetonado",
    siteDescription: "Descrição do site para testar",
    maintenance: false,
    heroBackground: {
      mode: "invalid",
      color: "#ffffff",
      opacity: 0.5,
    },
  });

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.error, /modo do fundo/i);
});

test("validateSettings accepts custom hero text and typography values", () => {
  const result = validateSettings({
    siteName: "PokéDetonado",
    siteDescription: "Descrição do site para testar",
    maintenance: false,
    heroBackground: {
      mode: "color",
      color: "#f5efe9",
      opacity: 0.35,
    },
    heroBadge: "Guia independente em português",
    heroTitle: "Detonados de Pokémon completos e incríveis",
    heroSubtitle:
      "Guias passo a passo para acompanhar sua aventura do primeiro passo à Liga Pokémon.",
    heroPrimaryButton: "Ver detonados",
    heroSecondaryButton: "Explorar jogos",
    heroTextColor: "#111827",
    heroTitleSize: 58,
    heroSubtitleSize: 18,
    heroFontFamily: "'Trebuchet MS', sans-serif",
    heroAccentColor: "#d62e0b",
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.value.heroText.title, "Detonados de Pokémon completos e incríveis");
  assert.equal(result.value.heroText.accentColor, "#d62e0b");
  assert.equal(result.value.heroText.titleSize, 58);
  assert.equal(result.value.heroText.fontFamily, "'Trebuchet MS', sans-serif");
});
