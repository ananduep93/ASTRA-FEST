"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Calendar,
  MapPin,
  AlertCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  Maximize2
} from "lucide-react";

export interface Program {
  id: string;
  number: string;
  name: string;
  subTitle: string;
  tagline: string;
  category: "Stage & Runway" | "Media & Arts" | "Tech & Gaming" | "Management";
  fee: string;
  prize: string;
  date: string;
  time: string;
  venue: string;
  requirements: string;
  badge: string;
  image: string;
}

export const allPrograms: Program[] = [
  {
    id: "scavenger-hunt",
    number: "01",
    name: "Scavenger Hunt",
    subTitle: "CAMPUS QUEST & MYSTERY",
    tagline: "Decode cryptic campus riddles, uncover physical clues, and race against time across the college grounds.",
    category: "Management",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Morning Slot",
    venue: "Main Campus Grounds",
    requirements: "Teams of 3 to 4. Physical navigation + riddle solving.",
    badge: "CAMPUS HUNT",
    image: "/images/cards/scavng.jpeg",
  },
  {
    id: "corporate-walk",
    number: "02",
    name: "Corporate Walk",
    subTitle: "EXECUTIVE GRACE & RUNWAY",
    tagline: "Showcase boardroom poise, corporate styling, executive articulation, and high-fashion business runway walk.",
    category: "Stage & Runway",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Afternoon Spotlight",
    venue: "Auditorium Main Stage",
    requirements: "Formal corporate attire. Introduction & ramp walk.",
    badge: "RUNWAY BATTLE",
    image: "/images/cards/coprtwalk.jpeg",
  },
  {
    id: "photography",
    number: "03",
    name: "Photography",
    subTitle: "SPOT DOCUMENTARY & STORY",
    tagline: "Spot theme photojournalism capturing raw emotion, motion, candid festival momentum, and visual storytelling.",
    category: "Media & Arts",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Full Day Shoot",
    venue: "Don Bosco Campus & Mampetta",
    requirements: "DSLR / Mirrorless required. Original RAW files mandatory.",
    badge: "SPOT CONTEST",
    image: "/images/cards/photography.jpeg",
  },
  {
    id: "rj-hunt",
    number: "04",
    name: "RJ Hunt",
    subTitle: "VOICE OF THE CONCLAVE",
    tagline: "Live radio jockeying showdown testing voice modulation, spontaneity, quick wit, and crowd engagement.",
    category: "Media & Arts",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Mid-Day Jam",
    venue: "Acoustic Courtyard",
    requirements: "Individual participant. 3+1 mins live on-air simulation.",
    badge: "MIC BATTLE",
    image: "/images/cards/RJhunt.jpeg",
  },
  {
    id: "esports",
    number: "05",
    name: "E-Sports",
    subTitle: "BGMI & E-FOOTBALL ARENA",
    tagline: "Competitive collegiate gaming battleground featuring intense squad drops in BGMI and 1v1 E-Football duels.",
    category: "Tech & Gaming",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Continuous Tournament",
    venue: "Gaming Hub, Block B",
    requirements: "Own mobile devices required. Official game clients.",
    badge: "ESPORTS ARENA",
    image: "/images/cards/ESP.jpeg",
  },
  {
    id: "fashion-show-group",
    number: "06",
    name: "Fashion Show (Group)",
    subTitle: "THEMED RUNWAY SPECTACLE",
    tagline: "A grand ensemble of haute couture, themed aesthetics, synchronized choreography, and statement fashion.",
    category: "Stage & Runway",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Evening Prime Stage",
    venue: "Main Open Amphitheatre",
    requirements: "8 to 14 models per crew. 10 mins stage time with theme track.",
    badge: "FLAGSHIP RUNWAY",
    image: "/images/cards/fashnshow.jpeg",
  },
  {
    id: "theme-dance",
    number: "07",
    name: "Theme Dance",
    subTitle: "CHOREO CLASH & NARRATIVE",
    tagline: "High-octane collegiate dance crews executing synchronized choreography rooted in a powerful visual theme.",
    category: "Stage & Runway",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Evening Mainstage",
    venue: "Main Open Amphitheatre",
    requirements: "6 to 12 dancers. 8+2 mins time limit. Original concepts.",
    badge: "STAGE SHOWDOWN",
    image: "/images/cards/THEMEDANCE.jpeg",
  },
  {
    id: "face-painting",
    number: "08",
    name: "Face Painting",
    subTitle: "LIVING CANVAS ARTISTRY",
    tagline: "Transform human faces into vivid storytelling canvases with brushwork, gradients, and thematic symbolism.",
    category: "Media & Arts",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Morning Session",
    venue: "Fine Arts Studio",
    requirements: "Pair of 2 (Artist + Model). Non-toxic skin colors only.",
    badge: "ARTISTRY BATTLE",
    image: "/images/cards/facepainting.jpeg",
  },
  {
    id: "fashion-show-single",
    number: "09",
    name: "Fashion Show (Single)",
    subTitle: "SOLO COUTURE RUNWAY",
    tagline: "Individual style, stage charisma, presence, and avant-garde couture under the solo amphitheatre spotlight.",
    category: "Stage & Runway",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Late Afternoon",
    venue: "Main Amphitheatre Ramp",
    requirements: "Solo entrant. Ramp walk + judges Q&A round.",
    badge: "SOLO RUNWAY",
    image: "/images/cards/fshnshow.jpeg",
  },
  {
    id: "best-manager",
    number: "10",
    name: "Best Manager",
    subTitle: "STRESS, STRATEGY & CRISIS",
    tagline: "The ultimate leadership decathlon testing crisis management, boardroom defense, negotiation, and grit.",
    category: "Management",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Multi-Round Event",
    venue: "Management Seminar Hall",
    requirements: "Individual event. Multiple eliminator rounds.",
    badge: "MANAGEMENT ELITE",
    image: "/images/cards/bestmanager.jpeg",
  },
  {
    id: "logo-design",
    number: "11",
    name: "Logo Design",
    subTitle: "BRAND IDENTITY SPRINT",
    tagline: "Craft distinct, memorable visual marks and brand emblems adhering to vector balance and conceptual depth.",
    category: "Media & Arts",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Morning Sprint",
    venue: "Digital Design Lab",
    requirements: "Solo participation. Digital vector submissions on spot prompt.",
    badge: "DESIGN SPRINT",
    image: "/images/cards/LOGODESIGN.jpeg",
  },
  {
    id: "coding-competition",
    number: "12",
    name: "Coding Competition",
    subTitle: "ALGO SPEED SPRINT & BUG DUEL",
    tagline: "High-intensity algorithmic problem solving, rapid debugging, and competitive data structure challenges.",
    category: "Tech & Gaming",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Morning Tech Sprint",
    venue: "Central Computing Lab B2",
    requirements: "Solo or Duo. Languages: Python, C++, Java. Auto judge.",
    badge: "CODE BATTLE",
    image: "/images/cards/codingcomp.jpeg",
  },
  {
    id: "business-quiz",
    number: "13",
    name: "Business Quiz",
    subTitle: "CORPORATE TRIVIA & ACUMEN",
    tagline: "A cerebral battle of corporate history, brand logos, market acquisitions, finance, and global tycoons.",
    category: "Management",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Mid-Day Buzzer Round",
    venue: "Audio-Visual Hall",
    requirements: "Teams of 2. Written prelims followed by live buzzer stage.",
    badge: "QUIZ ARENA",
    image: "/images/cards/bussquiz.jpeg",
  },
  {
    id: "reel-making",
    number: "14",
    name: "Reel Making",
    subTitle: "SPOT VIRAL SHORT-FORM",
    tagline: "Direct, shoot, and edit high-impact 60-second festival reels showcasing viral transitions and narrative beats.",
    category: "Media & Arts",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Spot Shoot & Edit",
    venue: "Campus Wide",
    requirements: "Original footage recorded on festival day. 9:16 aspect ratio.",
    badge: "VIRAL REEL",
    image: "/images/cards/REELMAKING.jpeg",
  },
  {
    id: "mini-militia",
    number: "15",
    name: "Mini Militia",
    subTitle: "TACTICAL DOODLE COMBAT",
    tagline: "Fast-paced LAN tactical combat duel with flying boots, plasma rifles, and intense squad firefights.",
    category: "Tech & Gaming",
    fee: "Registration Coming Soon",
    prize: "Revealing Soon",
    date: "One Day Mega Fest",
    time: "Afternoon Bracket",
    venue: "LAN Gaming Arena",
    requirements: "Custom room squad battles. Standard unhacked versions.",
    badge: "LAN DUEL",
    image: "/images/cards/mini.jpeg",
  },
];

interface ProgramsLineupProps {
  onOpenRegister?: (program: Program) => void;
  targetIndex?: number | null;
}

export function ProgramsLineup({ onOpenRegister, targetIndex }: ProgramsLineupProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeInt, setActiveInt] = useState(0);
  const [inspectProgram, setInspectProgram] = useState<Program | null>(null);

  // References for ultra-responsive 120fps hardware loop
  const targetIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartIndexRef = useRef(0);

  const total = allPrograms.length;

  // Preload all 15 poster images into memory on mount
  useEffect(() => {
    allPrograms.forEach((p) => {
      const img = new window.Image();
      img.src = p.image;
    });
  }, []);

  // Jump to specific arena if requested from external prop
  useEffect(() => {
    if (typeof targetIndex === "number" && targetIndex >= 0 && targetIndex < allPrograms.length) {
      goTo(targetIndex);
    }
  }, [targetIndex]);

  // Navigate smoothly to target card index
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      const section = sectionRef.current;
      if (section) {
        const sectionTop = section.offsetTop;
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable > 0) {
          const targetScroll = sectionTop + (clamped / (total - 1 || 1)) * scrollable;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
      targetIndexRef.current = clamped;
    },
    [total]
  );

  // =========================================================================
  // ZERO-LATENCY DIRECT DOM ANIMATION ENGINE (120 FPS GUARANTEED)
  // Bypasses React state overhead on every frame for buttery liquid physics!
  // =========================================================================
  useEffect(() => {
    let animId: number;
    let lastRoundedIndex = -1;

    const renderLoop = () => {
      // 1. Sync from window scroll if not dragging directly
      if (!isDraggingRef.current && sectionRef.current) {
        const section = sectionRef.current;
        const sectionTop = section.offsetTop;
        const scrollable = section.offsetHeight - window.innerHeight;

        if (scrollable > 0) {
          const currentScroll = window.scrollY - sectionTop;
          const rawProgress = Math.max(0, Math.min(1, currentScroll / scrollable));
          targetIndexRef.current = rawProgress * (total - 1);
        }
      }

      // 2. High-precision exponential lerp damping (0.18 response rate)
      const diff = targetIndexRef.current - currentIndexRef.current;
      if (Math.abs(diff) > 0.0002) {
        currentIndexRef.current += diff * 0.18;
      } else {
        currentIndexRef.current = targetIndexRef.current;
      }

      const cur = currentIndexRef.current;
      const rounded = Math.max(0, Math.min(total - 1, Math.round(cur)));
      if (rounded !== lastRoundedIndex) {
        lastRoundedIndex = rounded;
        setActiveInt(rounded);
      }

      // 3. Direct DOM GPU Transform Application to Cards (Bypasses React VDOM)
      const radius = 320;
      for (let i = 0; i < total; i++) {
        const el = cardElementsRef.current[i];
        if (!el) continue;

        const delta = i - cur;

        // Culling
        if (Math.abs(delta) > 2.8) {
          el.style.display = "none";
          continue;
        }

        el.style.display = "flex";
        const angleRad = delta * 0.54;
        const translateX = Math.sin(angleRad) * radius;
        const translateZ = (Math.cos(angleRad) - 1) * 260;
        const translateY = Math.abs(delta) * 12;
        const rotateY = -angleRad * 54;
        const scale = Math.max(0.72, 1 - Math.abs(delta) * 0.13);
        const opacity = Math.max(0, 1 - Math.abs(delta) * 0.42);
        const zIndex = Math.round(30 - Math.abs(delta) * 8);

        el.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(zIndex);
        el.style.pointerEvents = Math.abs(delta) < 1.1 ? "auto" : "none";
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [total]);

  // Direct Horizontal Touch Gesture Handler (Buttery Lateral Drag)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartIndexRef.current = targetIndexRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const diffX = dragStartXRef.current - e.touches[0].clientX;
    // Map horizontal pixel drag to card shift (150px per card swipe)
    const cardShift = diffX / 160;
    const newTarget = Math.max(0, Math.min(total - 1, dragStartIndexRef.current + cardShift));
    targetIndexRef.current = newTarget;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Snap cleanly to the nearest card on finger release
    const nearest = Math.round(targetIndexRef.current);
    goTo(nearest);
  };

  const activeProg = allPrograms[activeInt] || allPrograms[0];

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="relative bg-fest-black"
      style={{ height: `${Math.max(180, total * 18)}vh` }}
    >
      {/* 
        STICKY VIEWPORT:
        Stays constant and fixed while user scrolls through the 15 arenas!
      */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between items-center pt-16 pb-3 px-3 sm:px-6">
        
        {/* Clean Static Dark Background (Single Unified Theme, Zero Distractions) */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[#080A0E]" />

        {/* Top Arena Counter & Tathva-Style 4 Event Pillars */}
        <div className="relative z-20 flex flex-col gap-2 w-full max-w-[340px] sm:max-w-md px-1 font-mono text-[11px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-fest-accent">
              <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
              <span className="font-black tracking-widest uppercase">
                ARENA {String(activeInt + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
              {activeProg.category}
            </span>
          </div>

          {/* Tathva-Style 4 Pillar Shortcuts */}
          <div className="grid grid-cols-4 gap-1.5 pt-0.5">
            {[
              { num: "01", name: "STAGE", idx: 1 },
              { num: "02", name: "TECH", idx: 4 },
              { num: "03", name: "MEDIA", idx: 2 },
              { num: "04", name: "MGMT", idx: 0 },
            ].map((p) => {
              const isPillarActive =
                (p.name === "STAGE" && activeProg.category === "Stage & Runway") ||
                (p.name === "TECH" && activeProg.category === "Tech & Gaming") ||
                (p.name === "MEDIA" && activeProg.category === "Media & Arts") ||
                (p.name === "MGMT" && activeProg.category === "Management");

              return (
                <button
                  key={p.num}
                  onClick={() => goTo(p.idx)}
                  className={`py-1 px-1 rounded-lg border text-center transition-all ${
                    isPillarActive
                      ? "border-fest-accent bg-fest-accent/15 text-fest-accent font-black shadow-sm"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/25 hover:text-white"
                  }`}
                >
                  <span className="block text-[8px] opacity-60 font-semibold">{p.num}</span>
                  <span className="block text-[10px] tracking-wider uppercase font-bold">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* TRUE 3D CYLINDRICAL ORBIT STAGE (IMAGE POSTER SHOWCASE)    */}
        {/* ========================================================= */}
        <div
          className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden touch-pan-y perspective-1000"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] h-[390px] sm:h-[440px] flex items-center justify-center preserve-3d">
            {allPrograms.map((prog, i) => {
              const isCenter = i === activeInt;

              return (
                <div
                  key={prog.id}
                  ref={(el) => {
                    cardElementsRef.current[i] = el;
                  }}
                  onClick={() => {
                    if (isCenter) {
                      setInspectProgram(prog);
                    } else {
                      goTo(i);
                    }
                  }}
                  className={`group absolute inset-0 rounded-2xl overflow-hidden cursor-pointer select-none will-change-transform backface-hidden transition-shadow duration-300 ${
                    isCenter
                      ? "ring-2 ring-fest-accent shadow-[0_20px_50px_rgba(255,85,0,0.35)]"
                      : "ring-1 ring-white/10 hover:ring-fest-accent/40"
                  }`}
                >
                  {/* High-Resolution Event Poster Background Image */}
                  <div className="absolute inset-0 bg-[#0E0F14]">
                    <Image
                      src={prog.image}
                      alt={prog.name}
                      fill
                      priority={i < 4}
                      sizes="(max-width: 640px) 300px, 340px"
                      className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Artistic Vignette & Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
                    <div className="absolute inset-0 bg-fest-accent/[0.04] mix-blend-overlay" />
                  </div>

                  {/* Card Top Glass Bar: Arena Number & Badge */}
                  <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] sm:text-[11px] font-black text-white px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/15">
                        #{prog.number}
                      </span>
                      <span className="font-mono text-[9px] text-white/90 tracking-widest uppercase font-bold px-2 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/10">
                        {prog.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-mono text-fest-accent font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-fest-accent/30">
                      <Trophy className="w-3 h-3 text-fest-accent shrink-0" />
                      <span>{prog.prize}</span>
                    </div>
                  </div>

                  {/* Card Bottom Glass Strip: Title, Subhead, and Tap CTA */}
                  <div className="relative z-10 mt-auto p-3.5 sm:p-4.5 bg-gradient-to-t from-black via-black/85 to-transparent backdrop-blur-[2px]">
                    <div className="flex items-baseline justify-between gap-1 mb-0.5">
                      <h3 className="font-display font-black text-lg sm:text-2xl text-fest-warm tracking-tight leading-tight group-hover:text-fest-accent transition-colors">
                        {prog.name}
                      </h3>
                      <Maximize2 className="w-4 h-4 text-fest-accent shrink-0 opacity-80 group-hover:scale-110 transition-transform" />
                    </div>

                    <p className="font-mono text-[9px] sm:text-[10px] text-fest-accent tracking-wider uppercase font-semibold mb-2">
                      {prog.subTitle}
                    </p>

                    {/* Quick Action Button on Poster */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectProgram(prog);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-fest-black font-display font-black text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-[0_2px_14px_rgba(255,85,0,0.4)]"
                    >
                      <span>VIEW EVENT DETAILS</span>
                      <ArrowRight className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Mobile-First Micro-Navigation Bar (Prev, Dots, Next) */}
        <div className="relative z-20 flex items-center justify-between gap-2 w-full max-w-[340px] sm:max-w-md px-2 py-1.5 rounded-xl bg-[#0E0F16]/90 backdrop-blur-md border border-white/[0.08] shadow-lg">
          <button
            onClick={() => goTo(activeInt - 1)}
            disabled={activeInt === 0}
            className="p-1.5 rounded-lg border border-white/10 text-fest-warm disabled:opacity-25 disabled:pointer-events-none hover:bg-white/5 active:scale-95 transition-all"
            aria-label="Previous Program"
          >
            <ChevronLeft className="w-4 h-4 text-fest-accent" />
          </button>

          {/* 15 Interactive Indicator Dots */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 px-1">
            {allPrograms.map((_, dotIdx) => {
              const isActive = dotIdx === activeInt;
              return (
                <button
                  key={dotIdx}
                  onClick={() => goTo(dotIdx)}
                  aria-label={`Jump to program ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-4 h-1.5 bg-fest-accent shadow-[0_0_8px_rgba(255,85,0,0.8)]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={() => goTo(activeInt + 1)}
            disabled={activeInt === total - 1}
            className="p-1.5 rounded-lg border border-white/10 text-fest-warm disabled:opacity-25 disabled:pointer-events-none hover:bg-white/5 active:scale-95 transition-all"
            aria-label="Next Program"
          >
            <ChevronRight className="w-4 h-4 text-fest-accent" />
          </button>
        </div>

      </div>

      {/* =================================================================== */}
      {/* ANIMATED PROGRAM DETAILS POP VIEW (POPS ON IMAGE CLICK WITH TEXT ANIMS) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {inspectProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 340 }}
              className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0B0E14] border border-fest-accent/40 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(255,85,0,0.25)] p-4 sm:p-6 text-fest-warm select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectProgram(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 border border-white/15 text-fest-warm hover:text-fest-accent hover:border-fest-accent/50 active:scale-90 transition-all"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Event Poster Header Preview */}
              <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-4 border border-white/10">
                <Image
                  src={inspectProgram.image}
                  alt={inspectProgram.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E15] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="font-mono text-xs font-black text-white px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20">
                    ARENA #{inspectProgram.number}
                  </span>
                  <span className="font-mono text-[10px] text-fest-accent font-bold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-fest-accent/30 uppercase">
                    {inspectProgram.category}
                  </span>
                </div>
              </div>

              {/* Animated Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-fest-warm tracking-tight">
                    {inspectProgram.name}
                  </h2>
                  <span className="font-mono text-xs text-fest-accent font-bold">
                    {inspectProgram.prize}
                  </span>
                </div>

                <p className="font-mono text-xs text-fest-accent tracking-wider uppercase font-semibold mb-3">
                  {inspectProgram.subTitle}
                </p>

                <p className="text-xs sm:text-sm text-fest-muted font-normal leading-relaxed mb-4">
                  {inspectProgram.tagline}
                </p>

                {/* 2x2 Specs Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-4 font-mono text-xs">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-fest-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-fest-muted block">SCHEDULE</span>
                      <span className="font-bold text-fest-warm text-[11px] sm:text-xs">
                        {inspectProgram.date} ({inspectProgram.time})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-fest-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-fest-muted block">VENUE</span>
                      <span className="font-bold text-fest-warm text-[11px] sm:text-xs">
                        {inspectProgram.venue}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-white/[0.06] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-fest-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-fest-muted block">SPECIFICATIONS &amp; RULES</span>
                      <span className="text-[11px] text-fest-muted font-sans font-medium">
                        {inspectProgram.requirements}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={() => {
                      const prog = inspectProgram;
                      setInspectProgram(null);
                      onOpenRegister?.(prog);
                    }}
                    className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-fest-black font-display font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_4px_20px_rgba(255,85,0,0.4)]"
                  >
                    <Sparkles className="w-4 h-4 text-fest-black" />
                    <span>REGISTER FOR {inspectProgram.name.toUpperCase()}</span>
                  </button>

                  <a
                    href={`https://wa.me/918075480258?text=Hi%20Anandu,%20I%20have%20questions%20about%20${encodeURIComponent(inspectProgram.name)}%20at%20ASTRA%202027`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-fest-accent/40 bg-fest-accent/10 hover:bg-fest-accent/20 text-fest-warm font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 text-fest-accent" />
                    <span>ASK ANANDU</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
