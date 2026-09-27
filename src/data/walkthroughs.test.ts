import assert from "node:assert/strict";
import test from "node:test";

import { getWalkthrough } from "./walkthroughs";

test("pokemon-red walkthrough includes full chapter structure and gym route coverage", () => {
  const walkthrough = getWalkthrough("pokemon-red");

  assert.ok(walkthrough, "walkthrough de pokemon-red deve existir");
  assert.ok(walkthrough!.chapters.length > 0, "deve ter capítulos publicados");
  assert.equal(walkthrough!.chapters[0].title, "Pallet Town");
  assert.ok(walkthrough!.chapters.some((chapter) => chapter.title.includes("Brock") || chapter.title.includes("Pewter")));
  assert.ok(walkthrough!.chapters.some((chapter) => chapter.title.includes("Misty") || chapter.title.includes("Cerulean")));
  assert.ok(walkthrough!.chapters.some((chapter) => chapter.title.includes("Erika") || chapter.title.includes("Celadon")));
  assert.ok(walkthrough!.chapters.some((chapter) => chapter.title.includes("Lorelei") || chapter.title.includes("Elite Four") || chapter.title.includes("Indigo")));
});
