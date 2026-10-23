"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, MapPin, Phone, MessageSquare, Compass, ShieldCheck } from "lucide-react";
import { FEST_CONFIG } from "@/config/fest.config";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="info" className="relative border-t border-white/10 bg-[#0A0A0A] py-12 sm:py-16 px-4 sm:px-6 lg:px-12 text-zinc-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col space-y-10">
        
        {/* Top Strip: Brand & Back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-fest-accent/15 border border-fest-accent/30 flex items-center justify-center p-1.5 shrink-0">
              <Image
                src="/logo.png"
                alt="ASTRA Logo"
                width={26}
                height={26}
                className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,77,0,0.6)]"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-bebas text-2xl tracking-wider text-fest-warm">
                  ASTRA
                </span>
                <span className="text-[10px] text-fest-accent font-black">2027</span>
              </div>
              <p className="text-[10px] text-zinc-500">
                ONE DAY MEGA CONCLAVE // Don Bosco College Mampetta
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:border-fest-accent/40 text-fest-warm text-[11px] transition-all active:scale-95"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-[11px] leading-relaxed">
          {/* Col 1: Direct Site Navigation */}
          <div>
            <span className="font-mono text-[10px] font-bold text-fest-accent tracking-widest uppercase block mb-3">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="/" className="hover:text-fest-accent transition-colors">
                  00 // Home Page
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-fest-accent transition-colors">
                  01 // 15 Competitive Arenas
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-fest-accent transition-colors">
                  02 // Fest Timeline &amp; Schedule
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-fest-accent transition-colors">
                  03 // Check Pass Status
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-fest-accent transition-colors">
                  04 // About &amp; Committee Crew
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Categories */}
          <div>
            <span className="font-mono text-[10px] font-bold text-fest-accent tracking-widest uppercase block mb-3">
              ARENA PILLARS
            </span>
            <ul className="space-y-1.5 text-zinc-400 text-[10px]">
              <li>• Stage &amp; Runway (Fashion &amp; Dance)</li>
              <li>• Tech &amp; Gaming (Coding, BGMI, LAN)</li>
              <li>• Media &amp; Arts (Photography, RJ, Reels)</li>
              <li>• Management (Best Manager, Quiz, Hunt)</li>
            </ul>
          </div>

          {/* Col 3: Coordinator Hotline */}
          <div>
            <span className="font-mono text-[10px] font-bold text-fest-accent tracking-widest uppercase block mb-3">
              STUDENT HOTLINE
            </span>
            <div className="space-y-2 text-zinc-400">
              <div>
                <strong className="text-fest-warm block">{FEST_CONFIG.leadCoordinator.name}</strong>
                <span className="text-[10px] text-zinc-500">{FEST_CONFIG.leadCoordinator.role}</span>
              </div>
              
              <div className="flex flex-col gap-1.5 pt-1">
                <a
                  href={FEST_CONFIG.leadCoordinator.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-green-400 hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: {FEST_CONFIG.leadCoordinator.phone}</span>
                </a>

                <a
                  href={`tel:${FEST_CONFIG.leadCoordinator.phone}`}
                  className="inline-flex items-center gap-1.5 text-fest-accent hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: +91 {FEST_CONFIG.leadCoordinator.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Campus Coordinates & Venue */}
          <div>
            <span className="font-mono text-[10px] font-bold text-fest-accent tracking-widest uppercase block mb-3">
              CAMPUS &amp; VENUE
            </span>
            <p className="text-zinc-400 text-[10px] leading-relaxed mb-2">
              Don Bosco College Mampetta<br />
              Mukkam, Kozhikode, Kerala 673602
            </p>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 pt-1">
              <Compass className="w-3.5 h-3.5 text-fest-accent shrink-0" />
              <span>{FEST_CONFIG.college.coordinates.lat}, {FEST_CONFIG.college.coordinates.lng}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-zinc-500">
          <span>
            © 2027 ASTRA · Don Bosco College Mampetta. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="w-3 h-3 text-fest-accent" />
              <span>Official Student Conclave</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
