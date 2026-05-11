'use client'

import { useState, useEffect, useRef } from "react";

type ProjectType = "web" | "figma" | "graphics" | "app";

interface Project {
  id: number;
  title: string;
  type: ProjectType;
  description: string;
  thumbnail: string;
  link?: string;
  repo?: string;        // ← GitHub repo URL for app projects
  screenshots?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Victory Chapel Christian Center - Church Website",
    type: "web",
    description: "This website serves as the official online platform of the church, providing a welcoming space where members and visitors can learn more about the church's mission, beliefs, and community.",
    thumbnail: "/vccc-thumbnail.jpg",
    repo: "https://github.com/YOUR_USERNAME/flash-review",
    link: "https://vccc-website-one.vercel.app/",
  },
  {
    id: 2,
    title: "Functional Portfolio Website",
    type: "web",
    description: "A fully functional and working portfolio website built with Next.js, showcasing projects, skills, and contact information in a sleek and modern design.",
    thumbnail: "/web-port.png",
    repo: "https://github.com/YOUR_USERNAME/flash-review",
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
    title: "Flash Review",
    type: "app",
    description: "Flash Review is a study companion designed to help students learn more effectively through interactive flashcards. It encourages active recall and repetition, making it easier to remember lessons, terms, and important concepts. 
    thumbnail: "/flashreview.png",
    repo: "https://github.com/banbanny/flashreview.git", // ← replace with your repo URL
    screenshots: ["/flashreview.png", "/flashreview.png", "/flashreview.png"],
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

const filters: { label: string; value: "webapp" | "figma" | "graphics" }[] = [
  { label: "WEB and APP PROJECTS", value: "webapp" },
  { label: "FIGMA DESIGNS", value: "figma" },
  { label: "GRAPHIC DESIGN", value: "graphics" },
];

const typeConfig: Record<ProjectType, { label: string; badge: string }> = {
  web:      { label: "Web Project",  badge: "#d11414" },
  app:      { label: "App Project",  badge: "#1a73e8" },
  figma:    { label: "Figma Design", badge: "#910d39" },
  graphics: { label: "Graphics",     badge: "#f16f24" },
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ── App Screenshot Modal ──
function AppModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const screenshots = project.screenshots ?? [];
  const total = screenshots.length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", backdropFilter:"blur(6px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth:"900px", width:"100%", borderRadius:"14px", overflow:"hidden", border:"1px solid rgba(26,115,232,0.35)" }}>
        <div style={{ background:"#0d0d0d", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap", gap:"8px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontSize:"11px", fontWeight:500, color:"rgba(255,255,255,0.35)", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"3px 11px", whiteSpace:"nowrap" }}>{current + 1} / {total}</span>
            <div>
              <p style={{ fontSize:"12px", color:"#fff", margin:"0 0 2px", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" }}>{project.title}</p>
              <p style={{ fontSize:"11px", color:"#1a73e8", margin:0 }}>App Screenshots</p>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            {total > 1 && [{ label:"←", fn: prev }, { label:"→", fn: next }].map(({ label, fn }) => (
              <button key={label} onClick={fn} style={{ fontSize:"16px", color:"rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"6px", width:"34px", height:"34px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>{label}</button>
            ))}
            <div style={{ width:"1px", height:"22px", background:"rgba(255,255,255,0.1)", margin:"0 2px" }} />
            <button onClick={onClose} style={{ fontSize:"11px", fontWeight:500, color:"rgba(255,255,255,0.5)", background:"transparent", border:"1px solid rgba(255,255,255,0.14)", borderRadius:"6px", padding:"0 12px", height:"34px", cursor:"pointer", letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>Close ✕</button>
          </div>
        </div>
        <div style={{ position:"relative", width:"100%", background:"#111", overflow:"hidden" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div style={{ position:"relative", width:"100%", aspectRatio:"16/9" }}>
            {screenshots.map((src, i) => (
              <img key={i} src={src} alt={`${project.title} screen ${i + 1}`}
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", opacity: i === current ? 1 : 0, transform: i === current ? "translateX(0)" : i < current ? "translateX(-60px)" : "translateX(60px)", transition:"opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)", pointerEvents:"none" }}
              />
            ))}
          </div>
          {total > 1 && (
            <div style={{ display:"flex", justifyContent:"center", gap:"6px", padding:"10px 0 12px" }}>
              {screenshots.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  style={{ width: i === current ? "20px" : "7px", height:"7px", borderRadius:"4px", background: i === current ? "#1a73e8" : "rgba(255,255,255,0.25)", border:"none", padding:0, cursor:"pointer", transition:"all 0.3s ease" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── GitHub icon SVG ──
function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, inView } = useInView();
  const cfg = typeConfig[project.type];
  const isApp = project.type === "app";

  const handleCardClick = () => {
    if (isApp) { setModalOpen(true); return; }
    if (project.link) window.open(project.link, "_blank", "noopener noreferrer");
  };

  return (
    <>
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s` }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleCardClick}
          style={{ display:"block", borderRadius:"12px", overflow:"hidden", border:`1px solid ${hovered ? "rgba(244,52,52,0.45)" : "rgba(244,52,52,0.15)"}`, background: hovered ? "rgba(244,52,52,0.06)" : "rgba(255,255,255,0.03)", transform: hovered ? "translateY(-5px)" : "translateY(0)", transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)", cursor:"pointer" }}
        >
          {/* Thumbnail */}
          <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", overflow:"hidden" }}>
            <img src={project.thumbnail} alt="" aria-hidden="true" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"blur(18px) brightness(0.4) saturate(1.4)", transform:"scale(1.15)", pointerEvents:"none" }} />
            <img src={project.thumbnail} alt={project.title} style={{ position:"relative", zIndex:1, width:"100%", height:"100%", objectFit:"contain", transform: hovered ? "scale(1.04)" : "scale(1)", transition:"transform 0.5s ease", display:"block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div style={{ position:"absolute", inset:0, zIndex:2, background:"rgba(0,0,0,0.5)", opacity: hovered ? 1 : 0, transition:"opacity 0.3s ease", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:"12px", fontFamily:"monospace", color:"#fff", letterSpacing:"0.12em", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.6)", padding:"8px 16px", borderRadius:"4px" }}>
                {isApp && "View Screenshots →"}
                {project.type === "web" && "Visit Site →"}
                {project.type === "figma" && "Open in Figma →"}
              </span>
            </div>
            <span style={{ position:"absolute", top:"10px", left:"10px", zIndex:3, fontSize:"10px", fontFamily:"monospace", letterSpacing:"0.08em", textTransform:"uppercase", color:"#fff", background:cfg.badge, padding:"3px 10px", borderRadius:"4px" }}>{cfg.label}</span>
          </div>

          {/* Info */}
          <div style={{ padding:"14px" }}>
            <h3 style={{ fontFamily:"inherit", fontSize:"clamp(11px, 1.5vw, 13px)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"#fff", margin:"0 0 6px" }}>{project.title}</h3>
            <p style={{ fontSize:"11px", fontFamily:"monospace", color:"#6b7280", lineHeight:1.6, margin:0 }}>{project.description}</p>

            {/* View Repository button — only for app projects with a repo */}
           {(isApp || project.type === "web") && project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // don't trigger card click
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "12px",
                  padding: "7px 14px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "5px",
                  textDecoration: "none",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.18)";
                }}
              >
                <GithubIcon />
                View Repository
              </a>
            )}
          </div>
        </div>
      </div>

      {modalOpen && <AppModal project={project} onClose={() => setModalOpen(false)} />}
    </>
  );
}

function BehanceCard() {
  const { ref, inView } = useInView(0.2);
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <style>{`
        @keyframes dotPulse { 0%,100% { opacity:0.18; } 50% { opacity:0.45; } }
        @keyframes beFloat { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-7px); } }
        @keyframes glowPulse { 0%,100% { opacity:0.3; } 50% { opacity:0.6; } }
        .behance-dot-bg { position:absolute; inset:0; background-image:radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px); background-size:28px 28px; animation:dotPulse 4s ease-in-out infinite; border-radius:16px; }
        .be-logo-wrap { animation:beFloat 3.2s ease-in-out infinite; display:inline-block; }
        .be-glow { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:260px; height:160px; background:radial-gradient(ellipse, rgba(30,80,255,0.18) 0%, transparent 70%); animation:glowPulse 3s ease-in-out infinite; pointer-events:none; }
        .behance-cta-btn { display:inline-flex; align-items:center; gap:10px; padding:14px 38px; font-size:12px; font-family:monospace; letter-spacing:0.16em; text-transform:uppercase; color:#fff; border:1px solid rgba(255,255,255,0.25); border-radius:6px; background:rgba(255,255,255,0.06); text-decoration:none; transition:all 0.3s ease; }
        .behance-cta-btn:hover { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.55); transform:translateY(-2px); }
      `}</style>
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition:"opacity 0.6s ease, transform 0.6s ease" }}>
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          style={{ position:"relative", overflow:"hidden", borderRadius:"16px", border:`1px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"}`, background:"#08080f", padding:"clamp(40px, 8vw, 72px) clamp(20px, 5vw, 40px) clamp(36px, 7vw, 56px)", textAlign:"center", transition:"border-color 0.4s ease" }}>
          <div className="behance-dot-bg" aria-hidden="true" />
          <div className="be-glow" aria-hidden="true" />
          <div style={{ position:"relative", marginBottom:"20px" }}>
            <div className="be-logo-wrap">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/behance/behance-original.svg" alt="Behance" style={{ width:"88px", height:"88px", filter:"brightness(0) invert(1)", margin:"0 auto", display:"block" }} />
            </div>
          </div>
          <p style={{ position:"relative", fontFamily:"monospace", fontSize:"11px", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:"32px" }}>All Graphic Design Work Lives on Behance</p>
          <div style={{ position:"relative", marginBottom:"44px" }}>
            <a href="https://www.behance.net/YOUR_BEHANCE_USERNAME" target="_blank" rel="noopener noreferrer" className="behance-cta-btn">View on Behance <span style={{ fontSize:"16px" }}>↗</span></a>
          </div>
          <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", gap:"4px" }}>
            {["Brand Identity", "Social Media", "Print Design"].map((tag, i, arr) => (
              <span key={tag} style={{ display:"flex", alignItems:"center" }}>
                <span style={{ fontSize:"11px", fontFamily:"monospace", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", padding:"0 16px" }}>{tag}</span>
                {i < arr.length - 1 && <span style={{ color:"rgba(255,255,255,0.15)" }}>|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  const [active, setActive] = useState<"webapp" | "figma" | "graphics">("webapp");
  const [visible, setVisible] = useState(true);

  const filtered = active === "webapp"
    ? projects.filter((p) => p.type === "web" || p.type === "app")
    : projects.filter((p) => p.type === active);

  function handleFilter(val: "webapp" | "figma" | "graphics") {
    setVisible(false);
    setTimeout(() => { setActive(val); setVisible(true); }, 220);
  }

  return (
    <section id="projects" className="relative py-16 md:py-24 overflow-hidden" style={{ background: "#1B1919" }}>
      <div className="absolute pointer-events-none" style={{ top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:"80%", height:"80%", background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(161,25,25,0.3) 0%, transparent 70%)" }} aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div style={{ display:"inline-block" }}>
            <h2 className="font-black-roboto uppercase text-white" style={{ fontSize:"clamp(2rem, 6vw, 3.5rem)", margin:0 }}>PROJECTS</h2>
            <div style={{ width:"25%", height:"3px", background:"#F43434", marginTop:"10px", borderRadius:"2px" }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-10 md:mb-12">
          {filters.map((f) => {
            const isActive = active === f.value;
            return (
              <button key={f.value} onClick={() => handleFilter(f.value)}
                style={{ padding:"8px 16px", fontSize:"10px", fontFamily:"monospace", letterSpacing:"0.1em", textTransform:"uppercase", color: isActive ? "#fff" : "#9ca3af", background: isActive ? "#F43434" : "transparent", border:`1px solid ${isActive ? "#F43434" : "rgba(244,52,52,0.3)"}`, borderRadius:"4px", cursor:"pointer", transition:"all 0.25s ease" }}
                onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(244,52,52,0.7)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; } }}
                onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(244,52,52,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; } }}>
                {f.label}
              </button>
            );
          })}
        </div>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition:"opacity 0.22s ease, transform 0.22s ease" }}>
          {active === "graphics" ? (
            <BehanceCard />
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap:"20px" }}>
              {filtered.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
