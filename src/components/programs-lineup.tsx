"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Tag, Trophy, Calendar, MapPin, AlertCircle, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

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
  },
];

interface ProgramsLineupProps {
  onOpenRegister?: (program: Program) => void;
  targetIndex?: number | null;
}

export function ProgramsLineup({ onOpenRegister, targetIndex }: ProgramsLineupProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const targetFloatRef = useRef(0);
  const currentFloatRef = useRef(0);

  // Touch tracking for mobile swipe
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  const total = allPrograms.length;

  // Jump to specific arena if requested from external prop
  useEffect(() => {
    if (typeof targetIndex === "number" && targetIndex >= 0 && targetIndex < allPrograms.length) {
      goTo(targetIndex);
    }
  }, [targetIndex, total]);

  // Silky 60fps / 120fps physics lerp engine
  useEffect(() => {
    let animId: number;
    const lerpLoop = () => {
      const diff = targetFloatRef.current - currentFloatRef.current;
      // High-performance exponential easing
      if (Math.abs(diff) > 0.0005) {
        currentFloatRef.current += diff * 0.14;
        setDisplayIndex(currentFloatRef.current);
      }
      animId = requestAnimationFrame(lerpLoop);
    };

    animId = requestAnimationFrame(lerpLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smooth scroll sync: When page scrolls naturally, advance through cards
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      // Map scroll progress cleanly
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      const continuousIndex = progress * (total - 1);

      // Only update target if user is not actively swiping
      if (!isDraggingRef.current) {
        targetFloatRef.current = continuousIndex;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [total]);

  // Navigate to target index
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      targetFloatRef.current = clamped;

      const section = sectionRef.current;
      if (section) {
        const top = section.offsetTop;
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable > 0) {
          const targetScroll = top + (clamped / (total - 1 || 1)) * scrollable;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
    },
    [total]
  );

  // Mobile Touch Swipe Handling with instant 1:1 response and velocity snap
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = Date.now();
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = touchStartXRef.current - currentX;
    const diffY = touchStartYRef.current - currentY;

    // If gesture is horizontal:
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Direct drag offset mapped to continuous index space
      const offset = diffX / (window.innerWidth * 0.7);
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const duration = Date.now() - touchStartTimeRef.current;
    const velocity = Math.abs(diffX) / Math.max(1, duration);

    setDragOffset(0);

    const currentBase = Math.round(targetFloatRef.current);

    // If swiped > 30px or flicked quickly with velocity:
    if (Math.abs(diffX) > 30 || velocity > 0.25) {
      if (diffX > 0) {
        goTo(currentBase + 1);
      } else {
        goTo(currentBase - 1);
      }
    } else {
      goTo(currentBase);
    }
  };

  const effectiveFloat = displayIndex + dragOffset;
  const activeInt = Math.max(0, Math.min(total - 1, Math.round(effectiveFloat)));
  const activeProg = allPrograms[activeInt];

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="relative bg-fest-black"
      style={{ height: `${Math.max(180, total * 18)}vh` }}
    >
      {/* 
        STICKY VIEWPORT:
        Stays constant and fixed while user scrolls through the section!
      */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between items-center pt-16 pb-4 px-3 sm:px-6">
        
        {/* ========================================================= */}
        {/* CONSTANT FIXED BACKGROUND (SOLAR GOLD & CELESTIAL AMBER)   */}
        {/* ========================================================= */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Subtle center solar gold & amber atmospheric glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] bg-fest-accent/[0.04] rounded-full blur-[110px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-fest-secondary/[0.03] rounded-full blur-[100px]" />

          {/* SVG Circular Orbital Track indicating the circular wheel */}
          <svg
            viewBox="0 0 1000 600"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1300px] h-full opacity-35"
          >
            <path
              d="M 60 490 Q 500 240 940 490"
              stroke="#F59E0B"
              strokeWidth="1.2"
              strokeDasharray="6 8"
              fill="none"
              className="animate-pulse"
              style={{ animationDuration: "5s" }}
            />
            <path
              d="M 140 510 Q 500 300 860 510"
              stroke="#F97316"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              fill="none"
              opacity="0.3"
            />
            <circle cx="500" cy="240" r="3.5" fill="#F59E0B" className="animate-ping" />
            <circle cx="500" cy="240" r="2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Minimal Event Category Pill on Top */}
        <div className="relative z-20 flex items-center justify-between w-full max-w-[340px] sm:max-w-md px-1 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-fest-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
            <span className="font-bold tracking-widest uppercase">
              ARENA {String(activeInt + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <span className="text-fest-muted uppercase tracking-wider text-[10px]">
            {activeProg.category}
          </span>
        </div>

        {/* ========================================================= */}
        {/* CIRCULAR MOTION CAROUSEL STAGE                            */}
        {/* ========================================================= */}
        <div
          className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full max-w-[340px] sm:max-w-md h-[400px] sm:h-[430px] flex items-center justify-center">
            {allPrograms.map((prog, i) => {
              const delta = i - effectiveFloat;

              // Silky Parametric Circular Motion
              const angleRad = delta * 0.58;
              const translateX = Math.sin(angleRad) * 315;
              const translateY = (1 - Math.cos(angleRad)) * 38;
              const rotateZ = delta * 6;
              const rotateY = delta * -16;
              const scale = Math.max(0.76, 1 - Math.abs(delta) * 0.14);
              const opacity = Math.max(0, 1 - Math.abs(delta) * 0.65);
              const isCenter = Math.abs(delta) < 0.45;
              const zIndex = Math.round(20 - Math.abs(delta) * 3);
              const blur = Math.abs(delta) > 0.4 ? Math.min(3, Math.abs(delta) * 1.5) : 0;

              return (
                <div
                  key={prog.id}
                  onClick={() => {
                    if (!isCenter) goTo(i);
                  }}
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, 0px) rotateZ(${rotateZ}deg) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    filter: blur > 0 ? `blur(${blur}px)` : "none",
                    pointerEvents: Math.abs(delta) < 1.2 ? "auto" : "none",
                  }}
                  className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0E0F17] select-none will-change-transform transition-colors ${
                    isCenter
                      ? "border border-fest-accent/40 shadow-[0_12px_45px_rgba(245,158,11,0.22)]"
                      : "border border-white/[0.08] cursor-pointer hover:border-fest-accent/30"
                  }`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-black text-fest-accent px-2 py-0.5 rounded bg-fest-accent/15 border border-fest-accent/30">
                          #{prog.number}
                        </span>
                        <span className="font-mono text-[9px] text-fest-muted tracking-widest uppercase">
                          {prog.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-fest-accentLight font-bold">
                        <Trophy className="w-3.5 h-3.5 text-fest-accent shrink-0" />
                        <span>{prog.prize}</span>
                      </div>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl text-fest-warm tracking-tight">
                      {prog.name}
                    </h3>
                    <p className="font-mono text-[10px] text-fest-accent font-semibold tracking-wider uppercase mb-1">
                      {prog.subTitle}
                    </p>
                    <p className="text-[11px] sm:text-xs text-fest-muted font-light leading-snug line-clamp-2">
                      {prog.tagline}
                    </p>
                  </div>

                  {/* 2x2 Specs Grid */}
                  <div className="grid grid-cols-2 gap-1.5 my-2 font-mono text-[11px] bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.06]">
                    <div className="flex items-start gap-1.5">
                      <Tag className="w-3 h-3 text-fest-accent shrink-0 mt-0.5" />
                      <div className="leading-snug truncate">
                        <span className="text-fest-muted text-[9px] block">ENTRY STATUS</span>
                        <span className="text-fest-warm font-semibold truncate text-[10px] sm:text-[11px]">
                          {prog.fee}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <Calendar className="w-3 h-3 text-fest-accent shrink-0 mt-0.5" />
                      <div className="leading-snug truncate">
                        <span className="text-fest-muted text-[9px] block">SCHEDULE</span>
                        <span className="text-fest-warm font-semibold truncate text-[10px] sm:text-[11px]">
                          {prog.date}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-start gap-1.5 pt-1 border-t border-white/[0.04]">
                      <MapPin className="w-3 h-3 text-fest-accent shrink-0 mt-0.5" />
                      <div className="leading-snug truncate">
                        <span className="text-fest-muted text-[9px] block">VENUE</span>
                        <span className="text-fest-warm font-medium truncate text-[10px] sm:text-[11px]">
                          {prog.venue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Requirements summary */}
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-fest-muted px-0.5 truncate">
                    <AlertCircle className="w-3 h-3 text-fest-accent shrink-0" />
                    <span className="truncate">{prog.requirements}</span>
                  </div>

                  {/* Card Bottom CTA: Register button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRegister?.(prog);
                    }}
                    className="w-full mt-2.5 py-3 rounded-xl bg-fest-accent text-fest-black font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-fest-accentLight transition-all duration-300 active:scale-95 shadow-[0_4px_18px_rgba(245,158,11,0.35)]"
                  >
                    <span>REGISTER FOR {prog.name.toUpperCase()}</span>
                    <Sparkles className="w-3.5 h-3.5 text-fest-black" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Mobile-First Micro-Navigation Bar (Prev, Dots, Next) */}
        <div className="relative z-20 flex items-center justify-between gap-2 w-full max-w-[340px] sm:max-w-md px-2 py-1.5 rounded-xl bg-[#0E0F17]/90 backdrop-blur-md border border-white/[0.08] shadow-lg">
          <button
            onClick={() => goTo(activeInt - 1)}
            disabled={activeInt === 0}
            className="p-1.5 rounded-lg border border-white/10 text-fest-warm disabled:opacity-25 disabled:pointer-events-none hover:bg-white/5 active:scale-95 transition-all"
            aria-label="Previous Program"
          >
            <ChevronLeft className="w-4 h-4 text-fest-accent" />
          </button>

          {/* 15 Interactive Golden Indicator Dots */}
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
                      ? "w-4 h-1.5 bg-fest-accent shadow-[0_0_8px_rgba(245,158,11,0.8)]"
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
    </section>
  );
}
