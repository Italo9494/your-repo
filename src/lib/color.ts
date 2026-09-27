/** Utilidades de cor para garantir contraste legível em elementos com fundo colorido. */

function luminance(hex: string): number {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;
  const channels = [0, 2, 4].map((index) => parseInt(full.slice(index, index + 2), 16) / 255);
  const linear = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export interface PillTone {
  className: string;
  scrim: number;
}

/**
 * Escolhe texto branco ou escuro para um elemento com gradiente de duas cores,
 * aplicando um véu escuro quando o gradiente mistura cores claras e escuras.
 * Assim o texto mantém contraste WCAG AA (4.5:1) em qualquer combinação.
 */
export function pillTone([from, to]: [string, string]): PillTone {
  const values = [luminance(from), luminance(to)];
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min >= 0.225) {
    return { className: "text-ink", scrim: 0 };
  }

  if (max <= 0.183) {
    return { className: "text-white", scrim: 0 };
  }

  const opacity = 1 - Math.pow(0.183 / max, 1 / 2.4);
  return { className: "text-white", scrim: Math.min(0.5, Math.max(0, opacity)) };
}
