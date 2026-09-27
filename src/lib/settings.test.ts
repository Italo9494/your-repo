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
