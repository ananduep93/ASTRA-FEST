"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Users,
  Building,
  GraduationCap,
  Bus,
  Train,
  Plane,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { api } from "@/lib/api";
import { FAQItem, Announcement } from "@/types";
import { FEST_CONFIG } from "@/config/fest.config";

export function AboutClient() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  useEffect(() => {
    let mounted = true;
    Promise.all([api.getFAQs(), api.getAnnouncements()]).then(
      ([faqData, announceData]) => {
        if (mounted) {
          setFaqs(faqData);
          setAnnouncements(announceData);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-fest-warm selection:bg-fest-accent selection:text-black flex flex-col">
      <SmoothScroll />
      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-fest-accent transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-fest-accent font-bold">ABOUT &amp; CONCLAVE DISPATCH</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
            <span>MAMPETTA, KOZHIKODE</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-8 pb-12">
          <span className="inline-block px-3 py-1 rounded-md bg-fest-accent/10 border border-fest-accent/25 text-fest-accent text-[11px] font-mono font-bold tracking-widest uppercase mb-4">
            LEGACY OF DON BOSCO COLLEGE
          </span>
          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-fest-warm uppercase leading-[0.9]">
            THE SPIRIT OF <span className="text-fest-accent">ASTRA 2K27</span>
          </h1>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
            ASTRA is the flagship national inter-collegiate mega festival hosted annually by Don Bosco College Mampetta, Kozhikode. It stands as an electrifying crucible of competition, digital ingenuity, fashion runway, and executive leadership.
          </p>
        </section>

        {/* 4 Pillars Grid (Tathva Inspired) */}
        <section className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <span className="font-mono text-xs font-black text-fest-accent">
              01 // STAGE &amp; RUNWAY
            </span>
            <h3 className="font-bebas text-2xl text-fest-warm">THE ARENA OF GLAMOUR</h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              High-voltage choreography, musical showdowns, and the marquee designer fashion runway.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <span className="font-mono text-xs font-black text-fest-accent">
              02 // TECH &amp; GAMING
            </span>
            <h3 className="font-bebas text-2xl text-fest-warm">CODE &amp; COMBAT</h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Competitive coding, hardware debugging, and high-stakes BGMI &amp; eFootball tournaments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <span className="font-mono text-xs font-black text-fest-accent">
              03 // MEDIA &amp; ARTS
            </span>
            <h3 className="font-bebas text-2xl text-fest-warm">VISUAL ALCHEMY</h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Spot photography, spot videography, creative graphic design, and artistic expression.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <span className="font-mono text-xs font-black text-fest-accent">
              04 // MANAGEMENT
            </span>
            <h3 className="font-bebas text-2xl text-fest-warm">STRATEGY &amp; POWER</h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              The Best Management Team conclave, corporate marketing pitch, and campus Scavenger Hunt.
            </p>
          </div>
        </section>

        {/* Leadership & Organizing Matrix */}
        <section className="mb-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-fest-accent uppercase tracking-widest block">
                STEERING COMMITTEE
              </span>
              <h2 className="font-bebas text-3xl sm:text-4xl text-fest-warm uppercase">
                FESTIVAL LEADERSHIP MATRIX
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              STUDENT-DRIVEN • INSTITUTIONAL RIGOR
            </span>
          </div>

          {/* Lead Coordinator Spotlight Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-fest-accent/15 via-white/[0.02] to-transparent border border-fest-accent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-fest-accent text-black font-bebas text-3xl flex items-center justify-center font-black shadow-[0_0_24px_rgba(255,77,0,0.4)]">
                EP
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-fest-accent/20 text-fest-accent font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                  CHIEF STUDENT COORDINATOR &amp; TECH ARCHITECT
                </span>
                <h3 className="font-bebas text-3xl sm:text-4xl text-fest-warm">
                  {FEST_CONFIG.leadCoordinator.name}
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Head of Central Student Coordination &amp; Portal Technical Architecture
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`tel:+91${FEST_CONFIG.leadCoordinator.phone}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-fest-warm text-xs font-mono transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 {FEST_CONFIG.leadCoordinator.phone}</span>
              </a>

              <a
                href={FEST_CONFIG.leadCoordinator.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-mono font-bold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WHATSAPP DIRECT</span>
              </a>
            </div>
          </div>
        </section>

        {/* How to Reach & Campus Coordinates */}
        <section className="mb-16 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <span className="text-xs font-mono text-fest-accent uppercase tracking-widest block">
              LOCATION &amp; TRANSIT
            </span>
            <h2 className="font-bebas text-3xl sm:text-4xl text-fest-warm uppercase">
              REACHING DON BOSCO CAMPUS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-fest-accent mb-2">
                <Train className="w-4 h-4" />
              </div>
              <h4 className="font-mono text-sm font-bold text-fest-warm">
                FROM KOZHIKODE RAILWAY STATION (CLT)
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                Take a direct bus or taxi towards Mukkam / Manassery via Medical College / Kunnamangalam road (approx. 28 km, ~45 minutes).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-fest-accent mb-2">
                <Bus className="w-4 h-4" />
              </div>
              <h4 className="font-mono text-sm font-bold text-fest-warm">
                FROM MUKKAM BUS TERMINAL
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                Local buses and auto-rickshaws frequently ply towards Mampetta. The Don Bosco campus stop is directly outside the main gates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-fest-accent mb-2">
                <Plane className="w-4 h-4" />
              </div>
              <h4 className="font-mono text-sm font-bold text-fest-warm">
                FROM CALICUT INTL AIRPORT (CCJ)
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                Distance is approximately 32 km via Kondotty - Areekode - Mukkam route (around 50 minutes transit).
              </p>
            </div>
          </div>
        </section>

        {/* Official Frequently Asked Questions Accordion */}
        <section className="mb-16 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <span className="text-xs font-mono text-fest-accent uppercase tracking-widest block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-bebas text-3xl sm:text-4xl text-fest-warm uppercase">
              GENERAL FESTIVAL FAQs
            </h2>
          </div>

          <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-mono text-xs sm:text-sm text-fest-warm hover:text-fest-accent transition-colors"
                  >
                    <span className="font-bold">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-fest-accent" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 font-sans border-t border-white/5 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Latest Announcements Strip */}
        {announcements.length > 0 && (
          <section className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <span className="font-mono text-xs text-fest-accent uppercase tracking-widest block">
              BULLETIN BOARD // DISPATCHES
            </span>
            <div className="space-y-3">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-fest-accent text-black uppercase">
                      {a.badge}
                    </span>
                    <span className="text-xs font-mono text-fest-warm">{a.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{a.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
