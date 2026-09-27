import {
  guard,
  hashPassword,
  listUsers,
  saveUsers,
  validatePassword,
  type Role,
} from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(user: ReturnType<typeof listUsers>[number]) {
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { user: session, error } = await guard(["ADMIN"]);
  if (error) return error;

  const users = listUsers();
  const target = users.find((item) => item.id === id);
  if (!target) {
    return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }
  const input = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};

  const isSelf = session.id === target.id;
  const nextRole: Role =
    input.role === undefined ? target.role : input.role === "ADMIN" || input.role === "EDITOR" ? input.role : target.role;
  const nextActive = typeof input.active === "boolean" ? input.active : target.active;

  if (isSelf && nextRole !== target.role) {
    return Response.json({ error: "Você não pode alterar o próprio papel de acesso." }, { status: 403 });
  }
  if (isSelf && !nextActive) {
    return Response.json({ error: "Você não pode desativar a própria conta." }, { status: 403 });
  }

  if (target.role === "ADMIN" && (nextRole !== "ADMIN" || !nextActive)) {
    const remainingAdmins = users.filter(
      (item) => item.id !== target.id && item.role === "ADMIN" && item.active,
    );
    if (remainingAdmins.length === 0) {
      return Response.json(
        { error: "É obrigatório manter pelo menos um administrador ativo." },
        { status: 400 },
      );
    }
  }

  if (input.name !== undefined) {
    const name = typeof input.name === "string" ? input.name.trim() : "";
    if (name.length < 2 || name.length > 80) {
      return Response.json({ error: "Nome deve ter entre 2 e 80 caracteres." }, { status: 400 });
    }
    target.name = name;
  }

  if (input.email !== undefined) {
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "E-mail inválido." }, { status: 400 });
    }
    if (users.some((item) => item.id !== target.id && item.email.toLowerCase() === email)) {
      return Response.json({ error: "Já existe uma conta com este e-mail." }, { status: 400 });
    }
    target.email = email;
  }

  if (input.password !== undefined && input.password !== "") {
    const passwordError = validatePassword(input.password);
    if (passwordError) {
      return Response.json({ error: passwordError }, { status: 400 });
    }
    target.passwordHash = hashPassword(String(input.password));
  }

  target.role = nextRole;
  target.active = nextActive;
  target.updatedAt = new Date().toISOString();

  saveUsers(users);
  return Response.json({ ok: true, user: sanitize(target) });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { user: session, error } = await guard(["ADMIN"]);
  if (error) return error;

  const users = listUsers();
  const target = users.find((item) => item.id === id);
  if (!target) {
    return Response.json({ error: "Usuário não encontrado." }, { status: 404 });
  }
  if (session.id === target.id) {
    return Response.json({ error: "Você não pode excluir a própria conta." }, { status: 403 });
  }
  if (target.role === "ADMIN") {
    const remainingAdmins = users.filter(
      (item) => item.id !== target.id && item.role === "ADMIN" && item.active,
    );
    if (remainingAdmins.length === 0) {
      return Response.json(
        { error: "É obrigatório manter pelo menos um administrador ativo." },
        { status: 400 },
      );
    }
  }

  saveUsers(users.filter((item) => item.id !== id));
  return Response.json({ ok: true });
}
