import type { CSSProperties } from "react";

interface PokeballIconProps {
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

export function PokeballIcon({ className = "h-6 w-6", strokeWidth = 2, style }: PokeballIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M4 24h13.5M30.5 24H44"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4 24a20 20 0 0 1 40 0"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  );
}
