"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Trophy,
  Clock,
  MapPin,
  ShieldCheck,
  Share2,
  Calendar,
  Phone,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";
import { Program, SeatStatus } from "@/types";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { FEST_CONFIG } from "@/config/fest.config";

interface EventDetailClientProps {
  program: Program;
}

export function EventDetailClient({ program }: EventDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const isFull = program.seatsStatus === "Full";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `🔥 Compete in ${program.name} at ASTRA 2K27 (Don Bosco College Mampetta)! \nPrize Pool: ${program.prize}\nRegister here: https://astrafest.live/events/${program.slug}`
  )}`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${program.name} - ASTRA 2K27`
  )}&details=${encodeURIComponent(
    `${program.tagline}\nVenue: ${program.venue}, Don Bosco College Mampetta\nRules & details: https://astrafest.live/events/${program.slug}`
  )}&location=${encodeURIComponent(
    `${program.venue}, Don Bosco College, Mampetta, Kozhikode, Kerala`
  )}`;

  const renderSeatBadge = (status: SeatStatus) => {
    switch (status) {
      case "Open":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Seats Open
          </span>
        );
      case "Filling fast":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Filling Fast
          </span>
        );
      case "Full":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30">
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

      <main id="main-content" className="flex-1 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono text-zinc-500">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 hover:text-fest-accent transition-colors py-1 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ALL ARENAS</span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="text-fest-accent font-bold">ARENA {program.number}</span>
            <span className="text-zinc-600">/</span>
            <span>{program.category}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Poster Artwork Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_16px_50px_rgba(0,0,0,0.8)] group">
              <Image
                src={program.image}
                alt={program.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-xs font-black px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md text-fest-accent border border-fest-accent/30 shadow-lg">
                  ARENA {program.number}
                </span>
                {renderSeatBadge(program.seatsStatus)}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase bg-black/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                  {program.category}
                </span>
              </div>
            </div>

            {/* Quick Share Buttons beneath Poster */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider transition-colors"
                aria-label="Share on WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WHATSAPP SHARE</span>
              </a>
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-fest-warm text-xs font-mono tracking-wider transition-colors"
                aria-label="Copy event link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY LINK</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Event Information & Registration CTA */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-2 text-fest-accent font-mono text-xs tracking-widest uppercase mb-2">
                <span>{program.badge}</span>
                <span>•</span>
                <span>DON BOSCO MAMPETTA</span>
              </div>
              <h1 className="font-bebas text-5xl sm:text-6xl lg:text-7xl tracking-tight text-fest-warm uppercase leading-[0.9]">
                {program.name}
              </h1>
              <p className="mt-3 text-fest-accent font-mono text-sm sm:text-base font-semibold">
                {program.tagline}
              </p>
              <p className="mt-4 text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
                {program.description}
              </p>
            </div>

            {/* Key Metrics / Specs Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                  PRIZE POOL
                </span>
                <div className="flex items-center gap-1.5 font-bold text-fest-warm text-sm">
                  <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{program.prize}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                  TEAM FORMAT
                </span>
                <div className="flex items-center gap-1.5 font-bold text-fest-warm text-sm">
                  <Users className="w-4 h-4 text-fest-accent shrink-0" />
                  <span>
                    {program.minTeamSize === program.maxTeamSize
                      ? `${program.minTeamSize} Member${program.minTeamSize > 1 ? "s" : ""}`
                      : `${program.minTeamSize}-${program.maxTeamSize} Members`}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                  SCHEDULE SLOT
                </span>
                <div className="flex items-center gap-1.5 font-bold text-fest-warm text-sm">
                  <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="truncate">{program.timeSlot}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                  ARENA VENUE
                </span>
                <div className="flex items-center gap-1.5 font-bold text-fest-warm text-sm">
                  <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="truncate">{program.venue}</span>
                </div>
              </div>
            </div>

            {/* Registration Fee & Action Bar */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  REGISTRATION FEE
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-bebas text-4xl text-fest-warm tracking-wider">
                    {program.feeLabel}
                  </span>
                  {program.fee > 0 && (
                    <span className="text-xs font-mono text-zinc-500">
                      (Includes all team members)
                    </span>
                  )}
                </div>
              </div>

              {isFull ? (
                <div className="flex flex-col items-start sm:items-end">
                  <span className="px-5 py-3 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-mono font-bold tracking-wider uppercase cursor-not-allowed">
                    CAPACITY REACHED (HOUSE FULL)
                  </span>
                  <p className="text-[11px] text-zinc-500 font-mono mt-1">
                    Check other open arenas
                  </p>
                </div>
              ) : (
                <div className="flex flex-col sm:items-end gap-2">
                  <Link
                    href={`/register?program=${program.id}`}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-sm font-display font-black tracking-wider uppercase transition-all shadow-[0_4px_24px_rgba(255,77,0,0.4)] active:scale-95"
                  >
                    <span>REGISTER FOR THIS ARENA</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Instant 10-Minute Seat Hold on Click
                  </span>
                </div>
              )}
            </div>

            {/* Official Rules & Guidelines */}
            <section className="space-y-4 pt-4 border-t border-white/10">
              <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-fest-warm flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-fest-accent" />
                <span>OFFICIAL RULES &amp; REGULATIONS</span>
              </h2>

              <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                {program.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <span className="font-mono text-fest-accent font-bold text-xs mt-0.5 shrink-0">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Eligibility & Calendar */}
            <section className="space-y-3 pt-4 border-t border-white/10">
              <h2 className="font-bebas text-xl sm:text-2xl tracking-wide text-fest-warm">
                ELIGIBILITY &amp; ADMISSION
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                {program.eligibility}
              </p>
              <div className="pt-2">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-fest-accent hover:underline"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>ADD ARENA TO GOOGLE CALENDAR</span>
                </a>
              </div>
            </section>

            {/* Student Coordinators */}
            <section className="space-y-4 pt-4 border-t border-white/10">
              <h2 className="font-bebas text-2xl tracking-wide text-fest-warm">
                EVENT COORDINATORS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.coordinators.map((coord, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-display font-bold text-fest-warm text-sm">
                        {coord.name}
                      </h4>
                      <p className="text-[11px] font-mono text-zinc-400">{coord.role}</p>
                      {coord.phone && (
                        <p className="text-xs font-mono text-fest-accent mt-1">
                          +91 {coord.phone}
                        </p>
                      )}
                    </div>
                    {coord.phone && (
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:+91${coord.phone}`}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-fest-warm transition-colors"
                          aria-label={`Call ${coord.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/91${coord.phone}?text=Hi%20${encodeURIComponent(coord.name)},%20I%20have%20a%20query%20about%20${encodeURIComponent(program.name)}%20at%20ASTRA%202K27`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center transition-colors"
                          aria-label={`WhatsApp ${coord.name}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
