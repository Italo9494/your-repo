import { hashPassword, guard, listUsers, saveUsers, validatePassword, type Role, type StoredUser } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(user: StoredUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function GET() {
  const { error } = await guard(["ADMIN"]);
  if (error) return error;
  return Response.json({ users: listUsers().map(sanitize) });
}

export async function POST(request: Request) {
  const { error } = await guard(["ADMIN"]);
  if (error) return error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }
  const input = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const role: Role = input.role === "ADMIN" || input.role === "EDITOR" ? input.role : "EDITOR";
  const passwordError = validatePassword(input.password);

  if (name.length < 2 || name.length > 80) {
    return Response.json({ error: "Nome deve ter entre 2 e 80 caracteres." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "E-mail inválido." }, { status: 400 });
  }
  if (passwordError) {
    return Response.json({ error: passwordError }, { status: 400 });
  }
  if (listUsers().some((user) => user.email.toLowerCase() === email)) {
    return Response.json({ error: "Já existe uma conta com este e-mail." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const created: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    role,
    active: true,
    passwordHash: hashPassword(String(input.password)),
    createdAt: now,
    updatedAt: now,
  };
  saveUsers([...listUsers(), created]);
  return Response.json({ ok: true, user: sanitize(created) }, { status: 201 });
}
