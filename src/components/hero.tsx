"use client";

import Image from "next/image";
import { ArrowDown, Trophy, ArrowUpRight, Sparkles, MessageSquare, Phone } from "lucide-react";

interface HeroProps {
  onOpenRegister?: () => void;
  onSelectArena?: (index: number) => void;
}

export function Hero({ onOpenRegister }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92svh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 sm:py-28 bg-[#080A0E] overflow-hidden"
    >
      {/* College Emblem & Presenter Header (Tathva Signature Pill) */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-3 shadow-sm">
        <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-white/10 p-0.5">
          <Image
            src="/logo.png"
            alt="Don Bosco Logo"
            width={20}
            height={20}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.22em] text-zinc-300 uppercase font-semibold">
          DON BOSCO COLLEGE MAMPETTA PRESENTS
        </span>
      </div>

      {/* Monumental Bebas / Syne Headline Inspired by Tathva */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-center select-none my-1">
        <h1 className="font-bebas text-[28vw] sm:text-[22vw] md:text-[14.5rem] tracking-tight leading-[0.82] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          ASTRA
        </h1>
        <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
          <span className="px-3 py-1 rounded bg-fest-accent text-black font-mono font-black text-xs sm:text-sm tracking-widest uppercase">
            EDITION 2K27
          </span>
          <span className="text-white/20 font-mono">•</span>
          <span className="font-mono text-xs sm:text-sm text-zinc-400 tracking-[0.25em] uppercase font-bold">
            ONE DAY YOUTH CONCLAVE
          </span>
        </div>
      </div>

      {/* Clean Structural Accent Rule */}
      <div className="w-20 sm:w-28 h-[2px] bg-fest-accent my-4" />

      {/* Subtitle Description */}
      <p className="max-w-md sm:max-w-xl text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed px-4 mb-7">
        South India&apos;s grand collegiate stage. 15 competitive arenas spanning runway fashion, high-energy dance battles, esports duels, and executive business challenges.
      </p>

      {/* Tathva-Style 4-Item Metric Matrix (Single Theme, High Contrast) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl mb-8 font-mono text-xs">
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col items-center">
          <span className="font-bebas text-3xl sm:text-4xl text-fest-accent leading-none">15</span>
          <span className="text-zinc-400 text-[10px] tracking-widest uppercase font-semibold mt-1">ARENAS</span>
        </div>
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center">
          <span className="text-white font-black text-xs sm:text-sm tracking-wider uppercase">COMING SOON</span>
          <span className="text-zinc-500 text-[9px] tracking-widest uppercase font-semibold mt-0.5">PRIZE POOL</span>
        </div>
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center">
          <span className="text-white font-black text-xs sm:text-sm tracking-wider uppercase">COMING SOON</span>
          <span className="text-zinc-500 text-[9px] tracking-widest uppercase font-semibold mt-0.5">COLLEGES</span>
        </div>
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col items-center">
          <span className="font-bebas text-3xl sm:text-4xl text-fest-accent leading-none">1 DAY</span>
          <span className="text-zinc-400 text-[10px] tracking-widest uppercase font-semibold mt-1">MEGA FEST</span>
        </div>
      </div>

      {/* Dual High-Impact Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-md">
        <a
          href="#programs"
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-fest-accent/25"
        >
          <span>EXPLORE 15 EVENTS</span>
          <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
        </a>

        <button
          onClick={onOpenRegister}
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl border border-white/20 hover:border-fest-accent hover:text-fest-accent bg-white/[0.04] text-white font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Trophy className="w-3.5 h-3.5 text-fest-accent" />
          <span>REGISTER NOW</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Direct Student Coordinator Hotline */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-400">
        <span>Festival Hotline:</span>
        <a
          href="https://wa.me/918075480258?text=Hi%20Anandu,%20I%20have%20an%20inquiry%20regarding%20ASTRA%202027"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fest-accent font-semibold hover:underline inline-flex items-center gap-1"
        >
          <span>Anandu EP (+91 8075480258)</span>
        </a>
      </div>
    </section>
  );
}
