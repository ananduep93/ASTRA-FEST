"use client";

import { motion } from "framer-motion";
import { Terminal, Music, Briefcase, Gamepad2, Lock, Clock } from "lucide-react";

const realms = [
  {
    code: "REALM-01",
    name: "SYNAPSE",
    category: "Technical & Computational Sciences",
    description:
      "Algorithmic challenges, autonomous robotics, 36-hour hackathon, and deep-tech architectural sprint.",
    icon: Terminal,
    status: "PROSPECTUS UNDER SEAL",
  },
  {
    code: "REALM-02",
    name: "KINESIS",
    category: "Performing & Expressive Arts",
    description:
      "Electric band collisions, theatrical monologues, street battle dances, and cinematic direction.",
    icon: Music,
    status: "PROSPECTUS UNDER SEAL",
  },
  {
    code: "REALM-03",
    name: "STRATAGEM",
    category: "Corporate, Venture & Diplomacy",
    description:
      "Crisis simulation, venture capitalist pitch battles, mock parliament, and market arbitrage.",
    icon: Briefcase,
    status: "PROSPECTUS UNDER SEAL",
  },
  {
    code: "REALM-04",
    name: "NEXUS",
    category: "Esports & Cyber Arenas",
    description:
      "Multi-title tactical esports championships, sim racing leagues, and high-intensity digital arenas.",
    icon: Gamepad2,
    status: "PROSPECTUS UNDER SEAL",
  },
];

export function ProgramsPlaceholder() {
  return (
    <section
      id="programs"
      className="relative py-28 sm:py-36 px-6 sm:px-10 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Background Section Accent Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Header & Narrative */}
      <div className="relative z-10 max-w-3xl mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-gold uppercase mb-4">
          <span>// 01</span>
          <span>CURATED REALMS</span>
          <span className="text-white/20">•</span>
          <span className="text-stellar-400">UPCOMING PROGRAMS</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          The Competitive Arenas of ASTRA.
        </h2>

        <p className="text-sm sm:text-base text-stellar-400 font-light leading-relaxed">
          Each realm represents a proving ground for visiting college delegations.
          Specific event rulebooks, judge panels, prize matrixes, and slot allocations
          are currently being finalized by the organizing council.
        </p>
      </div>

      {/* The 4 Realm Placeholders Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {realms.map((realm, idx) => {
          const Icon = realm.icon;
          return (
            <motion.div
              key={realm.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-sm border border-white/[0.08] bg-void-900/60 p-7 sm:p-8 hover:border-gold/30 hover:bg-void-800/40 transition-all duration-500"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-white/20 select-none">
                +
              </div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-white/20 select-none">
                +
              </div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/20 select-none">
                +
              </div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/20 select-none">
                +
              </div>

              {/* Realm Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded border border-white/10 bg-white/[0.02] text-stellar-300 group-hover:border-gold/40 group-hover:text-gold transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs tracking-widest text-stellar-400">
                    {realm.code}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/[0.06] bg-white/[0.02] text-[10px] font-mono text-stellar-500">
                  <Lock className="w-3 h-3 text-gold/70" />
                  <span>LOCKED</span>
                </div>
              </div>

              {/* Realm Name & Details */}
              <div className="space-y-2 mb-6">
                <h3 className="font-display text-2xl font-bold tracking-wide text-white group-hover:text-stellar-50 transition-colors">
                  {realm.name}
                </h3>
                <p className="text-xs font-mono tracking-wider uppercase text-gold/90">
                  {realm.category}
                </p>
                <p className="text-sm text-stellar-400 font-light leading-relaxed pt-2">
                  {realm.description}
                </p>
              </div>

              {/* Placeholder Status Strip */}
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.06] text-xs font-mono">
                <span className="flex items-center gap-2 text-stellar-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-stellar-500" />
                  UNROLLING SPRING 2026
                </span>
                <span className="text-gold/80 text-[11px] tracking-wider uppercase">
                  {realm.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Institutional Notice Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 mt-12 sm:mt-16 rounded border border-white/[0.08] bg-white/[0.01] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <p className="text-xs font-mono tracking-widest text-gold uppercase">
            // COLLEGE CONTINGENT ADVISORY
          </p>
          <p className="text-sm text-stellar-300 font-light leading-relaxed">
            College student councils, technical societies, and cultural clubs seeking early
            contingent registration guidelines may bookmark this space. The official brochure and program
            schedule will be unveiled here.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded border border-white/10 bg-white/[0.03] text-xs font-mono text-stellar-300 tracking-wider">
            STATUS // PRE-RELEASE FOUNDATION
          </div>
        </div>
      </motion.div>
    </section>
  );
}
