"use client";

import type { ReactNode } from "react";

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
  size?: "sm" | "md";
}

export function FilterChip({
  active,
  onClick,
  children,
  ariaLabel,
  size = "sm",
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={`rounded-full border font-semibold transition ${
        size === "md" ? "px-4 py-2 text-sm" : "px-3.5 py-1.5 text-sm"
      } ${
        active
          ? "border-brand-blue bg-brand-blue text-white"
          : "border-line bg-surface text-muted hover:border-brand-blue/50 hover:text-brand-blue"
      }`}
    >
      {children}
    </button>
  );
}
