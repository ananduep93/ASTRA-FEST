"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Sparkles, Trophy, Flame, Calendar, MapPin, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StarSculpture } from "./star-sculpture";

interface HeroProps {
  onOpenRegister?: () => void;
  onSelectArena?: (index: number) => void;
}

const SCRIPTS = [
  { text: "ASTRA", lang: "EN", script: "ENGLISH" },
  { text: "അസ്ത്ര", lang: "ML", script: "MALAYALAM" },
  { text: "अस्त्रा", lang: "HI", script: "HINDI" },
  { text: "அஸ்ட்ரா", lang: "TA", script: "TAMIL" },
];

export function Hero({ onOpenRegister }: HeroProps) {
  const [scriptIndex, setScriptIndex] = useState(0);

  // Multilingual dissolve animation matching astrafest.live
  useEffect(() => {
    const timer = setInterval(() => {
      setScriptIndex((prev) => (prev + 1) % SCRIPTS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const currentScript = SCRIPTS[scriptIndex];

  return (
    <section
      id="hero"
      className="relative min-h-[92svh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-10 sm:py-24 overflow-hidden"
    >
      {/* Background Electric Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-fest-accent/[0.06] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[420px] h-[220px] sm:h-[420px] bg-fest-secondary/[0.04] rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Campus & Presenter Pill */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-fest-accent/30 bg-fest-accent/[0.08] backdrop-blur-md mb-2 shadow-[0_0_15px_rgba(255,85,0,0.15)]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-fest-warm uppercase font-bold">
          DON BOSCO COLLEGE MAMPETTA PRESENTS
        </span>
      </motion.div>

      {/* 3D Kinetic Star Sculpture Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        className="relative my-0.5 z-10"
      >
        <StarSculpture />
      </motion.div>

      {/* Monumental Headline with Multilingual Dissolve */}
      <div className="relative py-1 my-0.5 w-full max-w-4xl flex flex-col items-center justify-center">
        <div className="h-28 sm:h-36 md:h-44 flex items-center justify-center overflow-visible">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentScript.text}
              initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 1.04, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-[22vw] sm:text-[17vw] md:text-[11.5rem] tracking-[-0.04em] leading-none text-fest-warm select-none drop-shadow-[0_0_45px_rgba(255,85,0,0.35)]"
            >
              {currentScript.text}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Script & Edition Meta Tag */}
        <div className="flex items-center gap-2 mt-1 font-mono text-[10px] sm:text-xs">
          <span className="text-fest-accent font-black tracking-widest uppercase">
            EDITION 2K27
          </span>
          <span className="text-white/30">•</span>
          <span className="text-fest-muted uppercase tracking-widest text-[9px] sm:text-[10px]">
            {currentScript.script} SCRIPT
          </span>
        </div>
      </div>

      {/* Electric Orange Subhead Rule */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex items-center justify-center gap-2.5 my-2.5 w-full max-w-md"
      >
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-fest-accent/60 to-fest-accent" />
        <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-fest-accent uppercase font-black px-2">
          INTER-COLLEGE CONCLAVE
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-fest-accent/60 to-fest-accent" />
      </motion.div>

      {/* Subtitle Description */}
      <p className="max-w-md sm:max-w-xl text-xs sm:text-sm text-fest-muted font-normal leading-relaxed px-3 mb-5">
        South India&apos;s grand collegiate stage. 15 competitive arenas spanning runway fashion, high-energy dance battles, esports duels, and executive business challenges.
      </p>

      {/* Impact Metric Matrix (1 Day Mega Fest, Cashpool & Colleges Coming Soon) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl mb-6 font-mono text-xs">
        <div className="p-3 rounded-2xl border border-fest-accent/30 bg-fest-accent/[0.08] backdrop-blur-sm flex flex-col items-center">
          <span className="text-fest-accent font-black text-xl sm:text-2xl">15</span>
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
        <div className="p-3 rounded-2xl border border-fest-accent/30 bg-fest-accent/[0.08] backdrop-blur-sm flex flex-col items-center">
          <span className="text-fest-accent font-black text-xl sm:text-2xl">1 DAY</span>
          <span className="text-fest-muted text-[10px] tracking-widest uppercase font-semibold">MEGA FEST</span>
        </div>
      </div>

      {/* Dual CTA Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-md">
        <a
          href="#programs"
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-fest-black font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_24px_rgba(255,85,0,0.4)] active:scale-95"
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

      {/* Student Coordinator Quick Contact */}
      <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-mono text-fest-muted">
        <span>Student Coordinator:</span>
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
