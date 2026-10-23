"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Users,
  Trophy,
  Clock,
  MapPin,
  ArrowUpRight,
  Sparkles,
  AlertCircle,
  X,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { api } from "@/lib/api";
import { Program, EventCategory, SeatStatus } from "@/types";
import { FEST_CONFIG } from "@/config/fest.config";

const CATEGORIES: { label: string; value: string }[] = [
  { label: "All Arenas", value: "All" },
  { label: "Stage & Runway", value: "Stage & Runway" },
  { label: "Tech & Gaming", value: "Tech & Gaming" },
  { label: "Media & Arts", value: "Media & Arts" },
  { label: "Management", value: "Management" },
];

export function EventsCatalogClient() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let mounted = true;
    api.getPrograms().then((data) => {
      if (mounted) {
        setPrograms(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [programs, selectedCategory, search]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: programs.length };
    programs.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [programs]);

  const renderSeatBadge = (status: SeatStatus) => {
    switch (status) {
      case "Open":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Seats Open
          </span>
        );
      case "Filling fast":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Filling Fast
          </span>
        );
      case "Full":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            House Full
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-fest-warm selection:bg-fest-accent selection:text-black flex flex-col">
      <SmoothScroll />
      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb & HUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-fest-accent transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-fest-accent font-bold">15 ARENAS</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
            <span>
              {FEST_CONFIG.college.coordinates.lat}, {FEST_CONFIG.college.coordinates.lng}
            </span>
            <span className="text-zinc-600">|</span>
            <span>DON BOSCO MAMPETTA</span>
          </div>
        </div>

        {/* Hero Header */}
        <section className="pt-8 pb-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-md bg-fest-accent/10 border border-fest-accent/25 text-fest-accent text-[11px] font-mono font-bold tracking-widest uppercase mb-4">
              INTER-COLLEGE CHAMPIONSHIPS
            </span>
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-fest-warm uppercase leading-[0.9]">
              15 COMPETITIVE <span className="text-fest-accent">ARENAS</span>
            </h1>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
              From flagship runway showcases and high-octane esports showdowns to strategic corporate hackathons. Choose your arena, assemble your squad, and claim festival glory.
            </p>
          </div>
        </section>

        {/* Filter Controls (Sticky / Mobile-optimized) */}
        <section className="sticky top-16 z-30 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 bg-[#0A0A0A]/95 backdrop-blur-xl border-y border-white/10 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, tags, venues..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/5 border border-white/10 text-fest-warm text-xs font-sans placeholder:text-zinc-500 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                aria-label="Search events"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-fest-warm"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Pills (Horizontal scroll on mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none" role="tablist">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.value] || 0;
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-fest-accent text-black font-bold shadow-[0_2px_12px_rgba(255,77,0,0.3)]"
                        : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-fest-warm border border-white/5"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-black/20 text-black font-extrabold"
                          : "bg-white/10 text-zinc-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6">
          <span>
            SHOWING <strong className="text-fest-warm">{filtered.length}</strong> OF {programs.length} ARENAS
          </span>
          {(search || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="text-fest-accent hover:underline flex items-center gap-1"
            >
              <span>RESET FILTERS</span>
            </button>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-8 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                </div>
                <div className="h-10 w-full bg-white/10 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] max-w-xl mx-auto p-8">
            <AlertCircle className="w-12 h-12 text-fest-accent/60 mx-auto mb-4" />
            <h3 className="font-bebas text-2xl tracking-wide text-fest-warm">
              NO ARENAS MATCH YOUR SEARCH
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Try modifying your keyword &quot;{search}&quot; or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-6 px-4 py-2 rounded-xl bg-fest-accent text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-fest-accentHover transition-colors"
            >
              SHOW ALL 15 ARENAS
            </button>
          </div>
        )}

        {/* 15 Program Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prog) => {
              const isFull = prog.seatsStatus === "Full";
              return (
                <article
                  key={prog.id}
                  className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-fest-accent/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-[0_12px_40px_rgba(255,77,0,0.12)]"
                >
                  {/* Poster Image Thumbnail with Gradient Overlay */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                    <Image
                      src={prog.image}
                      alt={prog.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-black px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-fest-accent border border-fest-accent/30">
                        ARENA {prog.number}
                      </span>
                      {renderSeatBadge(prog.seatsStatus)}
                    </div>

                    {/* Bottom Tagline on Image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        {prog.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-fest-warm group-hover:text-fest-accent transition-colors leading-tight">
                        {prog.name}
                      </h2>
                      <p className="text-xs text-zinc-400 font-sans line-clamp-2 mt-1 leading-relaxed">
                        {prog.tagline}
                      </p>
                    </div>

                    {/* Quick Specs Matrix */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Users className="w-3.5 h-3.5 text-fest-accent shrink-0" />
                        <span>
                          {prog.minTeamSize === prog.maxTeamSize
                            ? `${prog.minTeamSize} Member${prog.minTeamSize > 1 ? "s" : ""}`
                            : `${prog.minTeamSize}-${prog.maxTeamSize} Members`}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{prog.prize}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="truncate">{prog.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="truncate">{prog.venue}</span>
                      </div>
                    </div>

                    {/* Fee & Action Buttons */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                          REGISTRATION
                        </span>
                        <span className="text-sm font-mono font-bold text-fest-warm">
                          {prog.feeLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/events/${prog.slug}`}
                          className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-fest-warm text-xs font-mono tracking-wider transition-colors"
                          aria-label={`View rules and details for ${prog.name}`}
                        >
                          RULES
                        </Link>

                        {isFull ? (
                          <span
                            className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-500 text-xs font-mono font-bold tracking-wider cursor-not-allowed uppercase"
                            title="Seats for this arena are full"
                          >
                            FULL
                          </span>
                        ) : (
                          <Link
                            href={`/register?program=${prog.id}`}
                            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-[0_2px_12px_rgba(255,77,0,0.3)] active:scale-95"
                          >
                            <span>REGISTER</span>
                            <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
