import { FileText, Lightbulb, Map, ShieldCheck, Users } from "lucide-react";

import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { Panel, StatusBadge } from "@/components/admin/ui";
import { getAllGuides, getAllTips, getAllWalkthroughs } from "@/lib/content";
import { getSessionUser, listUsers } from "@/lib/auth";
import { getSettings } from "@/lib/settings";

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  const guides = getAllGuides();
  const tips = getAllTips();
  const walkthroughs = getAllWalkthroughs();
  const settings = getSettings();
  const users = listUsers();

  const stats = [
    {
      label: "Guias",
      total: guides.length,
      published: guides.filter((item) => item.status !== "rascunho").length,
      icon: FileText,
      href: "/admin/guias",
    },
    {
      label: "Dicas",
      total: tips.length,
      published: tips.filter((item) => item.status !== "rascunho").length,
      icon: Lightbulb,
      href: "/admin/dicas",
    },
    {
      label: "Detonados",
      total: walkthroughs.length,
      published: walkthroughs.filter((item) => item.status !== "rascunho").length,
      icon: Map,
      href: "/admin/detonados",
    },
    {
      label: "Usuários",
      total: users.length,
      published: users.filter((item) => item.active).length,
      icon: Users,
      href: "/admin/usuarios",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Olá, {user?.name}</h1>
          <p className="text-sm text-muted">
            Papel atual: <span className="font-semibold text-ink">{user?.role}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="text-muted">Manutenção</span>
          <StatusBadge status={settings.maintenance ? "rascunho" : "publicado"} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-line bg-surface p-5 shadow-soft transition hover:border-brand-blue"
          >
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
              <stat.icon className="h-4 w-4" aria-hidden="true" />
              {stat.label}
            </span>
            <p className="mt-2 text-3xl font-extrabold text-ink">{stat.total}</p>
            <p className="mt-1 text-xs text-muted">
              {stat.published} publicado{stat.published === 1 ? "" : "s"}
            </p>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-4 text-sm text-ink">
        <ShieldCheck className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
        <p>
          O conteúdo salvo no painel aparece no site público imediatamente após a publicação
          (revalidação automática). Alterações de usuários e configurações valem para toda a
          equipe.
        </p>
      </div>

      <Panel title="Alterar minha senha">
        <ChangePasswordForm />
      </Panel>
    </div>
  );
}
