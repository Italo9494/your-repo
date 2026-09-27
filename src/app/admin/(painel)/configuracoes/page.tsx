import type { Metadata } from "next";

import { Forbidden } from "@/components/admin/Forbidden";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSessionUser } from "@/lib/auth";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Configurações",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const session = await getSessionUser();
  if (!session || session.role !== "ADMIN") {
    return <Forbidden area="configurações do site" />;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Configurações</h1>
        <p className="text-sm text-muted">
          Ajustes gerais do site. Alterações valem para todos os visitantes.
        </p>
      </div>
      <SettingsForm initial={getSettings()} />
    </div>
  );
}
