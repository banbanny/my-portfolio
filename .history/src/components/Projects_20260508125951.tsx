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
  screenshots?: string[]; // for app type — swipeable gallery
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
    title: "Flash Review",
    type: "app",
    description: "Logo and branding for a local business.",
    thumbnail: "/flashreview.png",
    // Add your screenshots here — these are the swipeable images shown in the card
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

// ── Swipeable screenshot gallery for App projects ──
function AppScreenshots({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = screenshots.length;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((c) => (c - 1 + total) % total);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((c) => (c + 1) % total);
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? setCurrent((c) => (c + 1) % total) : setCurrent((c) => (c - 1 + total) % total);
    touchStartX.current = null;
  };

  return (
    <div
      style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#111", userSelect: "none" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {screenshots.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} screenshot ${i + 1}`}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "contain",
            opacity: i === current ? 1 : 0,
            transform: i === current ? "translateX(0)" : i < current ? "translateX(-100%)" : "translateX(100%)",
            transition: "opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Prev / Next buttons */}
      {total > 1 && (
        <>
          <button onClick={prev} style={{ position:"absolute", left:"8px", top:"50%", transform:"translateY(-50%)", zIndex:10, background:"rgba(0,0,0,0.55)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", borderRadius:"50%", width:"30px", height:"30px", fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>‹</button>
          <button onClick={next} style={{ position:"absolute", right:"8px", top:"50%", transform:"translateY(-50%)", zIndex:10, background:"rgba(0,0,0,0.55)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", borderRadius:"50%", width:"30px", height:"30px", fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>›</button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div style={{ position:"absolute", bottom:"8px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"5px", zIndex:10 }}>
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              style={{ width: i === current ? "18px" : "6px", height:"6px", borderRadius:"3px", background: i === current ? "#F43434" : "rgba(255,255,255,0.35)", border:"none", padding:0, cursor:"pointer", transition:"all 0.3s ease" }}
            />
          ))}
        </div>
      )}

      {/* Screenshot count badge */}
      <span style={{ position:"absolute", top:"10px", right:"10px", zIndex:10, fontSize:"10px", fontFamily:"monospace", color:"rgba(255,255,255,0.55)", background:"rgba(0,0,0,0.5)", padding:"2px 8px", borderRadius:"4px" }}>
        {current + 1} / {total}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();
  const cfg = typeConfig[project.type];
  const isApp = project.type === "app";

  const cardInner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", borderRadius: "12px", overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(244,52,52,0.45)" : "rgba(244,52,52,0.15)"}`,
        background: hovered ? "rgba(244,52,52,0.06)" : "rgba(255,255,255,0.03)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: isApp ? "default" : "pointer",
      }}
    >
      {/* Thumbnail / Gallery */}
      {isApp && project.screenshots?.length ? (
        <div style={{ position: "relative" }}>
          <AppScreenshots screenshots={project.screenshots} title={project.title} />
          <span style={{ position:"absolute", top:"10px", left:"10px", zIndex:10, fontSize:"10px", fontFamily:"monospace", letterSpacing:"0.08em", textTransform:"uppercase", color:"#fff", background:cfg.badge, padding:"3px 10px", borderRadius:"4px" }}>{cfg.label}</span>
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
          <img src={project.thumbnail} alt="" aria-hidden="true" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"blur(18px) brightness(0.4) saturate(1.4)", transform:"scale(1.15)", pointerEvents:"none" }} />
          <img src={project.thumbnail} alt={project.title} style={{ position:"relative", zIndex:1, width:"100%", height:"100%", objectFit:"contain", transform: hovered ? "scale(1.04)" : "scale(1)", transition:"transform 0.5s ease", display:"block" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div style={{ position:"absolute", inset:0, zIndex:2, background:"rgba(0,0,0,0.5)", opacity: hovered ? 1 : 0, transition:"opacity 0.3s ease", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:"12px", fontFamily:"monospace", color:"#fff", letterSpacing:"0.12em", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.6)", padding:"8px 16px", borderRadius:"4px" }}>
              {project.type === "web" && "Visit Site →"}{project.type === "figma" && "Open in Figma →"}
            </span>
          </div>
          <span style={{ position:"absolute", top:"10px", left:"10px", zIndex:3, fontSize:"10px", fontFamily:"monospace", letterSpacing:"0.08em", textTransform:"uppercase", color:"#fff", background:cfg.badge, padding:"3px 10px", borderRadius:"4px" }}>{cfg.label}</span>
        </div>
      )}

      <div style={{ padding: "14px" }}>
        <h3 style={{ fontFamily:"inherit", fontSize:"clamp(11px, 1.5vw, 13px)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"#fff", margin:"0 0 6px" }}>{project.title}</h3>
        <p style={{ fontSize:"11px", fontFamily:"monospace", color:"#6b7280", lineHeight:1.6, margin:0 }}>{project.description}</p>
      </div>
    </div>
  );

  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s` }}>
      {isApp ? cardInner : (
        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          {cardInner}
        </a>
      )}
    </div>
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

  // Web + App combined
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

        {/* Filter buttons */}
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

        {/* Project grid */}
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
