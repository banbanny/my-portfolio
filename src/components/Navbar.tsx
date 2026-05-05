"use client";

import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background:
          "linear-gradient(180deg, rgba(27,25,25,0.98) 0%, rgba(27,25,25,0.85) 100%)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(244,52,52,0.1)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Name */}
        <div>
        
          <p
            className="font-black-roboto text-sm tracking-widest uppercase leading-tight"
            style={{ color: "#F43434" }}
          >
            Ivanne
          </p>
          <p className="font-black-roboto text-sm tracking-widest uppercase leading-tight text-white">
            Obediente
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-white">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 bg-white transition-transform"
            style={menuOpen ? { transform: "rotate(45deg) translate(3px, 3px)" } : {}}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-opacity"
            style={menuOpen ? { opacity: 0 } : {}}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-transform"
            style={menuOpen ? { transform: "rotate(-45deg) translate(3px, -3px)" } : {}}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-5"
          style={{ background: "rgba(27,25,25,0.98)" }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-white text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
