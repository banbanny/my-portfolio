'use client'

import { useState } from "react";

const certifications = [
  { id: 1, label: "Certificate 1", issuer: "Issuer Name", year: "2024", image: "/cert1.jpg" },
  { id: 2, label: "Certificate 2", issuer: "Issuer Name", year: "2024", image: "/cert2.jpg" },
  { id: 3, label: "Certificate 3", issuer: "Issuer Name", year: "2023", image: "/cert3.jpg" },
  { id: 4, label: "Certificate 4", issuer: "Issuer Name", year: "2023", image: "/cert4.jpg" },
  { id: 5, label: "Certificate 5", issuer: "Issuer Name", year: "2024", image: "/cert5.jpg" },
  { id: 6, label: "Certificate 6", issuer: "Issuer Name", year: "2022", image: "/cert6.jpg" },
];

type Cert = typeof certifications[0];

function Lightbox({ cert, index, onClose, onPrev, onNext }: { cert: Cert; index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const total = certifications.length;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", backdropFilter:"blur(6px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth:"900px", width:"100%", borderRadius:"14px", overflow:"hidden", border:"1px solid rgba(244,52,52,0.3)" }}>
        {/* Top bar */}
        <div style={{ background:"#0d0d0d", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap", gap:"8px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontSize:"11px", fontWeight:500, color:"rgba(255,255,255,0.35)", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"3px 11px", whiteSpace:"nowrap" }}>
              {index + 1} / {total}
            </span>
            <div>
              <p style={{ fontSize:"12px", color:"#fff", margin:"0 0 2px", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" }}>{cert.label}</p>
              <p style={{ fontSize:"11px", color:"#F43434", margin:0 }}>{cert.issuer} · {cert.year}</p>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            {[{ label:"←", fn: onPrev }, { label:"→", fn: onNext }].map(({ label, fn }) => (
              <button key={label} onClick={fn} style={{ fontSize:"16px", color:"rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"6px", width:"34px", height:"34px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>{label}</button>
            ))}
            <div style={{ width:"1px", height:"22px", background:"rgba(255,255,255,0.1)", margin:"0 2px" }} />
            <button onClick={onClose} style={{ fontSize:"11px", fontWeight:500, color:"rgba(255,255,255,0.5)", background:"transparent", border:"1px solid rgba(255,255,255,0.14)", borderRadius:"6px", padding:"0 12px", height:"34px", cursor:"pointer", letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>Close ✕</button>
          </div>
        </div>
        <img src={cert.image} alt={cert.label} style={{ width:"100%", display:"block", maxHeight:"75vh", objectFit:"contain", background:"#111" }} />
      </div>
    </div>
  );
}

function CertFile({ cert, onSelect }: { cert: Cert; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onSelect}
      style={{ borderRadius:"10px", border:`1px solid ${hovered ? "#F43434" : "rgba(255,255,255,0.07)"}`, background: hovered ? "rgba(244,52,52,0.07)" : "rgba(255,255,255,0.03)", cursor:"pointer", overflow:"hidden", transform: hovered ? "translateY(-3px)" : "translateY(0)", transition:"all 0.22s ease" }}>
      <div style={{ width:"100%", aspectRatio:"16/10", overflow:"hidden", background:"#111" }}>
        <img src={cert.image} alt={cert.label}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform: hovered ? "scale(1.05)" : "scale(1)", transition:"transform 0.3s ease" }}
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
            const p = el.parentElement;
            if (p) { p.style.display = "flex"; p.style.alignItems = "center"; p.style.justifyContent = "center"; p.style.background = "#181818"; p.innerHTML = `<span style="font-size:32px">🎓</span>`; }
          }} />
      </div>
      <div style={{ padding:"10px 12px 13px" }}>
        <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.7)", margin:"0 0 3px", fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{cert.image.replace("/", "")}</p>
        <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.28)", letterSpacing:"0.05em" }}>{cert.label} · {cert.year}</span>
      </div>
    </div>
  );
}

function FolderModal({ onClose, onSelect }: { onClose: () => void; onSelect: (cert: Cert) => void }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", backdropFilter:"blur(5px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background:"#1a1a1a", borderRadius:"14px", border:"1px solid rgba(255,255,255,0.08)", width:"100%", maxWidth:"860px", maxHeight:"90vh", display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Title bar */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"12px 16px", background:"#222", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ width:13, height:13, borderRadius:"50%", background:"#ff5f57", cursor:"pointer" }} onClick={onClose} />
          <div style={{ width:13, height:13, borderRadius:"50%", background:"#febc2e" }} />
          <div style={{ width:13, height:13, borderRadius:"50%", background:"#28c840" }} />
          <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", letterSpacing:"0.08em", flex:1, textAlign:"center", fontWeight:500 }}>Certifications — File Manager</span>
        </div>
        {/* Path bar */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"8px 16px", background:"#1e1e1e", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.32)", background:"rgba(255,255,255,0.05)", borderRadius:"6px", padding:"4px 14px", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>~/portfolio/certifications/</span>
          <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.2)", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>{certifications.length} items</span>
        </div>
        {/* Responsive grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))", gap:"14px", padding:"16px", overflowY:"auto" }}>
          {certifications.map((cert) => (
            <CertFile key={cert.id} cert={cert} onSelect={() => { onClose(); onSelect(cert); }} />
          ))}
        </div>
        {/* Status bar */}
        <div style={{ padding:"8px 16px", background:"#1a1a1a", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.22)", letterSpacing:"0.07em" }}>{certifications.length} items · Click any certificate to view</span>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [folderOpen, setFolderOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => { if (selectedIndex === null) return; setSelectedIndex((selectedIndex - 1 + certifications.length) % certifications.length); };
  const handleNext = () => { if (selectedIndex === null) return; setSelectedIndex((selectedIndex + 1) % certifications.length); };

  return (
    <>
      <section id="certifications" className="relative py-16 md:py-24 overflow-hidden" style={{ background: "#1B1919" }}>
        <div className="absolute pointer-events-none" style={{ top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"100%", height:"100%", background:"radial-gradient(ellipse 60% 60% at 50% 50%, rgba(110,17,45,0.25) 0%, transparent 70%)" }} aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center">

            {/* LEFT — Text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="uppercase text-white mb-2" style={{ fontWeight:900, fontSize:"clamp(2rem, 7vw, 5rem)", letterSpacing:"0.02em" }}>CERTIFICATIONS</h2>
              <div style={{ width:"120px", height:"4px", background:"#F43434", borderRadius:"2px", marginBottom:"20px", margin:"0 auto 20px" }} className="md:mx-0" />
              <p style={{ fontSize:"clamp(13px, 1.8vw, 16px)", fontWeight:500, color:"rgba(255,255,255,0.38)", lineHeight:1.8, marginBottom:"20px", maxWidth:"420px" }} className="mx-auto md:mx-0">
                Here are the certificates I received and passed from online courses.
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#F43434", flexShrink:0 }} />
                <span style={{ fontSize:"11px", fontWeight:500, color:"rgba(255,255,255,0.22)", letterSpacing:"0.12em", textTransform:"uppercase" }}>{certifications.length} certificates earned</span>
              </div>
            </div>

            {/* RIGHT — Folder */}
            <div className="shrink-0 flex items-center justify-center">
              <button onClick={() => setFolderOpen(true)}
                onMouseEnter={(e) => { const icon = e.currentTarget.querySelector(".folder-icon") as HTMLElement; if (icon) icon.style.transform = "scale(1.1) translateY(-8px)"; e.currentTarget.style.background = "rgba(244,52,52,0.08)"; }}
                onMouseLeave={(e) => { const icon = e.currentTarget.querySelector(".folder-icon") as HTMLElement; if (icon) icon.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.background = "none"; }}
                style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"12px", padding:"20px 28px", borderRadius:"16px", transition:"background 0.2s ease" }}>
                <span className="folder-icon" style={{ fontSize:"clamp(80px, 15vw, 130px)", lineHeight:1, display:"block", transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>📁</span>
                <span style={{ fontSize:"11px", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>Open Folder</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {folderOpen && <FolderModal onClose={() => setFolderOpen(false)} onSelect={(cert) => { const idx = certifications.findIndex((c) => c.id === cert.id); setSelectedIndex(idx); }} />}
      {selectedIndex !== null && <Lightbox cert={certifications[selectedIndex]} index={selectedIndex} onClose={() => setSelectedIndex(null)} onPrev={handlePrev} onNext={handleNext} />}
    </>
  );
}
