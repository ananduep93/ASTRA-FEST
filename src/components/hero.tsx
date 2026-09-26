"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

export function Hero() {
  const letters = ["A", "S", "T", "R", "A"];
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-8 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto overflow-hidden bg-fest-black text-fest-warm select-none scroll-mt-24"
    >
      {/* Top Festival Sub-Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-fest-border pb-3 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-fest-muted"
      >
        <div className="flex items-center space-x-2 text-fest-warm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-fest-accent shrink-0" />
          <span className="font-semibold text-fest-accent whitespace-nowrap">INTER-COLLEGE FEST • 2027</span>
          <span className="text-white/20 hidden xs:inline">/</span>
          <span className="hidden sm:inline text-fest-muted">NATIONAL CONCLAVE</span>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 text-fest-muted text-[10px] sm:text-[11px] flex-wrap">
          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fest-accent shrink-0" />
          <span className="text-fest-warm font-medium">DON BOSCO COLLEGE</span>
          <span>•</span>
          <span className="truncate">KOZHIKODE, KERALA</span>
        </div>
      </motion.div>

      {/* Centerpiece: Huge Interactive ASTRA Poster Typography */}
      <div className="relative z-10 my-auto py-4 sm:py-6 md:py-8 flex flex-col items-center justify-center text-center w-full">
        
        {/* Subtle festival edition eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full border border-fest-border bg-fest-dark/80 text-[9px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-fest-muted mb-3 sm:mb-5"
        >
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-fest-accent shrink-0" />
          <span>WHERE YOUTH MEETS MOMENTUM</span>
        </motion.div>

        {/* The Giant ASTRA Typographic Monolith with Fluid Responsive Sizing */}
        <div className="relative flex justify-center items-center py-1 sm:py-2 w-full max-w-full overflow-hidden">
          <div className="flex justify-center items-center tracking-[-0.04em] sm:tracking-[-0.03em] max-w-full">
            {letters.map((char, index) => {
              const isHovered = hoveredLetter === index;
              return (
                <motion.span
                  key={index}
                  onMouseEnter={() => setHoveredLetter(index)}
                  onMouseLeave={() => setHoveredLetter(null)}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -8,
                    transition: { type: "spring", stiffness: 450, damping: 14 }
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.12 + index * 0.05,
                  }}
                  className={`font-display font-black text-[17vw] sm:text-[15vw] md:text-9xl lg:text-[11.5rem] xl:text-[13rem] leading-[0.82] transition-colors duration-200 cursor-pointer select-none ${
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
            className="pointer-events-none absolute -inset-4 sm:-inset-8 bg-fest-accent/[0.04] blur-2xl sm:blur-3xl rounded-full"
            aria-hidden="true"
          />
        </div>

        {/* Festival Sub-Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-md sm:max-w-xl mx-auto mt-3 sm:mt-5 text-xs sm:text-sm md:text-base text-fest-muted font-light tracking-wide leading-relaxed px-2"
        >
          An extraordinary multi-stage festival uniting South India’s fiercest collegiate talent in Dance, Music, Photography, and Coding.
        </motion.p>

        {/* Interactive "EXPLORE PROGRAMS →" CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 sm:mt-8"
        >
          <a
            href="#programs"
            className="group relative inline-flex items-center gap-3 sm:gap-3.5 px-6 sm:px-9 py-3 sm:py-4 bg-fest-accent text-fest-black font-display font-black text-xs sm:text-sm tracking-widest uppercase rounded-full hover:bg-fest-warm transition-all duration-300 shadow-[0_4px_25px_rgba(255,61,0,0.35)] hover:shadow-[0_8px_35px_rgba(245,242,235,0.3)]"
          >
            <span>EXPLORE PROGRAMS</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-fest-black/20 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fest-black stroke-[3]" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Bottom Festival Poster Baseline Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 pt-3 sm:pt-4 border-t border-fest-border text-[9px] sm:text-[11px] font-mono text-fest-muted uppercase tracking-wider text-center sm:text-left"
      >
        <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap justify-center sm:justify-start">
          <span className="text-fest-warm font-semibold">4 ARENAS</span>
          <span>•</span>
          <span>NON-STOP COMPETITION</span>
          <span>•</span>
          <span className="text-fest-accent font-medium">CASH AWARDS & CITATIONS</span>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <span>HOSTED BY</span>
          <span className="text-fest-warm font-semibold">DON BOSCO COLLEGE</span>
          <span className="hidden sm:inline">// 2027</span>
        </div>
      </motion.div>
    </section>
  );
}
