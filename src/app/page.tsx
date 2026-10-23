"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  Trophy,
  Users,
  Compass,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Flame,
  Radio,
} from "lucide-react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Countdown } from "@/components/countdown";
import { Astra3DArtwork } from "@/components/astra-3d-artwork";
import { MarqueeTicker } from "@/components/marquee-ticker";
import { ProgramsLineup, Program, allPrograms } from "@/components/programs-lineup";
import { Coordinators } from "@/components/coordinators";
import { Footer } from "@/components/footer";
import { RegistrationModal } from "@/components/registration-modal";
import { FEST_CONFIG } from "@/config/fest.config";
import { MOCK_ANNOUNCEMENTS, MOCK_FAQS } from "@/data/events.mock";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedArena, setSelectedArena] = useState<Program | null>(null);
  const [targetArenaIndex, setTargetArenaIndex] = useState<number | null>(null);

  const handleOpenRegister = (program?: Program) => {
    setSelectedArena(program || allPrograms[0]);
    setIsRegisterOpen(true);
  };

  const handleSelectArena = (index: number) => {
    setTargetArenaIndex(index);
    const el = document.getElementById("programs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-[#080A0E] text-fest-warm flex flex-col selection:bg-fest-accent selection:text-black overflow-x-clip"
    >
      {/* Silky 120fps smooth scroll engine for mobile & desktop */}
      <SmoothScroll />

      {/* Slim, accessible top navigation */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Hero section: Tathva-inspired monumental typography & HUD */}
      <Hero
        onOpenRegister={() => handleOpenRegister()}
        onSelectArena={handleSelectArena}
      />

      {/* COUNTDOWN & KEY FESTIVAL METRICS STRIP */}
      <section className="relative z-20 py-8 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Live Countdown Timer */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                COUNTDOWN TO CONCLAVE
              </span>
              <span className="font-bebas text-2xl text-fest-warm tracking-wider">
                FEB 20, 2027 // 09:00 AM
              </span>
            </div>
            <Countdown />
          </div>

          {/* Right: Festival Metrics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 font-mono text-center divide-x divide-white/10">
            <div className="px-3">
              <span className="font-bebas text-3xl sm:text-4xl text-fest-accent block leading-none">
                15
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 block">
                ARENAS
              </span>
            </div>

            <div className="px-3">
              <span className="font-bebas text-3xl sm:text-4xl text-fest-warm block leading-none">
                ₹50K+
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 block">
                PRIZE POOL
              </span>
            </div>

            <div className="px-3">
              <span className="font-bebas text-3xl sm:text-4xl text-fest-warm block leading-none">
                50+
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 block">
                COLLEGES
              </span>
            </div>

            <div className="px-3">
              <span className="font-bebas text-3xl sm:text-4xl text-fest-accent block leading-none">
                1 DAY
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 block">
                CONCLAVE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Electric Orange Festival Marquee Ticker */}
      <MarqueeTicker />

      {/* 4 NUMBERED PILLARS (Tathva Architecture) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <span className="text-xs font-mono text-fest-accent uppercase tracking-widest block mb-1">
              THE 4 COMPETITIVE REALITIES
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-fest-warm uppercase leading-none">
              CHOOSE YOUR <span className="text-fest-accent">BATTLEGROUND</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-mono text-fest-accent hover:underline uppercase tracking-wider"
          >
            <span>VIEW ALL 15 ARENA RULES</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/events"
            className="group p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-fest-accent/40 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="font-mono text-xs font-black text-fest-accent block mb-2">
                01 // STAGE &amp; RUNWAY
              </span>
              <h3 className="font-bebas text-3xl text-fest-warm group-hover:text-fest-accent transition-colors">
                CHOREO &amp; FASHION
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                Designer ramp walks, high-voltage dance showdowns, and acoustic musical battles.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 group-hover:text-fest-warm">
              <span>EXPLORE EVENTS</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/events"
            className="group p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-fest-accent/40 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="font-mono text-xs font-black text-fest-accent block mb-2">
                02 // TECH &amp; GAMING
              </span>
              <h3 className="font-bebas text-3xl text-fest-warm group-hover:text-fest-accent transition-colors">
                CODESPRINT &amp; ESPORTS
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                Competitive algorithmic coding, web design sprint, BGMI lobbies, and eFootball arenas.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 group-hover:text-fest-warm">
              <span>EXPLORE EVENTS</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/events"
            className="group p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-fest-accent/40 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="font-mono text-xs font-black text-fest-accent block mb-2">
                03 // MEDIA &amp; ARTS
              </span>
              <h3 className="font-bebas text-3xl text-fest-warm group-hover:text-fest-accent transition-colors">
                LENS &amp; DESIGN
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                Spot campus photography, creative short videography, graphic identity, and poster art.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 group-hover:text-fest-warm">
              <span>EXPLORE EVENTS</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/events"
            className="group p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-fest-accent/40 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="font-mono text-xs font-black text-fest-accent block mb-2">
                04 // MANAGEMENT
              </span>
              <h3 className="font-bebas text-3xl text-fest-warm group-hover:text-fest-accent transition-colors">
                STRATEGY &amp; HUNT
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                The flagship Best Management Team conclave, corporate marketing pitch, and campus Scavenger Hunt.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 group-hover:text-fest-warm">
              <span>EXPLORE EVENTS</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 
        15 Programs Lineup with SILKY SMOOTH CIRCULAR MOTION scroll effect:
        Background stays completely constant while programs curve across screen
      */}
      <ProgramsLineup
        onOpenRegister={handleOpenRegister}
        targetIndex={targetArenaIndex}
      />

      {/* 3D STAR SCULPTURE & FESTIVAL IDENTITY HIGHLIGHT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-[#0A0A0A] to-[#080A0E]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-md bg-fest-accent/10 border border-fest-accent/25 text-fest-accent text-[11px] font-mono font-bold tracking-widest uppercase">
              INTERACTIVE 3D ARTIFACT
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-fest-warm uppercase leading-tight">
              THE CELESTIAL STAR OF <span className="text-fest-accent">ASTRA</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-lg">
              Interact with the kinetic 3D star polyhedron sculpture. Powered by lightweight canvas math with hardware-aware battery protection and instant image fallback for low-power smartphones.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href="/register"
                className="px-5 py-3 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-[0_2px_16px_rgba(255,77,0,0.35)] active:scale-95"
              >
                SECURE YOUR PASS
              </Link>
              <Link
                href="/status"
                className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-fest-warm text-xs font-mono uppercase tracking-wider transition-colors"
              >
                CHECK PASS STATUS
              </Link>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center p-6 rounded-3xl bg-white/[0.02] border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.8)]">
            <Astra3DArtwork size={260} />
          </div>
        </div>
      </section>

      {/* DISPATCHES & FREQUENTLY ASKED QUESTIONS PREVIEW */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Latest Announcements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-bebas text-2xl sm:text-3xl text-fest-warm">
                LATEST DISPATCHES
              </span>
              <span className="text-[10px] font-mono text-fest-accent uppercase">
                OFFICIAL BULLETIN
              </span>
            </div>
            <div className="space-y-3">
              {MOCK_ANNOUNCEMENTS.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-fest-accent text-black uppercase mb-1">
                      {a.badge}
                    </span>
                    <h4 className="text-xs font-mono font-semibold text-fest-warm">
                      {a.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                    {a.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-bebas text-2xl sm:text-3xl text-fest-warm">
                COMMON QUESTIONS
              </span>
              <Link
                href="/about"
                className="text-[10px] font-mono text-fest-accent hover:underline uppercase"
              >
                VIEW ALL FAQS →
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_FAQS.slice(0, 3).map((faq) => (
                <div
                  key={faq.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5"
                >
                  <p className="font-mono text-xs font-bold text-fest-warm">
                    {faq.question}
                  </p>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Festival Leadership, Department & Committee Coordinators */}
      <Coordinators />

      {/* Streamlined dark footer with Anandu EP hotline & venue */}
      <Footer />

      {/* Interactive In-App Multi-Program Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        arena={selectedArena}
      />
    </main>
  );
}
