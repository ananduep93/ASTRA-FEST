"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Sparkles, Trophy, Calendar, Users, MapPin } from "lucide-react";

interface HeroProps {
  onOpenRegister?: () => void;
  onSelectArena?: (index: number) => void;
}

const LETTERS = ["A", "S", "T", "R", "A"];

export function Hero({ onOpenRegister }: HeroProps) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("animejs").then(({ animate, stagger }) => {
      const validLetters = lettersRef.current.filter(Boolean) as HTMLElement[];

      if (validLetters.length) {
        animate(validLetters, {
          opacity: [0, 1],
          translateY: [35, 0],
          scale: [0.88, 1],
          duration: 900,
          delay: stagger(75, { start: 150 }),
          ease: "outElastic(1, .85)",
        });
      }

      if (containerRef.current) {
        animate(containerRef.current.querySelectorAll(".fade-up-element"), {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 750,
          delay: stagger(90, { start: 400 }),
          ease: "outExpo",
        });
      }
    });
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92svh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-8 sm:py-24 overflow-hidden"
    >
      {/* Golden Aura Background Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-fest-accent/[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Overline Campus & Edition Pill */}
      <div className="fade-up-element opacity-0 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fest-accent/25 bg-fest-accent/10 backdrop-blur-md mb-3">
        <Sparkles className="w-3 h-3 text-fest-accent animate-pulse" />
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-fest-accentLight uppercase font-bold">
          DON BOSCO COLLEGE MAMPETTA PRESENTS
        </span>
      </div>

      {/* Monumental ASTRA Title */}
      <div className="relative py-1 my-1 w-full max-w-4xl flex items-center justify-center">
        <h1 className="flex items-center justify-center tracking-[-0.03em] leading-none select-none">
          {LETTERS.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el;
              }}
              style={{ opacity: 0 }}
              className="font-display font-black text-[22vw] sm:text-[16vw] md:text-[13rem] text-white drop-shadow-[0_0_45px_rgba(245,158,11,0.32)] transition-colors duration-300 hover:text-fest-accentLight"
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* Golden Starlight Subhead */}
      <div className="fade-up-element opacity-0 flex items-center justify-center gap-2.5 my-2">
        <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-fest-accent/50" />
        <span className="font-mono text-xs sm:text-sm tracking-[0.28em] text-fest-accent uppercase font-black">
          INTER-COLLEGE YOUTH CONCLAVE 2027
        </span>
        <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-fest-accent/50" />
      </div>

      {/* Subtitle */}
      <p className="fade-up-element opacity-0 max-w-md sm:max-w-xl text-xs sm:text-sm text-fest-muted font-normal leading-relaxed px-3 mb-6">
        South India&apos;s grand collegiate stage. 15 competitive arenas spanning runway fashion, high-energy dance battles, esports duels, and executive business challenges.
      </p>

      {/* Impact Metric Matrix (1 Day Fest, Cashpool & Colleges Coming Soon) */}
      <div className="fade-up-element opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl mb-6 font-mono text-xs">
        <div className="p-3 rounded-2xl border border-fest-accent/25 bg-gradient-to-b from-fest-accent/[0.08] to-transparent flex flex-col items-center">
          <span className="text-fest-accent font-black text-lg sm:text-xl">15</span>
          <span className="text-fest-muted text-[10px] tracking-widest uppercase font-semibold">ARENAS</span>
        </div>
        <div className="p-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col items-center">
          <span className="text-fest-warm font-black text-xs sm:text-sm tracking-wider uppercase mt-1">COMING SOON</span>
          <span className="text-fest-muted text-[9px] tracking-widest uppercase font-semibold">PRIZE POOL</span>
        </div>
        <div className="p-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col items-center">
          <span className="text-fest-warm font-black text-xs sm:text-sm tracking-wider uppercase mt-1">COMING SOON</span>
          <span className="text-fest-muted text-[9px] tracking-widest uppercase font-semibold">COLLEGES</span>
        </div>
        <div className="p-3 rounded-2xl border border-fest-accent/25 bg-gradient-to-b from-fest-accent/[0.08] to-transparent flex flex-col items-center">
          <span className="text-fest-accent font-black text-lg sm:text-xl">1 DAY</span>
          <span className="text-fest-muted text-[10px] tracking-widest uppercase font-semibold">MEGA FEST</span>
        </div>
      </div>

      {/* Dual CTA Actions */}
      <div className="fade-up-element opacity-0 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-md">
        <a
          href="#programs"
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-fest-accent to-fest-secondary hover:from-fest-accentLight hover:to-fest-accent text-fest-black font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_24px_rgba(245,158,11,0.35)] active:scale-95"
        >
          <span>EXPLORE 15 EVENTS</span>
          <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
        </a>

        <button
          onClick={onOpenRegister}
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl border border-fest-accent/40 bg-fest-accent/10 hover:bg-fest-accent/20 text-fest-warm font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <Trophy className="w-3.5 h-3.5 text-fest-accent" />
          <span>REGISTER NOW</span>
        </button>
      </div>
    </section>
  );
}
