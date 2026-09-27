import {
  getSessionUser,
  guard,
  getUserById,
  hashPassword,
  listUsers,
  saveUsers,
  validatePassword,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  const { user: session, error } = await guard();
  if (error) return error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }
  const input = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};

  const current = await getSessionUser();
  const stored = current ? getUserById(current.id) : undefined;
  if (!stored) {
    return Response.json({ error: "Sessão inválida ou expirada." }, { status: 401 });
  }

  const currentPassword = typeof input.currentPassword === "string" ? input.currentPassword : "";
  const newPassword = input.newPassword;

  if (!verifyPassword(currentPassword, stored.passwordHash)) {
    return Response.json({ error: "A senha atual está incorreta." }, { status: 400 });
  }

  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    return Response.json({ error: passwordError }, { status: 400 });
  }

  const users = listUsers();
  const target = users.find((item) => item.id === session.id);
  if (!target) {
    return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
  }
  target.passwordHash = hashPassword(String(newPassword));
  target.updatedAt = new Date().toISOString();
  saveUsers(users);

  return Response.json({ ok: true });
}
