"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Trophy, Compass, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenRegister?: () => void;
  onSelectArena?: (index: number) => void;
}

export function Hero({ onOpenRegister }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll progress across the 260vh runway (Tathva Signature Architecture)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for silky 120fps motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Multi-plane parallax transformations modeled after tathva.org
  const titleScale = useTransform(smoothProgress, [0, 0.5, 0.9], [1, 1.35, 1.8]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.45, 0.75], [1, 0.85, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.8], [0, -120]);

  // Floating Celestial Core (Drifts and scales in 3D space)
  const coreY = useTransform(smoothProgress, [0, 1], [0, -220]);
  const coreScale = useTransform(smoothProgress, [0, 0.7], [1, 1.4]);
  const coreRotate = useTransform(smoothProgress, [0, 1], [0, 45]);
  const coreOpacity = useTransform(smoothProgress, [0, 0.6, 0.9], [1, 0.9, 0]);

  // Energy comet tail sweep
  const cometX = useTransform(smoothProgress, [0, 0.8], [-80, 140]);
  const cometOpacity = useTransform(smoothProgress, [0, 0.4, 0.8], [0.4, 0.8, 0]);

  // HUD and coordinate rotations
  const compassRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const hudOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  // Scroll hint text
  const hintOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  const scrollToArenas = () => {
    const el = document.getElementById("programs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full bg-[#080A0E] text-white select-none"
      style={{ height: "240vh" }} // Tathva cinematic scroll runway
    >
      {/* 
        STICKY 100VH CINEMATIC VIEWPORT:
        Pins to screen while user scrolls through the cinematic runway!
      */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8">
        
        {/* ========================================================= */}
        {/* TOP HUD BAR: LOGO, IDENTITY & TATHVA-STYLE GPS COORDINATES */}
        {/* ========================================================= */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="relative z-30 w-full flex items-start justify-between font-mono text-[10px] sm:text-xs pt-12 sm:pt-4"
        >
          {/* Top Left: Fest Identity & Campus Pill */}
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
              <span className="tracking-[0.2em] text-zinc-300 uppercase font-semibold">
                DON BOSCO COLLEGE MAMPETTA
              </span>
            </div>
            <span className="text-zinc-500 text-[9px] tracking-widest pl-1 uppercase hidden sm:block">
              ASTRA 2K27 // NATIONAL YOUTH CONCLAVE
            </span>
          </div>

          {/* Top Right: Rotating Coordinates Compass Ring (Tathva Signature) */}
          <div className="flex items-center gap-2.5 text-right">
            <div className="flex flex-col items-end leading-tight text-zinc-400">
              <span className="text-fest-accent font-bold tracking-widest">11.2588° N</span>
              <span className="tracking-widest">75.7804° E</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">KOZHIKODE, KL</span>
            </div>

            {/* Rotating Mechanical Compass Ring */}
            <motion.div
              style={{ rotate: compassRotate }}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-fest-accent/40 flex items-center justify-center p-1 bg-fest-accent/[0.05]"
            >
              <div className="w-full h-full rounded-full border border-dashed border-white/30 flex items-center justify-center">
                <Compass className="w-3.5 h-3.5 text-fest-accent" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* CENTER CINEMATIC SCENE: FLOATING CELESTIAL CORE & ASTEROID */}
        {/* ========================================================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
          {/* Deep Space Ambient Glow */}
          <div className="absolute w-[360px] sm:w-[700px] h-[360px] sm:h-[700px] rounded-full bg-fest-accent/[0.07] blur-[150px]" />

          {/* Glowing Energy Comet & Plasma Tail Sweep */}
          <motion.div
            style={{ x: cometX, opacity: cometOpacity }}
            className="absolute w-[500px] sm:w-[900px] h-[2px] bg-gradient-to-r from-transparent via-fest-accent to-fest-secondary rotate-[-18deg] blur-[1px]"
          />

          {/* Floating Celestial Core (Drifting & Scaling with Scroll) */}
          <motion.div
            style={{
              y: coreY,
              scale: coreScale,
              rotate: coreRotate,
              opacity: coreOpacity,
            }}
            className="relative w-44 h-44 sm:w-72 sm:h-72 flex items-center justify-center"
          >
            {/* Outer Orbit Rings */}
            <div className="absolute inset-0 rounded-full border border-fest-accent/20 animate-spin" style={{ animationDuration: "35s" }} />
            <div className="absolute inset-4 rounded-full border border-dashed border-white/15 animate-spin" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
            
            {/* Inner Glowing Star Emblem */}
            <div className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-fest-accent/20 via-black to-fest-secondary/20 border border-fest-accent/50 p-4 shadow-[0_0_60px_rgba(255,85,0,0.35)] backdrop-blur-sm flex items-center justify-center rotate-45">
              <div className="relative -rotate-45 w-16 h-16 sm:w-24 sm:h-24">
                <Image
                  src="/logo.png"
                  alt="ASTRA Emblem"
                  fill
                  priority
                  className="object-contain filter drop-shadow-[0_0_20px_rgba(255,85,0,0.8)]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* CENTER MONUMENTAL TITLE: BEBAS NEUE TATHVA SCALE          */}
        {/* ========================================================= */}
        <motion.div
          style={{
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity,
          }}
          className="relative z-20 flex flex-col items-center justify-center text-center my-auto w-full max-w-5xl"
        >
          {/* Pre-title Thematic Statement (Tathva Signature) */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3 font-mono text-[10px] sm:text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent" />
            <span className="tracking-[0.28em] uppercase font-bold text-fest-accent">
              15 COMPETITIVE REALITIES. ONE STAGE.
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent" />
          </div>

          {/* Monumental Headline */}
          <h1 className="font-bebas text-[28vw] sm:text-[23vw] md:text-[15.5rem] tracking-tight leading-[0.80] text-white drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            ASTRA
          </h1>

          {/* Edition & Subhead Lockup */}
          <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-3 font-mono">
            <span className="px-3 py-1 rounded bg-fest-accent text-black font-black text-xs sm:text-sm tracking-widest uppercase">
              EDITION 2K27
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs sm:text-sm text-zinc-300 tracking-[0.25em] uppercase font-bold">
              ONE DAY MEGA FEST
            </span>
          </div>

          <p className="max-w-md sm:max-w-xl text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed px-4 mt-4">
            South India&apos;s grand collegiate stage. 15 competitive arenas spanning runway fashion, high-energy dance battles, esports duels, and executive business challenges.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* BOTTOM HUD CONTROLS: TATHVA KEYCAP BUTTON & STATS         */}
        {/* ========================================================= */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="relative z-30 w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs pb-2"
        >
          {/* Bottom Left: Tathva-Style Mechanical Keycap Enter Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={scrollToArenas}
              className="group py-3 px-5 rounded-xl border border-fest-accent/50 bg-fest-accent/10 hover:bg-fest-accent hover:text-black text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 shadow-[0_0_20px_rgba(255,85,0,0.2)] active:scale-95"
            >
              <span className="text-fest-accent group-hover:text-black transition-colors font-mono font-black">[</span>
              <span>ENTER 15 ARENAS</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform stroke-[3]" />
              <span className="text-fest-accent group-hover:text-black transition-colors font-mono font-black">]</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="py-3 px-5 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black font-mono font-black text-xs uppercase tracking-widest flex items-center gap-1.5 transition-all shadow-[0_4px_20px_rgba(255,85,0,0.35)] active:scale-95"
            >
              <span>REGISTER</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          {/* Bottom Center: Scroll Instruction Hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="hidden md:flex items-center gap-2 text-zinc-500 text-[10px] tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-pulse" />
            <span>SCROLL TO TRAVERSE THE ARENAS</span>
          </motion.div>

          {/* Bottom Right: Event Pillar Quick Ticker */}
          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span className="text-fest-accent font-bold">15 ARENAS</span>
            <span className="text-white/20">•</span>
            <span>1 DAY FEST</span>
            <span className="text-white/20">•</span>
            <a
              href="https://wa.me/918075480258?text=Hi%20Anandu,%20I%20have%20an%20inquiry%20regarding%20ASTRA%202027"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fest-accent hover:underline flex items-center gap-1"
            >
              <span>HOTLINE: 8075480258</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
