import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, hasValidSession } from "@/lib/auth";
import { getGuide, getTip, getWalkthrough } from "@/lib/content";
import { maps } from "@/data/maps";
import { pokemonList } from "@/data/pokemon";
import { getAllCategories } from "@/lib/categories";
import { getSettings } from "@/lib/settings";

function maintenanceHtml(siteName: string): string {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Em manutenção | ${siteName}</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: #f5f7fc; color: #171b26; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  main { max-width: 520px; text-align: center; }
  .badge { font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #b32409; }
  h1 { margin: 12px 0 0; font-size: 34px; line-height: 1.2; }
  p { margin-top: 16px; line-height: 1.6; color: #5d667a; }
  .brand { margin-top: 24px; font-weight: 800; color: #d62e0b; }
</style>
</head>
<body>
<main>
  <p class="badge">Manutenção programada</p>
  <h1>Voltemos em breve</h1>
  <p>Estamos atualizando o ${siteName}. O painel administrativo continua disponível para a equipe.</p>
  <p class="brand">${siteName}</p>
</main>
</body>
</html>
`;
}

function rewriteNotFound(request: NextRequest): NextResponse {
  return NextResponse.rewrite(new URL("/__conteudo-inexistente__", request.url));
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || (pathname.startsWith("/admin/") && pathname !== "/admin/login")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!hasValidSession(token)) {
      return NextResponse.redirect(new URL("/admin/login", request.url), 307);
    }
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (hasValidSession(token)) {
      return NextResponse.redirect(new URL("/admin", request.url), 307);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isAsset =
    pathname.startsWith("/_next") ||
    pathname === "/icon" ||
    pathname === "/opengraph-image" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico" ||
    /\.[a-z0-9]+$/i.test(pathname);

  const settings = getSettings();
  if (settings.maintenance && !isAsset) {
    return new NextResponse(maintenanceHtml(settings.siteName), {
      status: 503,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "retry-after": "3600",
      },
    });
  }

  const guide = /^\/guias\/([^/]+)$/.exec(pathname);
  if (guide && !getGuide(guide[1])) return rewriteNotFound(request);

  const tip = /^\/dicas\/([^/]+)$/.exec(pathname);
  if (tip && !getTip(tip[1])) return rewriteNotFound(request);

  const detonado = /^\/detonado\/([^/]+)(?:\/([^/]+))?$/.exec(pathname);
  if (detonado) {
    const walkthrough = getWalkthrough(detonado[1]);
    if (!walkthrough) return rewriteNotFound(request);
    const chapterSlug = detonado[2];
    if (chapterSlug && !walkthrough.chapters.some((item) => item.slug === chapterSlug)) {
      return rewriteNotFound(request);
    }
  }

  const pokemon = /^\/pokemon\/([^/]+)$/.exec(pathname);
  if (pokemon && !pokemonList.some((item) => item.slug === pokemon[1])) {
    return rewriteNotFound(request);
  }

  const mapa = /^\/mapas\/([^/]+)$/.exec(pathname);
  if (mapa && !maps.some((item) => item.slug === mapa[1])) {
    return rewriteNotFound(request);
  }

  const categoria = /^\/categorias\/([^/]+)$/.exec(pathname);
  if (categoria && !getAllCategories().some((item) => item.slug === categoria[1])) {
    return rewriteNotFound(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
