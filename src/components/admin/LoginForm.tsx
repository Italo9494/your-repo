"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";

import { ErrorMessage } from "@/components/admin/ui";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Não foi possível entrar. Tente novamente.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Falha de conexão com o servidor.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-ink">Entrar no painel</h1>
          <p className="text-sm text-muted">Acesso restrito à equipe editorial.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <ErrorMessage message={error} />

        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-wider text-muted">E-mail</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-brand-blue focus:bg-surface focus:outline-none"
            placeholder="voce@exemplo.com"
          />
        </label>

        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-wider text-muted">Senha</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-brand-blue focus:bg-surface focus:outline-none"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand-red px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-red-dark disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        <Link href="/" className="font-semibold text-brand-blue transition hover:text-brand-blue-dark">
          Voltar para o site
        </Link>
      </p>
    </div>
  );
}
