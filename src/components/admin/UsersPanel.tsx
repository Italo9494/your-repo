"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { KeyRound, Trash2, UserPlus } from "lucide-react";

import type { Role } from "@/lib/auth";
import {
  ErrorMessage,
  Field,
  SuccessMessage,
  buttonDanger,
  buttonPrimary,
  buttonSecondary,
  inputClass,
} from "@/components/admin/ui";

export interface PanelUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
}

interface Props {
  users: PanelUser[];
  currentUserId: string;
}

async function send(url: string, method: string, body?: unknown): Promise<string | null> {
  try {
    const response = await fetch(url, {
      method,
      headers: body ? { "content-type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (response.ok) return null;
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    return data.error ?? "Não foi possível concluir a operação.";
  } catch {
    return "Falha de conexão com o servidor.";
  }
}

export function UsersPanel({ users, currentUserId }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [passwordId, setPasswordId] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<Role>("EDITOR");
  const [newPassword, setNewPassword] = useState("");

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  function notify(message: string | null, isError: boolean) {
    setError(isError ? message : null);
    setSuccess(isError ? null : message);
  }

  async function patchUser(id: string, payload: Record<string, unknown>, label: string) {
    setBusy(id);
    const problem = await send(`/api/admin/users/${encodeURIComponent(id)}`, "PUT", payload);
    notify(problem ?? `${label} atualizado.`, Boolean(problem));
    setBusy(null);
    router.refresh();
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("create");
    const problem = await send("/api/admin/users", "POST", {
      name: newName,
      email: newEmail,
      role: newRole,
      password: newPassword,
    });
    notify(problem ?? "Usuário criado.", Boolean(problem));
    setBusy(null);
    if (!problem) {
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setNewRole("EDITOR");
      setShowCreate(false);
    }
    router.refresh();
  }

  async function handleSaveEdit(id: string) {
    const payload: Record<string, unknown> = { name: editName, email: editEmail };
    if (editPassword) payload.password = editPassword;
    setBusy(id);
    const problem = await send(`/api/admin/users/${encodeURIComponent(id)}`, "PUT", payload);
    notify(problem ?? "Conta atualizada.", Boolean(problem));
    setBusy(null);
    if (!problem) {
      setEditingId(null);
      setEditPassword("");
    }
    router.refresh();
  }

  async function handleDelete(user: PanelUser) {
    if (!window.confirm(`Excluir a conta de "${user.name}"?`)) return;
    setBusy(user.id);
    const problem = await send(`/api/admin/users/${encodeURIComponent(user.id)}`, "DELETE");
    notify(problem ?? "Conta excluída.", Boolean(problem));
    setBusy(null);
    router.refresh();
  }

  async function handleSetPassword(id: string) {
    setBusy(id);
    const problem = await send(`/api/admin/users/${encodeURIComponent(id)}`, "PUT", {
      password: editPassword,
    });
    notify(problem ?? "Senha redefinida.", Boolean(problem));
    setBusy(null);
    if (!problem) {
      setPasswordId(null);
      setEditPassword("");
    }
  }

  function startEdit(user: PanelUser) {
    setEditingId(user.id);
    setPasswordId(null);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPassword("");
    notify(null, false);
  }

  return (
    <div className="space-y-5">
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {users.length} conta{users.length === 1 ? "" : "s"} cadastrada
          {users.length === 1 ? "" : "s"}.
        </p>
        <button
          type="button"
          onClick={() => setShowCreate((value) => !value)}
          className={buttonSecondary}
        >
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          {showCreate ? "Cancelar" : "Novo usuário"}
        </button>
      </div>

      {showCreate ? (
        <form onSubmit={handleCreate} className="rounded-2xl border border-line bg-canvas p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome">
              <input
                type="text"
                required
                minLength={2}
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="E-mail">
              <input
                type="email"
                required
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Papel">
              <select
                value={newRole}
                onChange={(event) => setNewRole(event.target.value as Role)}
                className={inputClass}
              >
                <option value="EDITOR">EDITOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </Field>
            <Field label="Senha inicial" hint="Mínimo de 8 caracteres.">
              <input
                type="text"
                required
                minLength={8}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
          <div className="mt-4">
            <button type="submit" disabled={busy === "create"} className={buttonPrimary}>
              {busy === "create" ? "Criando..." : "Criar usuário"}
            </button>
          </div>
        </form>
      ) : null}

      <div className="space-y-3">
        {users.map((user) => {
          const isSelf = user.id === currentUserId;
          return (
            <div key={user.id} className="rounded-2xl border border-line bg-surface p-4 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">
                    {user.name}
                    {isSelf ? <span className="ml-2 text-xs text-muted">(você)</span> : null}
                  </p>
                  <p className="text-xs text-muted">{user.email}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                    Papel
                    <select
                      value={user.role}
                      disabled={isSelf || busy === user.id}
                      onChange={(event) =>
                        patchUser(user.id, { role: event.target.value }, "Papel")
                      }
                      className="rounded-lg border border-line bg-canvas px-2 py-1.5 text-xs font-bold text-ink disabled:opacity-50"
                    >
                      <option value="EDITOR">EDITOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                    <input
                      type="checkbox"
                      checked={user.active}
                      disabled={isSelf || busy === user.id}
                      onChange={(event) =>
                        patchUser(user.id, { active: event.target.checked }, "Status")
                      }
                      className="h-4 w-4 rounded border-line accent-[#d62e0b]"
                    />
                    Ativa
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setPasswordId(passwordId === user.id ? null : user.id);
                      setEditingId(null);
                      setEditPassword("");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue"
                  >
                    <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                    Senha
                  </button>

                  {!isSelf ? (
                    <>
                      <button
                        type="button"
                        onClick={() => (editingId === user.id ? setEditingId(null) : startEdit(user))}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold text-ink transition hover:border-brand-blue hover:text-brand-blue"
                      >
                        {editingId === user.id ? "Cancelar" : "Editar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user)}
                        disabled={busy === user.id}
                        className={`${buttonDanger} !px-3`}
                        aria-label={`Excluir conta de ${user.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </>
                  ) : null}
                </div>
              </div>

              {editingId === user.id ? (
                <div className="mt-4 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
                  <Field label="Nome">
                    <input
                      type="text"
                      value={editName}
                      onChange={(event) => setEditName(event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="E-mail">
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(event) => setEditEmail(event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Nova senha (opcional)" hint="Deixe em branco para manter a atual.">
                      <input
                        type="text"
                        value={editPassword}
                        onChange={(event) => setEditPassword(event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(user.id)}
                      disabled={busy === user.id}
                      className={buttonPrimary}
                    >
                      {busy === user.id ? "Salvando..." : "Salvar alterações"}
                    </button>
                  </div>
                </div>
              ) : null}

              {passwordId === user.id ? (
                <div className="mt-4 flex flex-wrap items-end gap-3 border-t border-line pt-4">
                  <div className="min-w-56 flex-1">
                    <Field label="Redefinir senha" hint="Mínimo de 8 caracteres.">
                      <input
                        type="text"
                        value={editPassword}
                        onChange={(event) => setEditPassword(event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSetPassword(user.id)}
                    disabled={busy === user.id || editPassword.length < 8}
                    className={buttonPrimary}
                  >
                    {busy === user.id ? "Salvando..." : "Definir senha"}
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
