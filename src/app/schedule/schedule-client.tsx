"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Filter,
  SlidersHorizontal,
  Flame,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { api } from "@/lib/api";
import { ScheduleItem, Program } from "@/types";
import { FEST_CONFIG } from "@/config/fest.config";

const TIME_PRESETS = [
  { label: "Live System Clock", value: "LIVE" },
  { label: "09:30 AM (Inauguration)", value: "09:30" },
  { label: "11:00 AM (Scavenger & E-Sports)", value: "11:00" },
  { label: "02:00 PM (Battle of Bands & Coding)", value: "14:00" },
  { label: "04:30 PM (Fashion Ramp Walk)", value: "16:30" },
  { label: "06:00 PM (Grand Valedictory)", value: "18:00" },
];

export function ScheduleClient() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [selectedPresetTime, setSelectedPresetTime] = useState<string>("11:00"); // default to 11:00 AM so visitors see happening events immediately!

  useEffect(() => {
    let mounted = true;
    Promise.all([api.getSchedule(), api.getPrograms()]).then(
      ([schedData, progData]) => {
        if (mounted) {
          setSchedule(schedData);
          setPrograms(progData);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  // Determine current active simulation time
  const currentSimulatedTime = useMemo(() => {
    if (selectedPresetTime === "LIVE") {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      return `${hrs}:${mins}`;
    }
    return selectedPresetTime;
  }, [selectedPresetTime]);

  // Extract unique stages
  const stages = useMemo(() => {
    const list = Array.from(new Set(schedule.map((s) => s.stageName)));
    return ["All", ...list];
  }, [schedule]);

  // Helper to compare "HH:mm" strings
  const timeToMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + (m || 0);
  };

  const currentMinutes = useMemo(
    () => timeToMinutes(currentSimulatedTime),
    [currentSimulatedTime]
  );

  // Group and sort schedule items
  const filteredSchedule = useMemo(() => {
    let list = [...schedule];
    if (selectedStage !== "All") {
      list = list.filter((s) => s.stageName === selectedStage);
    }
    return list.sort(
      (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
    );
  }, [schedule, selectedStage]);

  const getItemStatus = (item: ScheduleItem) => {
    const startMin = timeToMinutes(item.startTime);
    const endMin = timeToMinutes(item.endTime);

    if (currentMinutes >= startMin && currentMinutes <= endMin) {
      return "HAPPENING_NOW";
    }
    if (currentMinutes < startMin) {
      return "UPCOMING";
    }
    return "COMPLETED";
  };

  const programSlugMap = useMemo(() => {
    const map: Record<string, string> = {};
    programs.forEach((p) => {
      map[p.id] = p.slug;
    });
    return map;
  }, [programs]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-fest-warm selection:bg-fest-accent selection:text-black flex flex-col">
      <SmoothScroll />
      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* HUD Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-fest-accent transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-fest-accent font-bold">STAGE TIMELINE</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
            <span>FEST TIME SIMULATOR</span>
          </div>
        </div>

        {/* Hero Header */}
        <section className="pt-8 pb-8">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-md bg-fest-accent/10 border border-fest-accent/25 text-fest-accent text-[11px] font-mono font-bold tracking-widest uppercase mb-3">
              FEB 20, 2027 • ONE DAY POWERHOUSE
            </span>
            <h1 className="font-bebas text-5xl sm:text-7xl tracking-tight text-fest-warm uppercase leading-[0.9]">
              FESTIVAL <span className="text-fest-accent">SCHEDULE</span>
            </h1>
            <p className="mt-3 text-zinc-400 text-xs sm:text-sm font-sans">
              Follow real-time stages, competitions, and runway presentations across Don Bosco College Mampetta campus. Use the simulator toggle below to preview fest day hours.
            </p>
          </div>
        </section>

        {/* MOCK TIME TOGGLE HUD CONTROLLER */}
        <section className="mb-8 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-fest-accent/20 border border-fest-accent/40 flex items-center justify-center text-fest-accent">
                <Clock className="w-4 h-4 animate-spin-slow" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-fest-warm flex items-center gap-2">
                  <span>TIME SIMULATOR:</span>
                  <span className="text-fest-accent font-black text-sm">
                    {currentSimulatedTime} HRS
                  </span>
                </span>
                <p className="text-[10px] text-zinc-500 font-mono">
                  Switch presets to test &quot;Happening Now&quot; and &quot;Up Next&quot; stage states.
                </p>
              </div>
            </div>

            {/* Presets Horizontal Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {TIME_PRESETS.map((p) => {
                const isActive = selectedPresetTime === p.value;
                return (
                  <button
                    key={p.value}
                    onClick={() => setSelectedPresetTime(p.value)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-mono text-[11px] transition-all ${
                      isActive
                        ? "bg-fest-accent text-black font-bold shadow-[0_2px_12px_rgba(255,77,0,0.3)]"
                        : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-fest-warm border border-white/5"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stage Filter Buttons */}
        <section className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-zinc-500 font-mono text-xs uppercase mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>VENUE:</span>
          </span>
          {stages.map((stg) => {
            const isSelected = selectedStage === stg;
            return (
              <button
                key={stg}
                onClick={() => setSelectedStage(stg)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-colors ${
                  isSelected
                    ? "bg-white/20 text-fest-warm font-bold border border-white/30"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-fest-warm border border-white/5"
                }`}
              >
                {stg}
              </button>
            );
          })}
        </section>

        {/* Timeline Items */}
        <section className="space-y-4 relative">
          {/* Subtle vertical center guideline on tablet/desktop */}
          <div className="hidden sm:block absolute left-28 top-4 bottom-4 w-px bg-white/10" />

          {filteredSchedule.map((item, idx) => {
            const status = getItemStatus(item);
            const isHappeningNow = status === "HAPPENING_NOW";
            const isCompleted = status === "COMPLETED";
            const slug = programSlugMap[item.programId] || "";

            return (
              <div
                key={item.id}
                className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isHappeningNow
                    ? "bg-fest-accent/[0.08] border-fest-accent shadow-[0_8px_32px_rgba(255,77,0,0.2)]"
                    : isCompleted
                    ? "bg-white/[0.01] border-white/5 opacity-60"
                    : "bg-white/[0.03] hover:bg-white/[0.05] border-white/10"
                }`}
              >
                {/* Time & Stage Slot Left */}
                <div className="flex sm:flex-col items-baseline sm:items-start justify-between sm:justify-start gap-1 sm:w-44 shrink-0 font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm sm:text-base font-black tracking-wide ${
                        isHappeningNow
                          ? "text-fest-accent"
                          : isCompleted
                          ? "text-zinc-500 line-through"
                          : "text-fest-warm"
                      }`}
                    >
                      {item.displayTime}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-fest-accent shrink-0" />
                    <span className="truncate">{item.stageName}</span>
                  </span>
                </div>

                {/* Event Name & Category Center */}
                <div className="flex-1 space-y-1 sm:border-l sm:border-white/10 sm:pl-6">
                  <div className="flex items-center gap-2">
                    {isHappeningNow && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-fest-accent text-black animate-pulse">
                        <Flame className="w-3 h-3" />
                        HAPPENING NOW
                      </span>
                    )}
                    {status === "UPCOMING" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-zinc-300">
                        SCHEDULED
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-800 text-zinc-500">
                        <CheckCircle className="w-3 h-3" />
                        CONCLUDED
                      </span>
                    )}
                    <span className="text-[10px] font-mono uppercase text-zinc-500">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-bebas text-2xl sm:text-3xl tracking-wide text-fest-warm group-hover:text-fest-accent transition-colors">
                    {item.programName}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans">
                    Venue: {item.venue}
                  </p>
                </div>

                {/* Right Action Link */}
                {slug && (
                  <div className="shrink-0 pt-2 sm:pt-0">
                    <Link
                      href={`/events/${slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 group-hover:border-fest-accent/40 border border-white/10 text-fest-warm text-xs font-mono tracking-wider transition-all"
                    >
                      <span>DETAILS &amp; RULES</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-fest-accent" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
