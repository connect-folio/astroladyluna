import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Lady Luna";
  const subtitle = searchParams.get("subtitle") ?? "Guía Astrológica";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#291225",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, #8F6988 0%, transparent 70%)",
            opacity: 0.5,
          }}
        />

        {/* Wordmark */}
        <p
          style={{
            position: "absolute",
            top: "48px",
            left: "80px",
            fontFamily: "serif",
            fontSize: "13px",
            letterSpacing: "0.3em",
            color: "#EFBDB0",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          LADY ◌ LUNA
        </p>

        {/* Main title */}
        <h1
          style={{
            fontFamily: "serif",
            fontSize: title.length > 30 ? "52px" : "64px",
            fontWeight: 400,
            color: "#F6F4EC",
            textAlign: "center",
            lineHeight: 1.2,
            margin: "0 0 24px",
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontFamily: "serif",
              fontSize: "22px",
              color: "#B1AED4",
              textAlign: "center",
              margin: 0,
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Bottom domain */}
        <p
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontFamily: "serif",
            fontSize: "13px",
            letterSpacing: "0.15em",
            color: "#8F6988",
            margin: 0,
          }}
        >
          astroladyluna.com
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
