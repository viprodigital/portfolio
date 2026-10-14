import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ruban — Network Engineer & Systems Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#080B11",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.25) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "-0.02em" }}>
              Ruban
            </span>
            <span style={{ fontSize: "14px", color: "#94A3B8", fontFamily: "monospace" }}>
              portfolio-omega-six-vei2m47p70.vercel.app
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              width: "fit-content",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#34D399" }} />
            <span style={{ fontSize: "14px", fontFamily: "monospace", color: "#CBD5E1" }}>
              2.5+ Years Experience &bull; Cisco &bull; Fortinet &bull; Linux &bull; Cloud
            </span>
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: "900",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Network Engineer &amp; Systems Architect
          </h1>

          <p style={{ fontSize: "22px", color: "#94A3B8", lineHeight: 1.4, margin: 0 }}>
            Building scalable network fabrics, FortiOS firewall defenses, VMware clusters, and AI-powered workflows.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            fontSize: "14px",
            color: "#64748B",
            fontFamily: "monospace",
          }}
        >
          <span>Production Infrastructure &bull; Zero Trust &bull; Next.js 14</span>
          <span style={{ color: "#38BDF8" }}>Explore Tutorials &amp; Architecture &rarr;</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
