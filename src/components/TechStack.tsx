'use client'

import { useEffect, useRef, useState } from "react";

const techStacks = [
  { name: "HTML5",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

const devTools = [
  { name: "VS Code",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Git",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
  { name: "Canva",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
  { name: "Notion",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
  { name: "Vercel",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
];

function TechItem({
  name,
  icon,
  delay,
  visible,
}: {
  name: string;
  icon: string;
  delay: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border cursor-default aspect-square"
      style={{
        padding: "20px 12px",
        borderColor: hovered ? "rgba(244,52,52,0.4)" : "rgba(244,52,52,0.15)",
        background: hovered ? "rgba(244,52,52,0.06)" : "rgba(255,255,255,0.03)",
        transform: visible
          ? hovered
            ? "translateY(-4px) scale(1.05)"
            : "translateY(0) scale(1)"
          : "translateY(30px) rotate(-15deg) scale(0.7)",
        opacity: visible ? 1 : 0,
        transition: visible
          ? `transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, opacity 0.45s ease ${delay}ms, background 0.2s, border-color 0.2s`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={icon}
        alt={name}
        style={{
          width: "40px",
          height: "40px",
          objectFit: "contain",
          transform: hovered ? "rotate(10deg) scale(1.1)" : "rotate(0deg) scale(1)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "10px",
          color: hovered ? "#e5e7eb" : "#6b7280",
          textAlign: "center",
          letterSpacing: "0.05em",
          lineHeight: "1.3",
          marginTop: "8px",
          transition: "color 0.2s",
        }}
      >
        {name}
      </span>
    </div>
  );
}

function TechGrid({
  items,
  label,
  startDelay,
}: {
  items: { name: string; icon: string }[];
  label: string;
  startDelay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <p className="font-black-roboto uppercase tracking-widest text-gray-500 text-xs mb-6">
        {label}
      </p>
      <div
        className="grid justify-center gap-5 sm:gap-6 md:gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {items.map((item, i) => (
          <TechItem
            key={item.name}
            {...item}
            delay={startDelay + i * 60}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="relative py-24 overflow-hidden"
      style={{ background: "#1B1919" }}
    >
      <style>{`
        @keyframes sectionFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tech-heading { animation: sectionFadeUp 0.7s ease both; }
      `}</style>

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(210,40,40,0.15) 0%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16 tech-heading">
          <div style={{ display: "inline-block" }}>
            <h2 className="font-black-roboto text-4xl md:text-5xl uppercase">
              <span className="text-white">TECH </span>
              <span style={{ color: "#F43434" }}>STACKS</span>
            </h2>
            <div style={{ width: "20%", height: "3px", background: "#F43434", marginTop: "10px", borderRadius: "2px" }} />
          </div>
        </div>

        {/* Tech Stacks grid */}
        <div className="mb-16">
          <TechGrid items={techStacks} label="TECH STACKS" startDelay={0} />
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-12" style={{ background: "rgba(244,52,52,0.15)" }} />

        {/* Dev Tools grid */}
        <TechGrid items={devTools} label="DEVELOPMENT TOOLS" startDelay={100} />

      </div>
    </section>
  );
}
