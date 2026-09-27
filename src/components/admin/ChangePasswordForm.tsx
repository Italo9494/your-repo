"use client";

import { useState, type FormEvent } from "react";

import {
  ErrorMessage,
  Field,
  SuccessMessage,
  buttonPrimary,
  inputClass,
} from "@/components/admin/ui";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirm) {
      setError("A confirmação não coincide com a nova senha.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Não foi possível alterar a senha.");
        setSaving(false);
        return;
      }
      setSuccess("Senha alterada com sucesso.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
      setSaving(false);
    } catch {
      setError("Falha de conexão com o servidor.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <Field label="Senha atual">
        <input
          type="password"
          required
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className={inputClass}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nova senha" hint="Mínimo de 8 caracteres.">
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Confirmar nova senha">
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <button type="submit" disabled={saving} className={buttonPrimary}>
        {saving ? "Salvando..." : "Alterar senha"}
      </button>
    </form>
  );
}
