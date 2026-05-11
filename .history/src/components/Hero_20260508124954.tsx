"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const WORDS = ["MAKING", "IDEAS", "COME TO", "LIFE"];
const WORD_COLORS = ["#FFFFFF", "#F43434", "#FFFFFF", "#FFFFFF"];
const WORD_DELAY = 300;
const START_DELAY = 400;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [imgVisible, setImgVisible] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const timers = [];
    WORDS.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleCount(i + 1);
          if (i === WORDS.length - 1) {
            timers.push(setTimeout(() => setImgVisible(true), 200));
          }
        }, START_DELAY + i * WORD_DELAY)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [mounted]);

  const WordLine = ({ index }) => (
    <span
      className="block"
      style={{
        color: WORD_COLORS[index],
        opacity: visibleCount > index ? 1 : 0,
        transform: visibleCount > index ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {WORDS[index]}
    </span>
  );

  return (
    <section id="home" className="relative overflow-hidden" style={{ background: "#1B1919" }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes glowPulse { 0%,100% { opacity:0.85; } 50% { opacity:1; } }
        @keyframes fadeInRight { from { opacity:0; transform:translateX(60px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        .hero-glow       { animation: fadeIn 1.2s ease forwards, glowPulse 4s ease-in-out 1.2s infinite; }
        .hero-photo      { animation: fadeInRight 1s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .hero-tags       { animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-img-mobile { transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1); }
        .hero-img-mobile.visible { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>

      {/* Desktop glow */}
      <div
        className="absolute inset-0 pointer-events-none hero-glow hidden md:block"
        style={{ background: "radial-gradient(ellipse 65% 70% at 75% 60%, rgba(143,29,29,0.81) 0%, rgba(124,9,9,0.4) 40%, transparent 70%)", opacity: mounted ? undefined : 0 }}
        aria-hidden="true"
      />
      {/* Mobile glow */}
      <div
        className="absolute inset-0 pointer-events-none hero-glow md:hidden"
        style={{ background: "radial-gradient(ellipse 100% 55% at 50% 45%, rgba(143,29,29,0.75) 0%, rgba(124,9,9,0.3) 55%, transparent 80%)", opacity: mounted ? undefined : 0 }}
        aria-hidden="true"
      />

      {/* DESKTOP PHOTO */}
      <div
        className="hidden md:block absolute bottom-0 right-0 md:right-[8%] hero-photo"
        style={{ width: "clamp(280px, 35vw, 420px)", height: "85vh", zIndex: 1, opacity: mounted ? undefined : 0 }}
      >
        <Image src="/hero.png" fill alt="Ivanne Obediente" className="object-cover object-top" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 85%, #1B1919 100%)" }} />
      </div>

      <div className="relative flex flex-col md:block" style={{ zIndex: 2 }}>

        {/* ── MOBILE: full-screen centered title ── */}
        <div
          className="md:hidden flex flex-col items-center justify-center text-center px-6"
          style={{ minHeight: "100svh", paddingTop: "clamp(70px, 12vh, 100px)", paddingBottom: "clamp(20px, 4vh, 40px)" }}
        >
          <h1 className="font-black-roboto uppercase leading-none" style={{ fontSize: "clamp(3rem, 16vw, 6rem)" }}>
            {WORDS.map((_, i) => <WordLine key={i} index={i} />)}
          </h1>
          <div
            className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-gray-400 tracking-widest uppercase hero-tags"
            style={{ opacity: mounted ? undefined : 0, animationDelay: `${START_DELAY + WORDS.length * WORD_DELAY}ms` }}
          >
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#f43434" }} />
            <span>Graphic</span><span>/</span><span>UI / UX</span><span>/</span><span>Develop</span>
          </div>
        </div>

        {/* ── MOBILE: photo below title ── */}
        <div
          className={`md:hidden w-full hero-img-mobile${imgVisible ? " visible" : ""}`}
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          <div style={{ position: "relative", width: "100%", height: "clamp(380px, 110vw, 560px)" }}>
            <Image src="/hero.png" fill alt="Ivanne Obediente" className="object-cover object-top" priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 70%, #1B1919 100%)" }} />
          </div>
        </div>

        {/* ── DESKTOP: left-aligned layout ── */}
        <div
          className="hidden md:flex max-w-6xl mx-auto px-6 w-full flex-col justify-center"
          style={{ minHeight: "100svh", paddingTop: "clamp(70px, 12vh, 120px)", paddingBottom: "clamp(20px, 4vh, 40px)" }}
        >
          <div className="max-w-lg">
            <h1 className="font-black-roboto uppercase leading-none" style={{ fontSize: "clamp(2.5rem, 11vw, 7rem)" }}>
              {WORDS.map((_, i) => <WordLine key={i} index={i} />)}
            </h1>
            <div
              className="flex flex-wrap items-center gap-2 mt-4 md:mt-6 text-xs text-gray-400 tracking-widest uppercase hero-tags"
              style={{ opacity: mounted ? undefined : 0, animationDelay: `${START_DELAY + WORDS.length * WORD_DELAY}ms` }}
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
