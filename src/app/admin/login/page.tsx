import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Entrar no painel",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <LoginForm />
    </div>
  );
}
