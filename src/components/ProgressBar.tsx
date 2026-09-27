interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
  tone?: "blue" | "red" | "green";
}

const tones: Record<string, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  green: "bg-brand-green-dark",
};

export function ProgressBar({
  value,
  label,
  className = "",
  tone = "blue",
}: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-ink">{label ?? "Progresso"}</span>
        <span className="tabular-nums text-muted">{safeValue}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progresso"}
        className="h-2.5 w-full overflow-hidden rounded-full bg-line"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${tones[tone]}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
