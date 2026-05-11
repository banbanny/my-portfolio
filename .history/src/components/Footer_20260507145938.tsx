'use client'

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <footer ref={ref} id="contact" className="relative min-h-[85vh] flex flex-col overflow-hidden bg-[#1B1919]">
        <style>{`
          @keyframes fadeInLeft { from { opacity:0; transform:translateX(-50px); } to { opacity:1; transform:translateX(0); } }
          @keyframes fadeInRight { from { opacity:0; transform:translateX(50px); } to { opacity:1; transform:translateX(0); } }
          @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          @keyframes glowFade { from { opacity:0; } to { opacity:1; } }
          @keyframes modalIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
          .footer-glow-left  { animation: glowFade 1s ease forwards; }
          .footer-glow-right { animation: glowFade 1s ease 0.2s forwards; }
          .footer-cta        { animation: fadeInLeft 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
          .footer-links      { animation: fadeInRight 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
          .footer-copyright  { animation: fadeInUp 0.6s ease 0.6s both; }
          .cv-modal-inner    { animation: modalIn 0.3s ease both; }
          .contact-btn {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 16px; border-radius: 4px; font-size: 12px;
            letter-spacing: 0.05em; transition: opacity 0.2s, background 0.2s;
            border: 1px solid rgba(255,255,255,0.25); color: #fff;
            text-decoration: none; white-space: nowrap;
          }
          .contact-btn:hover { opacity: 0.75; }
        `}</style>

        {/* Glows */}
        <div className={`absolute bottom-0 left-0 pointer-events-none ${visible ? "footer-glow-left" : ""}`}
          style={{ width:"60%", height:"120%", opacity: visible ? undefined : 0, background:"radial-gradient(ellipse 80% 80% at 0% 100%, rgba(210,40,40,0.7) 0%, rgba(255,60,0,0.3) 40%, transparent 75%)" }} aria-hidden="true" />
        <div className={`absolute bottom-0 right-0 pointer-events-none ${visible ? "footer-glow-right" : ""}`}
          style={{ width:"60%", height:"70%", opacity: visible ? undefined : 0, background:"radial-gradient(ellipse 80% 80% at 100% 100%, rgba(210,40,40,0.7) 0%, rgba(255,60,0,0.3) 40%, transparent 75%)" }} aria-hidden="true" />

        {/* Main content */}
        <div className="relative flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 w-full">
            <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-8 md:gap-10">

              {/* CTA heading */}
              <h2 className={`font-black-roboto uppercase leading-tight ${visible ? "footer-cta" : ""}`}
                style={{ fontSize:"clamp(2rem, 7vw, 4.5rem)", opacity: visible ? undefined : 0 }}>
                <span style={{ color:"#F43434" }}>WANT TO</span><br />
                <span className="text-white">COLLABORATE?</span>
              </h2>

              {/* Contact buttons */}
              <div className={`flex flex-col items-center md:items-end gap-3 ${visible ? "footer-links" : ""}`}
                style={{ opacity: visible ? undefined : 0 }}>

                {/* Row 1 — Email + Phone */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                  <a href="mailto:ivanne.obediente09@gmail.com" className="contact-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    ivanne.obediente09@gmail.com
                  </a>
                  <a href="tel:+639917253616" className="contact-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.07 3.18 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>
                    +63 9917253616
                  </a>
                </div>

                {/* Row 2 — GitHub + LinkedIn + CV */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                  <a href="https://github.com/banbanny" target="_blank" rel="noopener noreferrer" className="contact-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
                    GitHub
                  </a>

                  {/* ── NEW: LinkedIn button ── */}
                  <a href="https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME" target="_blank" rel="noopener noreferrer" className="contact-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>

                  {/* ── CV button — opens scrollable modal ── */}
                  <button onClick={() => setShowCV(true)} className="contact-btn" style={{ cursor: "pointer", background: "transparent" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 1.5L18.5 8H14zM8 13h8v1.5H8zm0 3h8v1.5H8zm0-6h5v1.5H8z"/></svg>
                    View CV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`relative w-full pb-6 px-5 sm:px-6 ${visible ? "footer-copyright" : ""}`} style={{ opacity: visible ? undefined : 0 }}>
          <div className="max-w-6xl mx-auto">
            <div className="w-full h-px mb-3 bg-[#F43434]/20" />
            <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase text-center">
              © {new Date().getFullYear()} Ivanne Obediente. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── CV Modal — scrollable, supports 2 pages ── */}
      {showCV && (
        <div
          onClick={() => setShowCV(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(10,8,8,0.92)",
            backdropFilter: "blur(14px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            className="cv-modal-inner"
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: "780px",
              height: "90vh",
              background: "#111",
              border: "1px solid rgba(244,52,52,0.25)",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex", flexDirection: "column",
              boxShadow: "0 0 60px rgba(244,52,52,0.12)",
            }}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 18px",
              borderBottom: "1px solid rgba(244,52,52,0.15)",
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "monospace", fontSize: "14px", fontWeight: "bold" letterSpacing: "0.2em", color: "#F43434", textTransform: "uppercase" }}>
                RESUME 
              </span>
              <button
                onClick={() => setShowCV(false)}
                style={{
                  background: "none", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "4px", padding: "4px 12px",
                  color: "#9ca3af", fontFamily: "monospace", fontSize: "11px",
                  cursor: "pointer", letterSpacing: "0.1em",
                }}
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Scrollable image container — page 1 then page 2 stacked */}
            <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
              {/* Page 1 */}
              <img
                src="/cv-page1.png"
                alt="CV Page 1"
                style={{ width: "100%", display: "block" }}
              />
              {/* Page 2 */}
              <img
                src="/cv-page2.png"
                alt="CV Page 2"
                style={{ width: "100%", display: "block" }}
              />
              {/*
                NOTE: rename your CV images to cv-page1.jpg and cv-page2.jpg
                and place them in the /public folder.
                If your CV is a single file with 2 pages, export each page
                as a separate JPG/PNG from your PDF viewer or Photoshop.
              */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
