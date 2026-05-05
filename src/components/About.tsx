'use client'

import { useEffect, useRef, useState } from "react";

const skills = [
  { label: "DESIGNING",    offset: "0%",  delay: 0   },
  { label: "PRESENTATION", offset: "18%", delay: 0.1 },
  { label: "UI / UX",      offset: "28%", delay: 0.2 },
  { label: "LAYOUTS",      offset: "12%", delay: 0.3 },
  { label: "DEVELOP",      offset: "5%",  delay: 0.4 },
];

const stackItems = [
  { label: "UI/UX Design",  value: "Figma" },
  { label: "Graphic Design", value: "Photoshop, Canva" },
  { label: "Presentations",  value: "PowerPoint, Canva" },
  { label: "Development",    value: "HTML, CSS, JS, Next.js" },
];

export default function About() {
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Cycling highlight loop
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      setActiveIndex(i % skills.length);
      i++;
    }, 1200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .about-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(244,52,52,0.1);
          border-radius: 8px;
          padding: 16px;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .about-card:hover {
          border-color: rgba(244,52,52,0.4);
          background: rgba(244,52,52,0.05);
          transform: translateY(-2px);
        }

        .skill-row {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: default;
          transition: transform 0.3s ease;
        }
        .skill-row:hover {
          transform: translateX(6px);
        }
        .skill-label {
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          transition: color 0.35s ease, text-shadow 0.35s ease;
        }
        .skill-row.active .skill-label {
          color: #F43434;
          text-shadow: 0 0 18px rgba(244,52,52,0.55);
          animation: floatY 1.8s ease-in-out infinite;
        }
        .skill-row:not(.active) .skill-label {
          color: #fff;
          text-shadow: none;
        }
        .skill-bar {
          height: 2px;
          background: #F43434;
          border-radius: 2px;
          transition: width 0.4s ease, opacity 0.4s ease;
        }
        .skill-row.active .skill-bar {
          width: 28px;
          opacity: 1;
        }
        .skill-row:not(.active) .skill-bar {
          width: 0px;
          opacity: 0;
        }
        .skill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #F43434;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(244,52,52,0.8);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .skill-row.active .skill-dot  { opacity: 1; transform: scale(1); }
        .skill-row:not(.active) .skill-dot { opacity: 0; transform: scale(0); }
      `}</style>

      <section
        id="about"
        className="relative py-24 overflow-hidden"
        style={{ background: "#1B1919" }}
        ref={ref}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%", left: "30%",
            transform: "translate(-50%, -50%)",
            width: "100%", height: "100%",
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(110, 17, 45, 0.39) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">

            {/* ── LEFT — About content ── */}
            <div className="flex gap-8 items-start flex-1">
              <div className="flex-1">

                {/* Heading */}
                <div
                  style={{
                    opacity: inView ? 1 : 0,
                    animation: inView ? "fadeInUp 0.55s ease 0.05s both" : "none",
                  }}
                >
                  <h2 className="font-black-roboto text-4xl md:text-5xl uppercase text-white mb-2">
                    ABOUT
                  </h2>
                  <div className="w-12 h-1 mb-8" style={{ background: "#F43434" }} />
                </div>

                {/* Body text */}
                <div
                  style={{
                    opacity: inView ? 1 : 0,
                    animation: inView ? "fadeInUp 0.55s ease 0.15s both" : "none",
                  }}
                >
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mb-4">
                    I&apos;m an aspiring developer based in the Philippines with a strong interest
                    in creating clean and user-friendly digital experiences. I focus on UI/UX
                    and visual design, graphic designing, and presentation layouts.
                  </p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
                    Currently pursuing a degree in Information Technology, I have hands-on
                    experience with design and development tools that help bring ideas to life.
                    I&apos;m continuously learning and improving my skills to build practical
                    and visually engaging projects.
                  </p>
                </div>

                {/* Stack cards */}
                <div className="mt-10 grid grid-cols-2 gap-4">
                  {stackItems.map((item, i) => (
                    <div
                      key={item.label}
                      className="about-card"
                      style={{
                        opacity: inView ? 1 : 0,
                        animation: inView
                          ? `fadeInUp 0.5s ease ${0.25 + i * 0.08}s both`
                          : "none",
                      }}
                    >
                      <p
                        className="font-black-roboto text-xs uppercase mb-1"
                        style={{ color: "#F43434" }}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT — What I Do ── */}
            <div className="md:w-72 shrink-0">

              {/* Heading */}
              <div
                style={{
                  opacity: inView ? 1 : 0,
                  animation: inView ? "fadeInUp 0.55s ease 0.1s both" : "none",
                }}
              >
                <h2 className="font-black-roboto text-3xl md:text-4xl uppercase text-white">
                  WHAT I DO?
                </h2>
                <p className="italic text-sm mt-1 mb-8" style={{ color: "#F43434" }}>
                  ( and love doing )
                </p>
              </div>

              {/* Animated skills */}
              <div className="flex flex-col gap-4">
                {skills.map((skill, i) => (
                  <div
                    key={skill.label}
                    className={`skill-row${activeIndex === i ? " active" : ""}`}
                    style={{
                      marginLeft: skill.offset,
                      opacity: inView ? 1 : 0,
                      animation: inView
                        ? `slideInLeft 0.5s ease ${skill.delay + 0.2}s both`
                        : "none",
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <span className="skill-bar" />
                    <span className="skill-label">{skill.label}</span>
                    <span className="skill-dot" />
                  </div>
                ))}
              </div>

              {/* Bottom accent line */}
              <div
                style={{
                  marginTop: "28px",
                  height: "1px",
                  background: "linear-gradient(to right, #F43434, transparent)",
                  width: inView ? "80%" : "0%",
                  transition: "width 0.9s ease 0.8s",
                }}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
