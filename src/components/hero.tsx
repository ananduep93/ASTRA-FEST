"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

const arenas = [
  { num: "01", name: "DANCE" },
  { num: "02", name: "MUSIC" },
  { num: "03", name: "PHOTO" },
  { num: "04", name: "CODING" },
];

export function Hero() {
  const letters = ["A", "S", "T", "R", "A"];
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  return (
    <section
      id="hero"
      className="relative w-full max-w-7xl mx-auto overflow-hidden bg-fest-black text-fest-warm select-none scroll-mt-24 px-4 sm:px-8 lg:px-14"
    >
      {/* ========================================================================= */}
      {/* 1. DEDICATED MOBILE HERO DESIGN (< md screens)                             */}
      {/* ========================================================================= */}
      <div className="flex md:hidden flex-col justify-between w-full min-h-[100svh] pt-28 pb-5">
        
        {/* Top Mobile Sub-Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center justify-between border-b border-fest-border pb-2.5 text-[10px] font-mono tracking-widest text-fest-muted uppercase"
        >
          <div className="flex items-center gap-1.5 text-fest-accent font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
            <span>INTER-COLLEGE • 2027</span>
          </div>
          <div className="flex items-center gap-1 text-fest-warm text-[10px]">
            <MapPin className="w-3 h-3 text-fest-accent shrink-0" />
            <span>DON BOSCO, KOZHIKODE</span>
          </div>
        </motion.div>

        {/* Centerpiece: Mobile Festival Poster Monolith */}
        <div className="relative my-auto py-3 flex flex-col items-center text-center w-full">
          
          {/* Subtle Background Cosmic Rings for Stage Depth */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <svg viewBox="0 0 300 300" className="w-72 h-72">
              <circle
                cx="150"
                cy="150"
                r="130"
                stroke="#FF3D00"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                fill="none"
                className="animate-spin"
                style={{ animationDuration: "35s" }}
              />
              <circle cx="150" cy="150" r="95" stroke="#F5F2EB" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <circle cx="150" cy="150" r="60" stroke="#FF3D00" strokeWidth="1.5" fill="none" opacity="0.4" />
            </svg>
          </div>

          {/* Festival Eyebrow Badge & Official Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center mb-1"
          >
            <div className="relative w-12 h-12 flex items-center justify-center mb-2">
              <div className="absolute inset-0 bg-fest-accent/25 rounded-full blur-md animate-pulse" />
              <Image
                src="/logo.png"
                alt="ASTRA Official Logo"
                width={48}
                height={48}
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,61,0,0.7)]"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-fest-accent/30 bg-fest-accent/10 text-[9px] font-mono tracking-[0.22em] text-fest-accent uppercase font-bold">
              <Sparkles className="w-2.5 h-2.5 text-fest-accent" />
              <span>WHERE YOUTH MEETS MOMENTUM</span>
            </div>
          </motion.div>

          {/* Giant Mobile ASTRA Typography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 my-0.5"
          >
            <h1 className="font-display font-black text-[25vw] tracking-[-0.04em] leading-none text-fest-warm drop-shadow-[0_0_35px_rgba(255,61,0,0.5)]">
              ASTRA
            </h1>
          </motion.div>

          {/* Festival Sub-Statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 max-w-xs text-xs text-fest-muted font-light tracking-wide leading-relaxed mt-1 px-2"
          >
            South India’s premier collegiate battle uniting the fiercest talent in Dance, Music, Photography, and Coding.
          </motion.p>

          {/* 4 Interactive Arena Quick Chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 grid grid-cols-4 gap-1.5 w-full max-w-xs mt-4"
          >
            {arenas.map((a) => (
              <a
                key={a.num}
                href="#programs"
                className="flex flex-col items-center justify-center py-2 px-1 rounded-xl border border-white/10 bg-fest-dark/80 hover:border-fest-accent/60 transition-colors"
              >
                <span className="font-mono text-[9px] text-fest-accent font-bold">{a.num}</span>
                <span className="font-display font-black text-[10px] text-fest-warm tracking-wider">{a.name}</span>
              </a>
            ))}
          </motion.div>

          {/* Mobile CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative z-10 mt-3.5 w-full max-w-xs"
          >
            <a
              href="#programs"
              className="group w-full py-3.5 px-6 rounded-full bg-fest-accent text-fest-black font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,61,0,0.4)] hover:bg-fest-warm transition-all duration-300"
            >
              <span>EXPLORE ALL PROGRAMS</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Mobile Bottom Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative z-10 flex items-center justify-between border-t border-fest-border pt-2.5 text-[9px] font-mono text-fest-muted uppercase"
        >
          <span className="text-fest-accent font-semibold">4 ARENAS • CASH AWARDS</span>
          <span className="text-fest-warm font-semibold">DON BOSCO COLLEGE</span>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP HERO DESIGN (>= md screens)                                     */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col justify-between w-full min-h-[100svh] pt-24 sm:pt-28 md:pt-32 pb-8">
        
        {/* Top Desktop Festival Sub-Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center justify-between gap-3 border-b border-fest-border pb-3 text-xs font-mono tracking-widest uppercase text-fest-muted"
        >
          <div className="flex items-center space-x-2 text-fest-warm">
            <span className="w-2 h-2 rounded-full bg-fest-accent shrink-0" />
            <span className="font-semibold text-fest-accent whitespace-nowrap">INTER-COLLEGE FEST • 2027</span>
            <span className="text-white/20">/</span>
            <span className="text-fest-muted">NATIONAL CONCLAVE</span>
          </div>

          <div className="flex items-center space-x-2 text-fest-muted text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-fest-accent shrink-0" />
            <span className="text-fest-warm font-medium">DON BOSCO COLLEGE</span>
            <span>•</span>
            <span className="truncate">KOZHIKODE, KERALA</span>
          </div>
        </motion.div>

        {/* Centerpiece: Monumental Interactive ASTRA Poster Typography */}
        <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center text-center w-full">
          
          {/* Subtle festival edition eyebrow & Official Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center mb-5"
          >
            <div className="relative w-16 h-16 lg:w-20 lg:h-20 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 bg-fest-accent/20 rounded-full blur-xl animate-pulse" />
              <Image
                src="/logo.png"
                alt="ASTRA Official Logo Emblem"
                width={80}
                height={80}
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,61,0,0.65)] hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fest-border bg-fest-dark/80 text-[11px] font-mono tracking-[0.25em] uppercase text-fest-muted">
              <Sparkles className="w-3 sm:h-3 text-fest-accent shrink-0" />
              <span>WHERE YOUTH MEETS MOMENTUM</span>
            </div>
          </motion.div>

          {/* The Giant ASTRA Typographic Monolith with Spring Hover Physics */}
          <div className="relative flex justify-center items-center py-2 w-full max-w-full overflow-hidden">
            <div className="flex justify-center items-center tracking-[-0.03em] max-w-full">
              {letters.map((char, index) => {
                const isHovered = hoveredLetter === index;
                return (
                  <motion.span
                    key={index}
                    onMouseEnter={() => setHoveredLetter(index)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{
                      scale: 1.1,
                      y: -8,
                      transition: { type: "spring", stiffness: 450, damping: 14 },
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.12 + index * 0.05,
                    }}
                    className={`font-display font-black text-9xl lg:text-[11.5rem] xl:text-[13rem] leading-[0.82] transition-colors duration-200 cursor-pointer select-none ${
                      isHovered
                        ? "text-fest-accent drop-shadow-[0_0_35px_rgba(255,61,0,0.6)]"
                        : "text-fest-warm hover:text-fest-accent"
                    }`}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>

            {/* Underlay Poster Glow Anchor */}
            <div
              className="pointer-events-none absolute -inset-8 bg-fest-accent/[0.04] blur-3xl rounded-full"
              aria-hidden="true"
            />
          </div>

          {/* Festival Sub-Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl mx-auto mt-5 text-base text-fest-muted font-light tracking-wide leading-relaxed px-2"
          >
            An extraordinary multi-stage festival uniting South India’s fiercest collegiate talent in Dance, Music, Photography, and Coding.
          </motion.p>

          {/* Interactive "EXPLORE PROGRAMS →" CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <a
              href="#programs"
              className="group relative inline-flex items-center gap-3.5 px-9 py-4 bg-fest-accent text-fest-black font-display font-black text-sm tracking-widest uppercase rounded-full hover:bg-fest-warm transition-all duration-300 shadow-[0_4px_25px_rgba(255,61,0,0.35)] hover:shadow-[0_8px_35px_rgba(245,242,235,0.3)]"
            >
              <span>EXPLORE PROGRAMS</span>
              <div className="w-6 h-6 rounded-full bg-fest-black/20 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-fest-black stroke-[3]" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Bottom Festival Poster Baseline Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="relative z-10 flex items-center justify-between gap-4 pt-4 border-t border-fest-border text-[11px] font-mono text-fest-muted uppercase tracking-wider text-left"
        >
          <div className="flex items-center space-x-3 flex-wrap">
            <span className="text-fest-warm font-semibold">4 ARENAS</span>
            <span>•</span>
            <span>NON-STOP COMPETITION</span>
            <span>•</span>
            <span className="text-fest-accent font-medium">CASH AWARDS & CITATIONS</span>
          </div>

          <div className="flex items-center space-x-2">
            <span>HOSTED BY</span>
            <span className="text-fest-warm font-semibold">DON BOSCO COLLEGE</span>
            <span>// 2027</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
