import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "red" | "blue" | "yellow" | "green";
  className?: string;
}

const tones: Record<string, string> = {
  neutral: "bg-canvas text-muted border-line",
  red: "bg-brand-red/10 text-brand-red-dark border-brand-red/25",
  blue: "bg-brand-blue/10 text-brand-blue-dark border-brand-blue/25",
  yellow: "bg-brand-yellow/20 text-[#7a5c00] border-brand-yellow/50",
  green: "bg-brand-green/10 text-[#1f6d38] border-brand-green/30",
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
