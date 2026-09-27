import { revalidatePath } from "next/cache";

import { contentTypeFromParam, removeContent, upsertContent } from "@/lib/content";
import { guard } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ type: string; slug: string }> },
) {
  const { type: rawType, slug } = await params;
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
  const item = typeof input.item === "object" && input.item !== null ? { ...(input.item as Record<string, unknown>) } : input;
  item.slug = slug;

  const result = upsertContent(type, item, user);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  revalidatePath("/", "layout");
  return Response.json({ ok: true, ...result.value });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ type: string; slug: string }> },
) {
  const { type: rawType, slug } = await params;
  const type = contentTypeFromParam(rawType);
  if (!type) {
    return Response.json({ error: "Tipo de conteúdo desconhecido." }, { status: 404 });
  }

  const { error } = await guard(["ADMIN"]);
  if (error) return error;

  const removed = removeContent(type, slug);
  if (!removed) {
    return Response.json({ error: "Conteúdo não encontrado." }, { status: 404 });
  }

  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
