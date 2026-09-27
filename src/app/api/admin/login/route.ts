import { NextResponse, type NextRequest } from "next/server";

import {
  SESSION_COOKIE,
  authenticate,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function clientKey(request: NextRequest, email: string): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  return `${ip}:${email}`;
}

function isBlocked(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (entry.resetAt < Date.now()) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function registerFailure(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const input = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const key = clientKey(request, email);

  if (isBlocked(key)) {
    return Response.json(
      { error: "Muitas tentativas de acesso. Aguarde alguns minutos e tente de novo." },
      { status: 429 },
    );
  }

  const user = authenticate(email, input.password);
  if (!user) {
    registerFailure(key);
    return Response.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
  }

  attempts.delete(key);
  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  response.cookies.set(SESSION_COOKIE, createSessionToken(user), sessionCookieOptions());
  return response;
}
