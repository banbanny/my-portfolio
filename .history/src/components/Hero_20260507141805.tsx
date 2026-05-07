"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ background: "#1B1919" }}
    >
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInRight { from { opacity:0; transform:translateX(60px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes glowPulse { 0%,100% { opacity:0.85; } 50% { opacity:1; } }
        .hero-glow   { animation: fadeIn 1.2s ease forwards, glowPulse 4s ease-in-out 1.2s infinite; }
        .hero-photo  { animation: fadeInRight 1s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .hero-line-1 { animation: fadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
        .hero-line-2 { animation: fadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both; }
        .hero-line-3 { animation: fadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.6s both; }
        .hero-tags   { animation: fadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s both; }
        .hero-img-mobile { animation: fadeInUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
      `}</style>

      {/* Desktop glow — right side */}
      <div
        className="absolute inset-0 pointer-events-none hero-glow hidden md:block"
        style={{
          background: "radial-gradient(ellipse 65% 70% at 75% 60%, rgba(143,29,29,0.81) 0%, rgba(124,9,9,0.4) 40%, transparent 70%)",
          opacity: mounted ? undefined : 0,
        }}
        aria-hidden="true"
      />
      {/* Mobile glow — centered */}
      <div
        className="absolute inset-0 pointer-events-none hero-glow md:hidden"
        style={{
          background: "radial-gradient(ellipse 100% 60% at 50% 40%, rgba(143,29,29,0.65) 0%, rgba(124,9,9,0.25) 55%, transparent 80%)",
          opacity: mounted ? undefined : 0,
        }}
        aria-hidden="true"
      />

      {/* DESKTOP PHOTO — absolute right, hidden on mobile */}
      <div
        className="hidden md:block absolute bottom-0 right-0 md:right-[8%] hero-photo"
        style={{
          width: "clamp(280px, 35vw, 420px)",
          height: "85vh",
          zIndex: 1,
          opacity: mounted ? undefined : 0,
        }}
      >
        <Image src="/hero.png" fill alt="Ivanne Obediente" className="object-cover object-top" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 85%, #1B1919 100%)" }} />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative flex flex-col md:block" style={{ zIndex: 2 }}>

        {/* ── MOBILE LAYOUT: centered, full-screen hero ── */}
        <div className="md:hidden flex flex-col items-center justify-center text-center min-h-screen px-6 pb-0"
          style={{ paddingTop: "clamp(70px, 12vh, 100px)" }}>

          {/* Title: "MAKING IDEAS" on one line, "COME TO LIFE" below */}
          <h1
            className="font-black-roboto uppercase leading-none"
            style={{ fontSize: "clamp(2.6rem, 14vw, 5rem)", opacity: mounted ? undefined : 0 }}
          >
            {/* Line 1: MAKING IDEAS side by side */}
            <span className="block hero-line-1">
              <span className="text-white">MAKING </span>
              <span style={{ color: "#F43434" }}>IDEAS</span>
            </span>
            {/* Line 2: COME TO LIFE */}
            <span className="text-white block hero-line-2" style={{ marginTop: "0.05em" }}>COME TO</span>
            <span className="text-white block hero-line-3" style={{ marginTop: "0.05em" }}>LIFE</span>
          </h1>

          <div
            className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-gray-400 tracking-widest uppercase hero-tags"
            style={{ opacity: mounted ? undefined : 0 }}
          >
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#f43434" }} />
            <span>Graphic</span><span>/</span><span>UI / UX</span><span>/</span><span>Develop</span>
          </div>

          {/* Mobile photo — full body, below tags */}
          <div
            className="hero-img-mobile w-full mt-6"
            style={{ opacity: mounted ? undefined : 0 }}
          >
            <div style={{ position: "relative", width: "100%", height: "clamp(360px, 100vw, 520px)" }}>
              <Image
                src="/hero.png"
                fill
                alt="Ivanne Obediente"
                className="object-cover object-top"
                priority
              />
              {/* Top + bottom fade */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1B1919 0%, transparent 15%, transparent 75%, #1B1919 100%)" }} />
            </div>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT: original left-aligned full-screen ── */}
        <div
          className="hidden md:flex max-w-6xl mx-auto px-6 w-full flex-col justify-center"
          style={{
            minHeight: "100svh",
            paddingTop: "clamp(70px, 12vh, 120px)",
            paddingBottom: "clamp(20px, 4vh, 40px)",
          }}
        >
          <div className="max-w-lg">
            <h1
              className="font-black-roboto uppercase leading-none"
              style={{ fontSize: "clamp(2.5rem, 11vw, 7rem)" }}
            >
              <span className="text-white block hero-line-1" style={{ opacity: mounted ? undefined : 0 }}>MAKING</span>
              <span className="block hero-line-2" style={{ color: "#F43434", opacity: mounted ? undefined : 0 }}>IDEAS</span>
              <span className="text-white block hero-line-3" style={{ opacity: mounted ? undefined : 0 }}>COME TO</span>
              <span className="text-white block hero-line-4" style={{ opacity: mounted ? undefined : 0 }}>LIFE</span>
            </h1>
            <div
              className="flex flex-wrap items-center gap-2 mt-4 md:mt-6 text-xs text-gray-400 tracking-widest uppercase hero-tags"
              style={{ opacity: mounted ? undefined : 0 }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#f43434" }} />
              <span>Graphic</span><span>/</span><span>UI / UX</span><span>/</span><span>Develop</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
