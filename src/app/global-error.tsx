"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#f5f7fc",
          color: "#171b26",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ maxWidth: "520px", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#b32409",
            }}
          >
            Erro inesperado
          </p>
          <h1 style={{ margin: "12px 0 0", fontSize: "32px", lineHeight: 1.2 }}>
            Algo saiu do trilho
          </h1>
          <p style={{ marginTop: "16px", lineHeight: 1.6, color: "#5d667a" }}>
            Ocorreu uma falha ao carregar o site. Tente novamente — se o problema
            persistir, volte para o início.
          </p>
          <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                border: 0,
                borderRadius: "999px",
                padding: "14px 24px",
                background: "#d62e0b",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Tentar novamente
            </button>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "999px",
                padding: "14px 24px",
                border: "1px solid #e4e8f2",
                background: "#fff",
                color: "#171b26",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
