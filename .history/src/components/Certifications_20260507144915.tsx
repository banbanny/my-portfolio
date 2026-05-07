'use client'

import { useState } from "react";

// ─── ADD YOUR 6 CERTS HERE ───────────────────────────────────────────────────
// Put your cert images inside /public/certs/ (e.g. /public/certs/cert1.png)
const certifications = [
  { id: 1, label: "Certificate 1", issuer: "Issuer Name", year: "2024", image: "/certs/cert1.png", color: "#F43434" },
  { id: 2, label: "Certificate 2", issuer: "Issuer Name", year: "2024", image: "/certs/cert2.png", color: "#1a6ef5" },
  { id: 3, label: "Certificate 3", issuer: "Issuer Name", year: "2023", image: "/certs/cert3.png", color: "#a259ff" },
  { id: 4, label: "Certificate 4", issuer: "Issuer Name", year: "2023", image: "/certs/cert4.png", color: "#F43434" },
  { id: 5, label: "Certificate 5", issuer: "Issuer Name", year: "2024", image: "/certs/cert5.png", color: "#1a6ef5" },
  { id: 6, label: "Certificate 6", issuer: "Issuer Name", year: "2022", image: "/certs/cert6.png", color: "#a259ff" },
];
// ─────────────────────────────────────────────────────────────────────────────

// Triplicate so the infinite loop looks seamless with only 6 items
const row1 = [...certifications, ...certifications, ...certifications];
const row2 = [...certifications].reverse().concat(
  [...certifications].reverse(),
  [...certifications].reverse()
);

type Cert = typeof certifications[0];

function CertCard({
  cert,
  onEnter,
  onLeave,
  onClick,
}: {
  cert: Cert;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const rgb =
    cert.color === "#F43434" ? "244,52,52"
    : cert.color === "#1a6ef5" ? "26,110,245"
    : "162,89,255";

  return (
    <div
      onMouseEnter={() => { setHovered(true); onEnter(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: "260px",
        borderRadius: "12px",
        border: `1px solid ${hovered ? cert.color : "rgba(255,255,255,0.08)"}`,
        background: hovered
          ? `rgba(${rgb},0.07)`
          : "rgba(255,255,255,0.03)",
        transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: "3px",
          background: cert.color,
          opacity: hovered ? 1 : 0.35,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Certificate image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/10",
          overflow: "hidden",
          position: "relative",
          background: "#111",
        }}
      >
        <img
          src={cert.image}
          alt={cert.label}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
            display: "block",
          }}
          onError={(e) => {
            // Fallback placeholder if image not found
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
            const parent = el.parentElement;
            if (parent) {
              parent.style.display = "flex";
              parent.style.alignItems = "center";
              parent.style.justifyContent = "center";
              parent.style.background = "#1a1a1a";
              parent.innerHTML = `<span style="font-size:32px">🎓</span>`;
            }
          }}
        />

        {/* Hover overlay — click to expand hint */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.55)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.5)",
              padding: "7px 18px",
              borderRadius: "4px",
              transform: hovered ? "scale(1)" : "scale(0.88)",
              transition: "transform 0.3s ease",
            }}
          >
            View Certificate ↗
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: "14px 16px" }}>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            color: hovered ? "#fff" : "rgba(255,255,255,0.8)",
            margin: "0 0 4px",
            transition: "color 0.3s ease",
          }}
        >
          {cert.label}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              color: hovered ? cert.color : "rgba(255,255,255,0.35)",
              margin: 0,
              transition: "color 0.3s ease",
            }}
          >
            {cert.issuer}
          </p>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.06em",
            }}
          >
            {cert.year}
          </span>
        </div>
      </div>
    </div>
  );
}

// Lightbox modal
function Lightbox({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        backdropFilter: "blur(6px)",
        animation: "fadeInModal 0.25s ease",
      }}
    >
      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "860px",
          width: "100%",
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${cert.color}55`,
          boxShadow: `0 0 60px ${cert.color}22`,
        }}
      >
        <img
          src={cert.image}
          alt={cert.label}
          style={{ width: "100%", display: "block" }}
        />

        {/* Info bar */}
        <div
          style={{
            background: "#0d0d0d",
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#fff", margin: "0 0 2px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {cert.label}
            </p>
            <p style={{ fontFamily: "monospace", fontSize: "11px", color: cert.color, margin: 0 }}>
              {cert.issuer} · {cert.year}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              fontFamily: "monospace", fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "4px", padding: "6px 14px",
              cursor: "pointer", letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<Cert | null>(null);

  return (
    <>
      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marqueeLeft 30s linear infinite;
        }
        .marquee-right {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marqueeRight 24s linear infinite;
        }
        .marquee-left.paused,
        .marquee-right.paused {
          animation-play-state: paused;
        }
        .cert-fade-l {
          position: absolute; top: 0; left: 0;
          width: 140px; height: 100%;
          background: linear-gradient(to right, #1B1919, transparent);
          pointer-events: none; z-index: 2;
        }
        .cert-fade-r {
          position: absolute; top: 0; right: 0;
          width: 140px; height: 100%;
          background: linear-gradient(to left, #1B1919, transparent);
          pointer-events: none; z-index: 2;
        }
      `}</style>

      <section
        id="certifications"
        className="relative overflow-hidden"
        style={{ background: "#1B1919", minHeight: "90vh", paddingTop: "7rem", paddingBottom: "8rem" }}
      >
        {/* Glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%", height: "100%",
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(210,40,40,0.18) 0%, rgba(180,30,30,0.06) 55%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Heading */}
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div style={{ display: "inline-block" }}>
              <h2 className="font-black-roboto text-4xl md:text-5xl uppercase text-white" style={{ margin: 0 }}>
                CERTIFICATIONS
              </h2>
              <div style={{ width: "100%", height: "3px", background: "#F43434", marginTop: "10px", borderRadius: "2px" }} />
            </div>
            <p style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.22)", marginTop: "14px", textTransform: "uppercase" }}>
              Click a card to view · Hover to pause
            </p>
          </div>
        </div>

        {/* Row 1 — left */}
        <div style={{ position: "relative", overflow: "hidden", marginBottom: "20px" }}>
          <div className="cert-fade-l" />
          <div className="cert-fade-r" />
          <div className={`marquee-left${paused ? " paused" : ""}`} style={{ padding: "10px 0" }}>
            {row1.map((cert, i) => (
              <CertCard
                key={`r1-${i}`}
                cert={cert}
                onEnter={() => setPaused(true)}
                onLeave={() => setPaused(false)}
                onClick={() => setSelected(cert)}
              />
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div className="cert-fade-l" />
          <div className="cert-fade-r" />
          <div className={`marquee-right${paused ? " paused" : ""}`} style={{ padding: "10px 0" }}>
            {row2.map((cert, i) => (
              <CertCard
                key={`r2-${i}`}
                cert={cert}
                onEnter={() => setPaused(true)}
                onLeave={() => setPaused(false)}
                onClick={() => setSelected(cert)}
              />
            ))}
          </div>
        </div>

        {/* Bottom label */}
        <div className="text-center mt-14">
          <p style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>
            {certifications.length} Certifications & Counting
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <Lightbox cert={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

 <div style={{ width: "100%", height: "3px", background: "#F43434", marginTop: "10px", borderRadius: "2px" }} />
