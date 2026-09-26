"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, MapPin, Tag, AlertCircle } from "lucide-react";

interface Program {
  id: string;
  number: string;
  name: string;
  tagline: string;
  fee: string;
  date: string;
  time: string;
  venue: string;
  requirements: string;
  badge: string;
  artType: "dance" | "music" | "photography" | "coding";
}

const programs: Program[] = [
  {
    id: "dance",
    number: "01",
    name: "DANCE",
    tagline: "Synchronized collegiate choreography battle & street freestyle",
    fee: "₹800 Per Team (₹300 Solo)",
    date: "Day 01 • Mainstage Evening",
    time: "05:00 PM – 09:00 PM",
    venue: "Main Open Amphitheatre, Don Bosco College",
    requirements: "6 to 12 crew members. 8+2 mins time limit. Soundtracks submitted 1h prior.",
    badge: "TEAM & SOLO",
    artType: "dance",
  },
  {
    id: "music",
    number: "02",
    name: "MUSIC",
    tagline: "Battle of collegiate bands, acoustic sets & vocal showdown",
    fee: "₹1,000 Per Band (₹250 Solo)",
    date: "Day 02 • Sunset Jam",
    time: "04:30 PM – 08:30 PM",
    venue: "Auditorium Main Arena, Don Bosco College",
    requirements: "Drum kit provided. 15 mins total stage time. Original tracks & covers allowed.",
    badge: "LIVE STAGE",
    artType: "music",
  },
  {
    id: "photography",
    number: "03",
    name: "PHOTOGRAPHY",
    tagline: "Spot theme photojournalism & visual documentary story",
    fee: "₹250 Per Entrant",
    date: "Day 01 & 02 • Festival Grounds",
    time: "10:00 AM – 04:00 PM",
    venue: "Campus Grounds & Mampetta Surroundings",
    requirements: "DSLR / Mirrorless required. Original RAW files mandatory. No generative AI.",
    badge: "SPOT CONTEST",
    artType: "photography",
  },
  {
    id: "coding",
    number: "04",
    name: "CODING",
    tagline: "High-intensity algorithmic sprint, debugging & speed hackathon",
    fee: "₹400 Per Duo (₹250 Solo)",
    date: "Day 02 • Morning Sprint",
    time: "10:30 AM – 02:30 PM",
    venue: "Central Computing Labs (Block B), Don Bosco",
    requirements: "Languages: Python, C++, Java, Rust. Competitive scoring on automated judge.",
    badge: "TECH SPRINT",
    artType: "coding",
  },
];

// Custom Vector Artwork Renderers
function ProgramArtwork({ type }: { type: Program["artType"] }) {
  if (type === "dance") {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/60 rounded-xl sm:rounded-2xl border border-fest-border p-4 sm:p-6">
        <svg viewBox="0 0 400 240" className="w-full h-full max-h-48 sm:max-h-56">
          <circle cx="200" cy="120" r="85" stroke="#FF3D00" strokeWidth="1.5" strokeDasharray="6 4" fill="none" className="animate-spin" style={{ animationDuration: "25s" }} />
          <circle cx="200" cy="120" r="50" stroke="#F5F2EB" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M 40 120 Q 120 40, 200 120 T 360 120" stroke="#FF3D00" strokeWidth="2.5" fill="none" />
          <path d="M 40 120 Q 120 200, 200 120 T 360 120" stroke="#F5F2EB" strokeWidth="1.5" opacity="0.8" fill="none" />
          <path d="M 100 120 Q 160 80, 200 120 T 300 120" stroke="#FF3D00" strokeWidth="1" opacity="0.5" fill="none" />
          <text x="200" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontFamily="monospace" fontWeight="bold" letterSpacing="5">
            RHYTHM // BATTLE
          </text>
        </svg>
      </div>
    );
  }

  if (type === "music") {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/60 rounded-xl sm:rounded-2xl border border-fest-border p-4 sm:p-6">
        <svg viewBox="0 0 400 240" className="w-full h-full max-h-48 sm:max-h-56">
          {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380].map((x, i) => {
            const h = 40 + ((i * 37) % 110);
            return (
              <line
                key={i}
                x1={x}
                y1={120 - h / 2}
                x2={x}
                y2={120 + h / 2}
                stroke={i % 3 === 0 ? "#FF3D00" : "#F5F2EB"}
                strokeWidth="4"
                strokeLinecap="round"
                opacity={i % 3 === 0 ? 1 : 0.4}
              />
            );
          })}
          <circle cx="200" cy="120" r="30" fill="#060607" stroke="#FF3D00" strokeWidth="2" />
          <circle cx="200" cy="120" r="8" fill="#F5F2EB" />
          <text x="200" y="215" textAnchor="middle" fill="#FF3D00" fontSize="12" fontFamily="monospace" letterSpacing="4">
            AMPLIFIED FREQ • 128 BPM
          </text>
        </svg>
      </div>
    );
  }

  if (type === "photography") {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/60 rounded-xl sm:rounded-2xl border border-fest-border p-4 sm:p-6">
        <svg viewBox="0 0 400 240" className="w-full h-full max-h-48 sm:max-h-56">
          <rect x="70" y="30" width="260" height="180" rx="8" stroke="#F5F2EB" strokeWidth="1.5" opacity="0.3" fill="none" />
          <circle cx="200" cy="120" r="65" stroke="#FF3D00" strokeWidth="2" fill="none" />
          <circle cx="200" cy="120" r="35" stroke="#F5F2EB" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          <line x1="180" y1="120" x2="220" y2="120" stroke="#FF3D00" strokeWidth="2" />
          <line x1="200" y1="100" x2="200" y2="140" stroke="#FF3D00" strokeWidth="2" />
          <text x="85" y="55" fill="#FF3D00" fontSize="11" fontFamily="monospace" letterSpacing="2">
            RAW • ISO 400 • F/1.8
          </text>
          <text x="200" y="225" textAnchor="middle" fill="#F5F2EB" fontSize="11" fontFamily="monospace" opacity="0.7">
            DOCUMENTARY FOCUS
          </text>
        </svg>
      </div>
    );
  }

  // Coding
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/60 rounded-xl sm:rounded-2xl border border-fest-border p-4 sm:p-6 font-mono">
      <svg viewBox="0 0 400 240" className="w-full h-full max-h-48 sm:max-h-56">
        <text x="30" y="45" fill="#FF3D00" fontSize="13" fontFamily="monospace" fontWeight="bold">
          fn main() {"{"}
        </text>
        <text x="60" y="75" fill="#F5F2EB" fontSize="12" fontFamily="monospace" opacity="0.8">
          let mut arena = Astra::init(2027);
        </text>
        <text x="60" y="105" fill="#F5F2EB" fontSize="12" fontFamily="monospace" opacity="0.8">
          arena.deploy_challenge("ALGO_SPRINT");
        </text>
        <text x="60" y="135" fill="#FF3D00" fontSize="12" fontFamily="monospace">
          loop {"{"} duel.solve(time.now())? {"}"}
        </text>
        <text x="30" y="165" fill="#FF3D00" fontSize="13" fontFamily="monospace" fontWeight="bold">
          {"}"}
        </text>
        <rect x="250" y="130" width="8" height="15" fill="#FF3D00" className="animate-pulse" />
        <text x="200" y="215" textAnchor="middle" fill="#F5F2EB" fontSize="10" opacity="0.6" letterSpacing="2">
          1200 SECONDS REMAINING
        </text>
      </svg>
    </div>
  );
}

// Typing Text Effect Helper
function TypewriterText({ text, speed = 14 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayed(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-1.5 h-3.5 bg-fest-accent ml-0.5 animate-pulse align-middle" />
    </span>
  );
}

// Shared Program Detail Panel Content
function ProgramDetailsCard({ program }: { program: Program }) {
  return (
    <div className="flex flex-col space-y-5">
      {/* Top Pop-up Artwork Frame */}
      <div className="h-44 sm:h-52 w-full">
        <ProgramArtwork type={program.artType} />
      </div>

      {/* Program Name & Category */}
      <div className="border-b border-fest-border pb-3.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-fest-accent mb-1">
          <span>ARENA SPECIFICATION // {program.number}</span>
          <span className="px-2 py-0.5 rounded bg-fest-accent/15 text-fest-accent text-[9px] sm:text-[10px] font-bold">
            {program.badge}
          </span>
        </div>
        <h4 className="font-display font-black text-2xl sm:text-3xl text-fest-warm">
          {program.name}
        </h4>
      </div>

      {/* Typed Out Information Details */}
      <div className="space-y-3 font-mono text-[11px] sm:text-xs text-fest-muted">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <Tag className="w-3.5 h-3.5 text-fest-accent shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-fest-warm font-semibold">ENTRY FEE: </span>
            <span className="text-fest-warm">
              <TypewriterText text={program.fee} speed={15} />
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 sm:gap-3">
          <Calendar className="w-3.5 h-3.5 text-fest-accent shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-fest-warm font-semibold">SCHEDULE: </span>
            <span className="text-fest-warm">
              <TypewriterText text={`${program.date} (${program.time})`} speed={12} />
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 sm:gap-3">
          <MapPin className="w-3.5 h-3.5 text-fest-accent shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-fest-warm font-semibold">VENUE: </span>
            <span className="text-fest-warm">
              <TypewriterText text={program.venue} speed={10} />
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 sm:gap-3">
          <AlertCircle className="w-3.5 h-3.5 text-fest-accent shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="text-fest-warm font-semibold">RULES: </span>
            <span className="text-fest-muted">
              <TypewriterText text={program.requirements} speed={8} />
            </span>
          </div>
        </div>
      </div>

      {/* Action Button: REGISTER */}
      <div className="pt-2">
        <button
          type="button"
          className="w-full py-3.5 sm:py-4 rounded-xl bg-fest-accent text-fest-black font-display font-black text-xs sm:text-sm tracking-widest uppercase hover:bg-fest-warm hover:shadow-[0_0_30px_rgba(245,242,235,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
        >
          <span>REGISTER FOR {program.name}</span>
          <ArrowUpRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export function ProgramsLineup() {
  const [activeId, setActiveId] = useState<string>("dance");
  const activeProgram = programs.find((p) => p.id === activeId) || programs[0];

  return (
    <section
      id="programs"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto border-t border-fest-border bg-fest-black text-fest-warm"
    >
      {/* Section Sub-header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
        <div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-fest-accent uppercase mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
            <span>01 // OFFICIAL FESTIVAL LINEUP</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-fest-warm">
            COMPETITIVE ARENAS
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-fest-muted font-light leading-relaxed">
          Select or hover each discipline to explore its arena specifications, venue timings, fee,
          and participation criteria.
        </p>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Interactive Festival Lineup Rows (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-4">
          {programs.map((program) => {
            const isActive = program.id === activeId;
            return (
              <div key={program.id} className="flex flex-col">
                {/* Lineup row button */}
                <motion.div
                  onMouseEnter={() => setActiveId(program.id)}
                  onClick={() => setActiveId(program.id)}
                  animate={{
                    scale: isActive ? 1.01 : 1,
                    x: isActive ? (typeof window !== "undefined" && window.innerWidth < 1024 ? 0 : 6) : 0,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`group relative p-4 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-fest-surface border-fest-accent shadow-[0_8px_30px_rgba(255,61,0,0.14)]"
                      : "bg-fest-dark/50 border-fest-border hover:border-fest-warm/30 hover:opacity-85"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-baseline space-x-3 sm:space-x-5">
                      <span className="font-mono text-xs sm:text-base tracking-widest text-fest-accent font-bold">
                        {program.number}
                      </span>
                      <span className="text-white/20 select-none">—</span>
                      <h3 className="font-display font-black text-xl sm:text-3xl md:text-5xl tracking-tight text-fest-warm group-hover:text-fest-accent transition-colors">
                        {program.name}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="hidden xs:inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest uppercase border border-white/10 text-fest-muted">
                        {program.badge}
                      </span>
                      <div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-fest-accent text-fest-black rotate-45"
                            : "bg-white/5 text-fest-muted group-hover:text-fest-warm"
                        }`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* Condensed Tagline visible in row */}
                  <p className="mt-2 sm:mt-2.5 text-[11px] sm:text-xs md:text-sm text-fest-muted font-light pl-6 sm:pl-10">
                    {program.tagline}
                  </p>
                </motion.div>

                {/* Mobile Inline Expansion (Visible only on < lg screens) */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3 mb-2 rounded-2xl border border-fest-accent/40 bg-fest-surface p-4 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
                      >
                        <ProgramDetailsCard program={program} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Desktop Sticky Pop-up Artwork & Detailed Dossier (Visible on >= lg screens) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-24 xl:top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProgram.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-fest-border bg-fest-surface p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              <ProgramDetailsCard program={activeProgram} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
