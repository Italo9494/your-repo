import { revalidatePath } from "next/cache";

import { contentTypeFromParam, upsertContent } from "@/lib/content";
import { guard } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type: rawType } = await params;
  const type = contentTypeFromParam(rawType);
  if (!type) {
    return Response.json({ error: "Tipo de conteúdo desconhecido." }, { status: 404 });
  }

  const { user, error } = await guard();
  if (error) return error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const input =
    typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const result = upsertContent(type, input.item ?? input, user);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  revalidatePath("/", "layout");
  return Response.json({ ok: true, ...result.value }, { status: result.value.created ? 201 : 200 });
}
