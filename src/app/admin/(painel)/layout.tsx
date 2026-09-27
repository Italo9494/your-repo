import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Painel administrativo",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return <AdminShell user={{ name: user.name, email: user.email, role: user.role }}>{children}</AdminShell>;
}
