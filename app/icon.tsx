// app/icon.tsx
// Favicon: "K" wordmark in terracotta (#E8834D) on dark background.

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#17110C",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        <span
          style={{
            color: "#E8834D",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "serif",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          K
        </span>
      </div>
    ),
    { ...size }
  );
}
