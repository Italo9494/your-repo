"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, History, Menu, X, Search, Settings } from "lucide-react";

import { PokeballIcon } from "@/components/icons/PokeballIcon";
import { ResumeButton } from "@/components/ResumeButton";
import { SearchBar } from "@/components/SearchBar";
import { useFavoritesCount } from "@/lib/favorites";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Jogos", href: "/jogos" },
  { label: "Detonados", href: "/detonados" },
  { label: "Categorias", href: "/categorias" },
  { label: "Guias", href: "/guias" },
  { label: "Pokémon", href: "/pokemon" },
  { label: "Mapas", href: "/mapas" },
  { label: "Dicas", href: "/dicas" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const favoritesCount = useFavoritesCount();

  function closeMenus() {
    setOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setSearchOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="PokéDetonado, ir para o início"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-white">
            <PokeballIcon className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            <span className="text-brand-red">Poké</span>
            <span className="text-brand-blue">Detonado</span>
          </span>
        </Link>

          <nav aria-label="Menu principal" className="ml-4 hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    isActive(item.href)
                      ? "bg-brand-blue/10 text-brand-blue-dark"
                      : "text-muted hover:bg-canvas hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block md:w-56 lg:w-72">
            <SearchBar />
          </div>

          <div className="hidden xl:block">
            <ResumeButton compact />
          </div>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-expanded={searchOpen}
            aria-label={searchOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:text-brand-blue">
              <Search className="h-5 w-5" aria-hidden="true" />
            </span>
          </button>

          <Link
            href="/historico"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:text-brand-blue sm:flex"
            aria-label="Histórico de páginas visitadas"
          >
            <History className="h-5 w-5" aria-hidden="true" />
          </Link>

          <Link
            href="/favoritos"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:text-brand-red sm:flex"
            aria-label={`Favoritos${favoritesCount > 0 ? `, ${favoritesCount} itens` : ""}`}
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            {favoritesCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:text-brand-blue sm:flex"
            aria-label="Área administrativa"
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line bg-surface px-4 py-3 md:hidden">
          <SearchBar autoFocus />
        </div>
      )}

      {open && (
        <div
          id="menu-mobile"
          className="border-t border-line bg-surface px-4 py-4 lg:hidden"
        >
          <nav aria-label="Menu móvel">
            <ul className="grid gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition ${
                      isActive(item.href)
                        ? "bg-brand-blue/10 text-brand-blue-dark"
                        : "text-ink hover:bg-canvas"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/historico"
                  onClick={closeMenus}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-ink transition hover:bg-canvas"
                >
                  Histórico
                  <span className="text-sm font-medium text-muted">Páginas visitadas</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/favoritos"
                  onClick={closeMenus}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-ink transition hover:bg-canvas"
                >
                  Favoritos
                  <span className="inline-flex items-center gap-2 text-sm text-muted">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                    {favoritesCount}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  onClick={closeMenus}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-ink transition hover:bg-canvas"
                >
                  Administração
                  <span className="inline-flex items-center gap-2 text-sm text-muted">
                    <Settings className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
