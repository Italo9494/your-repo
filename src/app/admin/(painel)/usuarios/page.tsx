import type { Metadata } from "next";

import { Forbidden } from "@/components/admin/Forbidden";
import { UsersPanel, type PanelUser } from "@/components/admin/UsersPanel";
import { getSessionUser, listUsers } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Usuários",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const session = await getSessionUser();
  if (!session || session.role !== "ADMIN") {
    return <Forbidden area="gestão de usuários" />;
  }

  const users: PanelUser[] = listUsers().map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Usuários</h1>
        <p className="text-sm text-muted">
          Controle quem acessa o painel e com qual papel (ADMIN ou EDITOR).
        </p>
      </div>
      <UsersPanel users={users} currentUserId={session.id} />
    </div>
  );
}
