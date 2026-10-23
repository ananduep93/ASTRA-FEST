"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Radio } from "lucide-react";
import { FEST_CONFIG } from "@/config/fest.config";

interface CountdownProps {
  forceLive?: boolean;
}

export function Countdown({ forceLive = false }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: forceLive,
  });

  useEffect(() => {
    if (forceLive) return;

    const target = new Date(FEST_CONFIG.festDate).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [forceLive]);

  if (timeLeft.isLive) {
    return (
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-red-600/15 border border-red-500/40 text-white font-mono text-xs shadow-[0_0_25px_rgba(239,68,68,0.3)] animate-pulse">
        <Radio className="w-4 h-4 text-red-500 shrink-0" />
        <span className="font-bold tracking-widest text-red-400">ASTRA 2K27 IS LIVE NOW!</span>
        <Link
          href="/schedule"
          className="ml-2 px-2.5 py-0.5 rounded bg-red-600 text-white font-black text-[10px] tracking-wider uppercase hover:bg-red-500 transition-colors"
        >
          VIEW STAGES →
        </Link>
      </div>
    );
  }

  return (
    <div
      aria-label="Festival countdown timer"
      className="inline-flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-center shadow-lg"
    >
      <div className="flex flex-col items-center px-2 sm:px-3">
        <span className="font-bebas text-2xl sm:text-3xl text-fest-accent leading-none">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">
          DAYS
        </span>
      </div>

      <span className="text-zinc-600 font-bold mb-3">:</span>

      <div className="flex flex-col items-center px-2 sm:px-3">
        <span className="font-bebas text-2xl sm:text-3xl text-fest-warm leading-none">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">
          HRS
        </span>
      </div>

      <span className="text-zinc-600 font-bold mb-3">:</span>

      <div className="flex flex-col items-center px-2 sm:px-3">
        <span className="font-bebas text-2xl sm:text-3xl text-fest-warm leading-none">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">
          MIN
        </span>
      </div>

      <span className="text-zinc-600 font-bold mb-3">:</span>

      <div className="flex flex-col items-center px-2 sm:px-3">
        <span className="font-bebas text-2xl sm:text-3xl text-fest-accent leading-none">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">
          SEC
        </span>
      </div>
    </div>
  );
}
