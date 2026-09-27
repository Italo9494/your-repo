"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  FileText,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  ExternalLink,
  Menu,
  BookOpen,
  Settings,
  Users,
  X,
} from "lucide-react";

import type { Role } from "@/lib/auth";

interface ShellUser {
  name: string;
  email: string;
  role: Role;
}

interface NavItem {
  href: string;
  label: string;
  icon: typeof FileText;
}

const mainNav: NavItem[] = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/guias", label: "Guias", icon: FileText },
  { href: "/admin/dicas", label: "Dicas", icon: Lightbulb },
  { href: "/admin/detonados", label: "Detonados", icon: BookOpen },
];

const adminNav: NavItem[] = [
  { href: "/admin/usuarios", label: "Usuários", icon: Users },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

function NavGroup({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="mt-6">
      <p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">{title}</p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={
                  active
                    ? "flex items-center gap-3 rounded-xl bg-brand-red px-3 py-2.5 text-sm font-bold text-white"
                    : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                }
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AdminShell({ user, children }: { user: ShellUser; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-canvas text-ink lg:flex">
      <a
        href="#admin-conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-ink px-3 py-5 transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shrink-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-3">
          <div>
            <p className="text-sm font-extrabold text-white">PokéDetonado</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Painel administrativo
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-2 flex-1 overflow-y-auto" aria-label="Navegação do painel">
          <NavGroup title="Painel" items={mainNav} pathname={pathname} onNavigate={() => setOpen(false)} />
          {user.role === "ADMIN" ? (
            <NavGroup
              title="Administração"
              items={adminNav}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          ) : null}
        </nav>

        <div className="mt-4 rounded-2xl bg-white/5 px-3 py-3">
          <p className="truncate text-sm font-bold text-white">{user.name}</p>
          <p className="truncate text-xs text-white/60">{user.email}</p>
          <p className="mt-1 inline-flex rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {user.role}
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-xl border border-line p-2 text-ink lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Abrir menu"
                aria-expanded={open}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <p className="text-sm font-bold text-ink">Painel</p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="hidden items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue sm:inline-flex"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Ver site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-bold text-ink transition hover:border-brand-red hover:text-brand-red-dark disabled:opacity-50"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                {loggingOut ? "Saindo..." : "Sair"}
              </button>
            </div>
          </div>
        </header>

        <main id="admin-conteudo" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
