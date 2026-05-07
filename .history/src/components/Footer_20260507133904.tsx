'use client'

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} id="contact" className="relative min-h-[85vh] flex flex-col overflow-hidden bg-[#1B1919]">
      <style>{`
        @keyframes fadeInLeft { from { opacity:0; transform:translateX(-50px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeInRight { from { opacity:0; transform:translateX(50px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glowFade { from { opacity:0; } to { opacity:1; } }
        .footer-glow-left  { animation: glowFade 1s ease forwards; }
        .footer-glow-right { animation: glowFade 1s ease 0.2s forwards; }
        .footer-cta        { animation: fadeInLeft 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .footer-links      { animation: fadeInRight 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
        .footer-copyright  { animation: fadeInUp 0.6s ease 0.6s both; }
      `}</style>

      {/* Glows */}
      <div className={`absolute bottom-0 left-0 pointer-events-none ${visible ? "footer-glow-left" : ""}`}
        style={{ width:"60%", height:"120%", opacity: visible ? undefined : 0, background:"radial-gradient(ellipse 80% 80% at 0% 100%, rgba(210,40,40,0.7) 0%, rgba(255,60,0,0.3) 40%, transparent 75%)" }} aria-hidden="true" />
      <div className={`absolute bottom-0 right-0 pointer-events-none ${visible ? "footer-glow-right" : ""}`}
        style={{ width:"60%", height:"70%", opacity: visible ? undefined : 0, background:"radial-gradient(ellipse 80% 80% at 100% 100%, rgba(210,40,40,0.7) 0%, rgba(255,60,0,0.3) 40%, transparent 75%)" }} aria-hidden="true" />

      {/* Main content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 w-full">

          {/* Mobile: centered column | Desktop: row space-between */}
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
                <a href="mailto:ivanne.obediente09@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded text-xs tracking-wide transition-opacity hover:opacity-70"
                  style={{ border:"1px solid rgba(255,255,255,0.25)", color:"#fff" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  ivanne.obediente09@gmail.com
                </a>
                <a href="tel:+639917253616"
                  className="flex items-center gap-2 px-4 py-2 rounded text-xs tracking-wide transition-opacity hover:opacity-70"
                  style={{ border:"1px solid rgba(255,255,255,0.25)", color:"#fff" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.07 3.18 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>
                  +63 9917253616
                </a>
              </div>

              {/* Row 2 — GitHub + CV */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                <a href="https://github.com/banbanny" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded text-xs tracking-wide transition-opacity hover:opacity-70"
                  style={{ border:"1px solid rgba(255,255,255,0.25)", color:"#fff" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
                  GitHub
                </a>
                <a href="/cv.jpg" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded text-xs tracking-wide transition-opacity hover:opacity-70"
                  style={{ border:"1px solid rgba(255,255,255,0.25)", color:"#fff" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 1.5L18.5 8H14zM8 13h8v1.5H8zm0 3h8v1.5H8zm0-6h5v1.5H8z"/></svg>
                  View CV
                </a>
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
  );
}
