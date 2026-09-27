import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

import { readOrSeed, readRaw, writeJson, writeRaw } from "@/lib/storage";

export type Role = "ADMIN" | "EDITOR";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export const SESSION_COOKIE = "pd_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const USERS_FILE = "users.json";
const SECRET_FILE = "session-secret.key";

function today(): string {
  return new Date().toISOString();
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("base64url");
  const derived = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 }).toString("base64url");
  return `scrypt$16384$${salt}$${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "scrypt") return false;
  const [, cost, salt, expected] = parts;
  const derived = scryptSync(password, salt, 64, {
    N: Number(cost),
    r: 8,
    p: 1,
  });
  const expectedBuffer = Buffer.from(expected, "base64url");
  if (derived.length !== expectedBuffer.length) return false;
  return timingSafeEqual(derived, expectedBuffer);
}

function seedUsers(): StoredUser[] {
  const now = today();
  return [
    {
      id: randomUUID(),
      name: "Administrador",
      email: "admin@pokedetonado.com",
      role: "ADMIN",
      active: true,
      passwordHash: hashPassword("Admin123!"),
      createdAt: now,
      updatedAt: now,
    },
    {
      id: randomUUID(),
      name: "Editor",
      email: "editor@pokedetonado.com",
      role: "EDITOR",
      active: true,
      passwordHash: hashPassword("Editor123!"),
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function randomUUID(): string {
  return randomBytes(16).toString("hex");
}

export function listUsers(): StoredUser[] {
  return readOrSeed(USERS_FILE, seedUsers);
}

export function saveUsers(users: StoredUser[]): void {
  writeJson(USERS_FILE, users);
}

export function getUserById(id: string): StoredUser | undefined {
  return listUsers().find((user) => user.id === id);
}

export function getUserByEmail(email: string): StoredUser | undefined {
  const normalized = email.trim().toLowerCase();
  return listUsers().find((user) => user.email.toLowerCase() === normalized);
}

function toSessionUser(user: StoredUser): SessionUser {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

function sessionSecret(): string {
  const fromEnv = process.env.SESSION_SECRET;
  if (fromEnv && fromEnv.length >= 16) return fromEnv;
  const existing = readRaw(SECRET_FILE);
  if (existing) return existing;
  const generated = randomBytes(32).toString("hex");
  writeRaw(SECRET_FILE, generated);
  return generated;
}

function signToken(payload: Record<string, unknown>): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", sessionSecret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function verifyToken(token: string): { sub: string; exp: number } | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = createHmac("sha256", sessionSecret()).update(body).digest("base64url");
  const givenBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (givenBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(givenBuffer, expectedBuffer)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      sub?: string;
      exp?: number;
    };
    if (!payload.sub || !payload.exp) return null;
    if (payload.exp < Date.now()) return null;
    return { sub: payload.sub, exp: payload.exp };
  } catch {
    return null;
  }
}

export function createSessionToken(user: StoredUser): string {
  return signToken({ sub: user.id, exp: Date.now() + SESSION_TTL_SECONDS * 1000 });
}

export function hasValidSession(token: string | undefined): boolean {
  if (!token) return false;
  const payload = verifyToken(token);
  if (!payload) return false;
  const user = getUserById(payload.sub);
  return Boolean(user && user.active);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  const user = getUserById(payload.sub);
  if (!user || !user.active) return null;
  return toSessionUser(user);
}

export type GuardResult =
  | { user: SessionUser; error?: undefined }
  | { user?: undefined; error: Response };

export async function guard(roles?: Role[]): Promise<GuardResult> {
  const user = await getSessionUser();
  if (!user) {
    return {
      error: Response.json(
        { error: "Sessão inválida ou expirada. Entre novamente." },
        { status: 401 },
      ),
    };
  }
  if (roles && !roles.includes(user.role)) {
    return {
      error: Response.json(
        { error: "Você não tem permissão para executar esta ação." },
        { status: 403 },
      ),
    };
  }
  return { user };
}

export function validatePassword(password: unknown): string | null {
  if (typeof password !== "string" || password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres.";
  }
  if (password.length > 100) return "A senha é longa demais.";
  return null;
}

export function authenticate(email: unknown, password: unknown): StoredUser | null {
  if (typeof email !== "string" || typeof password !== "string") return null;
  const user = getUserByEmail(email);
  if (!user || !user.active) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return user;
}
