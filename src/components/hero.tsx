"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, Sparkles, Trophy, Calendar, Users } from "lucide-react";

interface HeroProps {
  onOpenRegister?: () => void;
  onSelectArena?: (index: number) => void;
}

const LETTERS = ["A", "S", "T", "R", "A"];

export function Hero({ onOpenRegister, onSelectArena }: HeroProps) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Slower, smoother entrance animations using animejs
    import("animejs").then(({ animate, stagger }) => {
      const validLetters = lettersRef.current.filter(Boolean) as HTMLElement[];

      if (validLetters.length) {
        animate(validLetters, {
          opacity: [0, 1],
          translateY: [35, 0],
          scale: [0.9, 1],
          duration: 950,
          delay: stagger(80, { start: 200 }),
          ease: "outElastic(1, .85)",
        });
      }

      if (containerRef.current) {
        animate(containerRef.current.querySelectorAll(".fade-up-element"), {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 800,
          delay: stagger(100, { start: 450 }),
          ease: "outExpo",
        });
      }
    });
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center select-none overflow-hidden"
    >
      {/* Background radial cyber atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-fest-accent/[0.06] blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Top Festival Eyebrow Badge */}
      <div className="fade-up-element opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-fest-accent/30 bg-fest-accent/10 mb-3 sm:mb-4">
        <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
        <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-fest-accent uppercase">
          DON BOSCO COLLEGE // ONE DAY MEGA FEST 2027
        </span>
      </div>

      {/* Emblem & Catchphrase */}
      <div className="fade-up-element opacity-0 flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-fest-accent" />
        <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-fest-muted uppercase">
          WHERE YOUTH MEETS MOMENTUM
        </span>
        <Sparkles className="w-3.5 h-3.5 text-fest-accent" />
      </div>

      {/* Monumental Interactive ASTRA Typography */}
      <div className="relative py-1 my-1 w-full max-w-4xl flex items-center justify-center">
        <h1 className="flex items-center justify-center tracking-[-0.04em] leading-none">
          {LETTERS.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el;
              }}
              style={{ opacity: 0 }}
              className="font-display font-black text-[22vw] sm:text-[16vw] md:text-[13rem] text-white astra-letter drop-shadow-[0_0_35px_rgba(0,240,255,0.4)] transition-colors duration-300"
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* Sleek divider accent */}
      <div className="fade-up-element opacity-0 w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-fest-accent to-transparent my-3" />

      {/* Subtitle */}
      <p className="fade-up-element opacity-0 max-w-md sm:max-w-xl text-xs sm:text-sm text-fest-muted font-light leading-relaxed px-3 mb-5">
        South India&apos;s premier collegiate conclave. 15 electric competitive arenas, live amphitheatre
        stages, gaming duels, and collegiate glory across Kerala.
      </p>

      {/* Impact Metric Matrix (1 Day Fest, Cashpool & Colleges Coming Soon) */}
      <div className="fade-up-element opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl mb-6 font-mono">
        <div className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col items-center">
          <span className="text-fest-accent font-black text-base sm:text-lg">15</span>
          <span className="text-fest-muted text-[10px] tracking-widest uppercase">PROGRAMS</span>
        </div>
        <div className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col items-center">
          <span className="text-fest-warm font-black text-xs sm:text-sm tracking-wider uppercase mt-1">COMING SOON</span>
          <span className="text-fest-muted text-[9px] tracking-widest uppercase">PRIZE POOL</span>
        </div>
        <div className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col items-center">
          <span className="text-fest-warm font-black text-xs sm:text-sm tracking-wider uppercase mt-1">COMING SOON</span>
          <span className="text-fest-muted text-[9px] tracking-widest uppercase">COLLEGES</span>
        </div>
        <div className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col items-center">
          <span className="text-fest-accent font-black text-base sm:text-lg">1 DAY</span>
          <span className="text-fest-muted text-[10px] tracking-widest uppercase">MEGA FEST</span>
        </div>
      </div>

      {/* Dual CTA Actions */}
      <div className="fade-up-element opacity-0 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-md">
        <a
          href="#programs"
          className="w-full sm:w-1/2 py-3 px-6 rounded-xl bg-fest-accent text-fest-black font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 shadow-[0_4px_24px_rgba(0,240,255,0.35)] active:scale-95"
        >
          <span>VIEW 15 EVENTS</span>
          <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
        </a>

        <button
          onClick={onOpenRegister}
          className="w-full sm:w-1/2 py-3 px-6 rounded-xl border border-fest-accent/40 bg-fest-accent/10 hover:bg-fest-accent/20 text-fest-warm font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Trophy className="w-3.5 h-3.5 text-fest-accent" />
          <span>REGISTER NOW</span>
        </button>
      </div>
    </section>
  );
}
