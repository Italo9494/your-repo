import fs from "node:fs";
import path from "node:path";

const STORAGE_DIR = path.join(process.cwd(), "storage");

interface CacheEntry {
  mtimeMs: number;
  data: unknown;
}

const cache = new Map<string, CacheEntry>();

function filePath(name: string): string {
  return path.join(STORAGE_DIR, name);
}

export function storageExists(name: string): boolean {
  return fs.existsSync(filePath(name));
}

export function readJson<T>(name: string, fallback: T): T {
  try {
    const stat = fs.statSync(filePath(name));
    const cached = cache.get(name);
    if (cached && cached.mtimeMs === stat.mtimeMs) return cached.data as T;
    const data = JSON.parse(fs.readFileSync(filePath(name), "utf8")) as T;
    cache.set(name, { mtimeMs: stat.mtimeMs, data });
    return data;
  } catch {
    return fallback;
  }
}

export function writeJson(name: string, value: unknown): void {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
  const target = filePath(name);
  const tmp = `${target}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  fs.renameSync(tmp, target);
  cache.delete(name);
}

export function readOrSeed<T>(name: string, seed: () => T): T {
  if (storageExists(name)) {
    const data = readJson<T | null>(name, null);
    if (data !== null) return data;
  }
  const fresh = seed();
  writeJson(name, fresh);
  return fresh;
}

export function readRaw(name: string): string | null {
  try {
    return fs.readFileSync(filePath(name), "utf8").trim();
  } catch {
    return null;
  }
}

export function writeRaw(name: string, contents: string): void {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
  fs.writeFileSync(filePath(name), contents, "utf8");
}
