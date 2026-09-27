"use client";

import { Heart } from "lucide-react";

import { useFavorite, type FavoriteKind } from "@/lib/favorites";

interface FavoriteButtonProps {
  kind: FavoriteKind;
  value: string;
  label?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function FavoriteButton({
  kind,
  value,
  label = "Favoritar",
  size = "sm",
  showLabel = false,
}: FavoriteButtonProps) {
  const [active, toggle] = useFavorite(kind, value);
  const dimension = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? `Remover ${label.replace(/^Favoritar\s*/, "")} dos favoritos` : label}
      title={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`inline-flex items-center justify-center gap-2 rounded-full border transition ${
        showLabel ? "px-4 py-2 text-sm font-semibold" : dimension
      } ${
        active
          ? "border-brand-red/40 bg-brand-red/10 text-brand-red"
          : "border-line bg-surface text-muted hover:border-brand-red/40 hover:text-brand-red"
      }`}
    >
      <Heart
        className={size === "sm" ? "h-4 w-4" : "h-5 w-5"}
        fill={active ? "currentColor" : "none"}
        aria-hidden="true"
      />
      {showLabel && <span>{active ? "Favoritado" : "Favoritar"}</span>}
    </button>
  );
}
