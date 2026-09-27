import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            background: "#111111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 116,
              height: 116,
              borderRadius: 58,
              background: "#ffffff",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ width: 54, height: 116, background: "#e3350d" }} />
            <div style={{ width: 116, height: 8, background: "#111111" }} />
            <div
              style={{
                position: "absolute",
                top: 38,
                left: 38,
                width: 40,
                height: 40,
                borderRadius: 20,
                background: "#ffffff",
                border: "8px solid #111111",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
