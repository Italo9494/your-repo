import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const alt = "PokéDetonado — detonados, guias, mapas e dicas de Pokémon";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const fontPath = path.join(process.cwd(), "assets", "Geist-Regular.ttf");

const background = "#0f1115";
const red = "#e3350d";
const yellow = "#ffcb05";
const muted = "#9aa3b2";

function Pokeball({ dimension }: { dimension: number }) {
  const inner = dimension - 12;
  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `6px solid ${yellow}`,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: inner,
          height: inner,
          borderRadius: inner / 2,
          background: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: inner - 16,
            height: inner - 16,
            borderRadius: (inner - 16) / 2,
            background: "#ffffff",
            display: "flex",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: (inner - 16) / 2,
              background: red,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: (inner - 16) / 2,
              left: 0,
              right: 0,
              height: 6,
              background: "#111111",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: (inner - 16) / 2 - 16,
              left: (inner - 16) / 2 - 16,
              width: 32,
              height: 32,
              borderRadius: 16,
              background: "#ffffff",
              border: "6px solid #111111",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        borderRadius: 999,
        background: "rgba(255, 255, 255, 0.08)",
        border: "2px solid rgba(255, 255, 255, 0.18)",
        color: "#ffffff",
        fontSize: 30,
        marginRight: 16,
      }}
    >
      {label}
    </div>
  );
}

export default async function OpengraphImage() {
  const font = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background,
          color: "#ffffff",
          padding: 64,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 18,
            background: red,
          }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <Pokeball dimension={92} />
          <div
            style={{
              marginLeft: 28,
              fontSize: 52,
              color: yellow,
            }}
          >
            PokéDetonado
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 30,
              color: muted,
              letterSpacing: 2,
            }}
          >
            pokedetonado.com.br
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            fontSize: 88,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          Detonados completos de Pokémon
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 40,
            lineHeight: 1.3,
            color: muted,
            maxWidth: 980,
          }}
        >
          Guias passo a passo, mapas por região, dicas e Pokédex — tudo em
          português do Brasil.
        </div>

        <div style={{ display: "flex", marginTop: "auto" }}>
          <Chip label="Detonado FireRed" />
          <Chip label="Emerald" />
          <Chip label="Diamond" />
          <Chip label="Mapas e guias" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: font,
          weight: 400 as const,
          style: "normal" as const,
        },
      ],
    },
  );
}
