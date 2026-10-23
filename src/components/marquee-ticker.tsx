"use client";

import { Sparkles } from "lucide-react";

export function MarqueeTicker() {
  const items = [
    "ASTRA 2K27",
    "DON BOSCO COLLEGE MAMPETTA",
    "15 COMPETITIVE ARENAS",
    "ONE DAY MEGA FEST",
    "CASHPOOL REVEALING SOON",
    "STUDENT COORDINATOR: ANANDU EP (+91 8075480258)",
    "SOUTH INDIA'S YOUTH CONCLAVE",
    "STAGE & RUNWAY • TECH & GAMING • MEDIA & ARTS • MANAGEMENT",
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-fest-accent/25 bg-[#0C0D13] py-2.5 z-20 select-none">
      <div className="flex w-fit whitespace-nowrap marquee-h">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="inline-flex items-center gap-3 mx-4 text-xs font-mono font-bold tracking-[0.2em]">
            <span className="text-fest-warm">{text}</span>
            <span className="text-fest-accent text-sm">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
