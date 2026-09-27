import { revalidatePath } from "next/cache";

import { guard } from "@/lib/auth";
import { getSettings, saveSettings, validateSettings } from "@/lib/settings";

export async function GET() {
  const { error } = await guard(["ADMIN"]);
  if (error) return error;
  return Response.json({ settings: getSettings() });
}

export async function PUT(request: Request) {
  const { error } = await guard(["ADMIN"]);
  if (error) return error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const input =
    typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const candidate = input.settings ?? input;
  const result = validateSettings(candidate);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  saveSettings(result.value);
  revalidatePath("/", "layout");
  return Response.json({ ok: true, settings: result.value });
}
