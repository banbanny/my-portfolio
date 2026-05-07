'use client'

import { useState, useEffect, useRef } from "react";

type ProjectType = "web" | "figma" | "graphics";

interface Project {
  id: number;
  title: string;
  type: ProjectType;
  description: string;
  thumbnail: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Victory Chapel Christian Center - Church Website",
    type: "web",
    description: "This website serves as the official online platform of the church, providing a welcoming space where members and visitors can learn more about the church's mission, beliefs, and community.",
    thumbnail: "/vccc-thumbnail.jpg",
    link: "https://vccc-website-one.vercel.app/",
  },
  {
  id: 2,
  title: "Functional Portfolio Website",
  type: "web",
  description: "A fully functional and working portfolio website built with Next.js, showcasing projects, skills, and contact information in a sleek and modern design.",
  thumbnail: "/web-port.png",
  link: "https://web-portfolio-ruby-pi.vercel.app/",
},
  {
    id: 3,
    title: "Portfolio Website Design",
    type: "figma",
    description: "UI/UX design for a Portfolio.",
    thumbnail: "/figma1.png",
    link: "https://www.figma.com/file/your-file-id",
  },
  {
    id: 4,
    title: "Victory Chapel Christian Center - Church Website",
    type: "figma",
    description: "A church website",
    thumbnail: "/vccc.png",
    link: "https://www.figma.com/file/your-file-id-2",
  },
  {
    id: 5,
    title: "5CRG Inventory Management System",
    type: "figma",
    description: "Inventory Management System for 5CRG.",
    thumbnail: "/figma3.png",
    link: "https://www.figma.com/file/your-file-id-2",
  },
  {
    id: 6,
    title: "Brand Identity",
    type: "graphics",
    description: "Logo and branding for a local business.",
    thumbnail: "/thumbnails/graphics1.png",
    link: "https://www.behance.net/ivanneobediente23",
  },
  {
    id: 7,
    title: "Poster Design",
    type: "graphics",
    description: "Event poster with bold typography and layout.",
    thumbnail: "/thumbnails/graphics2.png",
    link: "https://www.behance.net/your-project-2",
  },
];

const filters: { label: string; value: ProjectType }[] = [
  { label: "WEB PROJECTS",   value: "web"      },
  { label: "FIGMA DESIGNS",  value: "figma"    },
  { label: "GRAPHIC DESIGN", value: "graphics" },
];

const typeConfig: Record<ProjectType, { label: string; badge: string }> = {
  web:      { label: "Web Project",  badge: "#d11414" },
  figma:    { label: "Figma Design", badge: "#910d39" },
  graphics: { label: "Graphics",     badge: "#f16f24" },
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();
  const cfg = typeConfig[project.type];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
      }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          borderRadius: "12px",
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(244,52,52,0.45)" : "rgba(244,52,52,0.15)"}`,
          background: hovered ? "rgba(244,52,52,0.06)" : "rgba(255,255,255,0.03)",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        {/* ── Thumbnail container ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
          }}
        >
          {/*
            BLURRED BACKDROP — same image scaled up + blurred to fill the
            container. Elegantly fills the letterbox area instead of showing
            a plain dark void, making any aspect ratio look polished.
          */}
          
          <img
            src={project.thumbnail}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(18px) brightness(0.4) saturate(1.4)",
              transform: "scale(1.15)",
              pointerEvents: "none",
              userSelect: "none",
            }}
            
          />

          {/*
            MAIN IMAGE — contain so the full thumbnail is always visible
            and never distorted, sitting cleanly on the blurred backdrop.
          */}
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s ease",
              display: "block",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const p = (e.target as HTMLImageElement).parentElement;
              if (p) p.style.background = "#2a2222";
            }}
          />

          {/* Hover overlay */}
          <div
            style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: "rgba(0,0,0,0.5)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "13px", fontFamily: "monospace", color: "#fff",
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.6)",
                padding: "8px 20px", borderRadius: "4px",
                transform: hovered ? "scale(1)" : "scale(0.85)",
                transition: "transform 0.3s ease",
              }}
            >
              {project.type === "web"   && "Visit Site →"}
              {project.type === "figma" && "Open in Figma →"}
            </span>
          </div>

          {/* Type badge */}
          <span
            style={{
              position: "absolute", top: "10px", left: "10px", zIndex: 3,
              fontSize: "10px", fontFamily: "monospace",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#fff", background: cfg.badge,
              padding: "3px 10px", borderRadius: "4px",
            }}
          >
            {cfg.label}
          </span>
        </div>

        {/* Card body */}
        <div style={{ padding: "16px" }}>
          <h3 style={{
            fontFamily: "inherit", fontSize: "13px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.06em",
            color: "#fff", margin: "0 0 6px",
          }}>
            {project.title}
          </h3>
          <p style={{
            fontSize: "11px", fontFamily: "monospace",
            color: "#6b7280", lineHeight: 1.6, margin: 0,
          }}>
            {project.description}
          </p>
        </div>
      </a>
    </div>
  );
}

function BehanceCard() {
  const { ref, inView } = useInView(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 0.18; }
          50%       { opacity: 0.45; }
        }
        @keyframes beFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.6; }
        }
        .behance-dot-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px);
          background-size: 28px 28px;
          animation: dotPulse 4s ease-in-out infinite;
          border-radius: 16px;
        }
        .be-logo-wrap { animation: beFloat 3.2s ease-in-out infinite; display: inline-block; }
        .be-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 260px; height: 160px;
          background: radial-gradient(ellipse, rgba(30,80,255,0.18) 0%, transparent 70%);
          animation: glowPulse 3s ease-in-out infinite;
          pointer-events: none;
        }
        .behance-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 38px; font-size: 12px; font-family: monospace;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #fff; border: 1px solid rgba(255,255,255,0.25);
          border-radius: 6px; background: rgba(255,255,255,0.06);
          text-decoration: none; transition: all 0.3s ease; position: relative;
        }
        .behance-cta-btn:hover {
          background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.55);
          transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .behance-tag-row { display: flex; align-items: center; justify-content: center; gap: 0; flex-wrap: wrap; }
        .behance-tag { font-size: 11px; font-family: monospace; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.28); padding: 0 20px; }
        .behance-tag-sep { color: rgba(255,255,255,0.15); font-size: 13px; }
      `}</style>

      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative", overflow: "hidden", borderRadius: "16px",
            border: `1px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"}`,
            background: "#08080f", padding: "72px 40px 56px",
            textAlign: "center", transition: "border-color 0.4s ease",
          }}
        >
          <div className="behance-dot-bg" aria-hidden="true" />
          <div className="be-glow" aria-hidden="true" />

          {[
            { top: "12px", left: "12px",  borderTop: "1px solid rgba(255,255,255,0.18)", borderLeft: "1px solid rgba(255,255,255,0.18)" },
            { top: "12px", right: "12px", borderTop: "1px solid rgba(255,255,255,0.18)", borderRight: "1px solid rgba(255,255,255,0.18)" },
            { bottom: "12px", left: "12px",  borderBottom: "1px solid rgba(255,255,255,0.18)", borderLeft: "1px solid rgba(255,255,255,0.18)" },
            { bottom: "12px", right: "12px", borderBottom: "1px solid rgba(255,255,255,0.18)", borderRight: "1px solid rgba(255,255,255,0.18)" },
          ].map((s, i) => (
            <div key={i} aria-hidden="true" style={{ position: "absolute", width: "18px", height: "18px", ...s }} />
          ))}

          <div style={{ position: "relative", marginBottom: "20px" }}>
            <div className="be-logo-wrap">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/behance/behance-original.svg"
                alt="Behance"
                style={{ width: "88px", height: "88px", filter: "brightness(0) invert(1)", margin: "0 auto", display: "block" }}
              />
            </div>
          </div>

          <p style={{ position: "relative", fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "32px" }}>
            All Graphic Design Work Lives on Behance
          </p>

          <div style={{ position: "relative", marginBottom: "44px" }}>
            <a href="https://www.behance.net/YOUR_BEHANCE_USERNAME" target="_blank" rel="noopener noreferrer" className="behance-cta-btn">
              View on Behance
              <span style={{ fontSize: "16px", lineHeight: 1 }}>↗</span>
            </a>
          </div>

          <div className="behance-tag-row" style={{ position: "relative" }}>
            {["Brand Identity", "Social Media", "Print Design"].map((tag, i, arr) => (
              <span key={tag} style={{ display: "flex", alignItems: "center" }}>
                <span className="behance-tag">{tag}</span>
                {i < arr.length - 1 && <span className="behance-tag-sep">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  const [active, setActive] = useState<ProjectType>("web");
  const [visible, setVisible] = useState(true);

  const filtered = projects.filter((p) => p.type === active);

  function handleFilter(val: ProjectType) {
    setVisible(false);
    setTimeout(() => {
      setActive(val);
      setVisible(true);
    }, 220);
  }

  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden"
      style={{ background: "#1B1919" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%", height: "80%",
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(161,25,25,0.3) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div style={{ display: "inline-block" }}>
            <h2 className="font-black-roboto text-4xl md:text-5xl uppercase text-white" style={{ margin: 0 }}>
              PROJECTS
            </h2>
            <div style={{ width: "25%", height: "3px", background: "#F43434", marginTop: "10px", borderRadius: "2px" }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {filters.map((f) => {
            const isActive = active === f.value;
            return (
              <button
                key={f.value}
                onClick={() => handleFilter(f.value)}
                style={{
                  padding: "8px 22px", fontSize: "11px", fontFamily: "monospace",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: isActive ? "#fff" : "#9ca3af",
                  background: isActive ? "#F43434" : "transparent",
                  border: `1px solid ${isActive ? "#F43434" : "rgba(244,52,52,0.3)"}`,
                  borderRadius: "4px", cursor: "pointer", transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(244,52,52,0.7)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(244,52,52,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
                  }
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
          }}
        >
          {active === "graphics" ? (
            <BehanceCard />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
