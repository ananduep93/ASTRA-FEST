"use client";

import Image from "next/image";
import { ArrowUp, MapPin, Phone, MessageSquare, Mail, Sparkles } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="info" className="relative border-t border-white/[0.08] bg-[#080A0E] py-12 sm:py-16 px-4 sm:px-6 lg:px-12 text-fest-muted text-xs font-mono">
      <div className="max-w-5xl mx-auto flex flex-col space-y-8">
        
        {/* Top Strip: Brand & Back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-fest-accent/15 border border-fest-accent/30 flex items-center justify-center p-1">
              <Image
                src="/logo.png"
                alt="ASTRA Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,85,0,0.6)]"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-lg tracking-[0.14em] text-fest-warm">
                  ASTRA
                </span>
                <span className="text-[10px] text-fest-accent font-black">2027</span>
              </div>
              <p className="text-[10px] text-fest-muted/70">
                ONE DAY MEGA FEST // Don Bosco College Mampetta
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:border-fest-accent/40 text-fest-warm text-[11px] transition-all active:scale-95"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Column Info Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[11px] leading-relaxed">
          {/* Programs overview */}
          <div>
            <span className="font-mono text-[10px] font-bold text-fest-accent tracking-widest uppercase block mb-2">
              15 COMPETITIVE ARENAS
            </span>
            <ul className="space-y-1 text-fest-muted text-[10px] grid grid-cols-2 sm:grid-cols-1 gap-0.5">
              <li>• Scavenger Hunt</li>
              <li>• Corporate Walk</li>
              <li>• Photography</li>
              <li>• RJ Hunt</li>
              <li>• E-Sports (BGMI/E-Foot)</li>
              <li>• Fashion Show (Group)</li>
              <li>• Theme Dance</li>
              <li>• Face Painting</li>
              <li>• Fashion Show (Single)</li>
              <li>• Best Manager</li>
              <li>• Coding Competition</li>
              <li>• Business Quiz &amp; More</li>
            </ul>
          </div>

          {/* Student Coordinator Hotline */}
          <div>
            <span className="font-mono text-[10px] font-bold text-fest-accent tracking-widest uppercase block mb-2">
              STUDENT COORDINATOR HOTLINE
            </span>
            <div className="space-y-2 text-fest-muted">
              <div>
                <strong className="text-fest-warm block">Anandu EP</strong>
                <span className="text-[10px] text-fest-muted">Head Student Coordinator &amp; Tech Lead</span>
              </div>
              
              <div className="flex flex-col gap-1.5 pt-1">
                <a
                  href="https://wa.me/918075480258?text=Hi%20Anandu,%20I%20have%20an%20inquiry%20regarding%20ASTRA%202027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-400 hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp: 8075480258</span>
                </a>

                <a
                  href="tel:8075480258"
                  className="inline-flex items-center gap-2 text-fest-accent hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: +91 8075480258</span>
                </a>
              </div>
            </div>
          </div>

          {/* Location & Institution */}
          <div>
            <span className="font-mono text-[10px] font-bold text-fest-accent tracking-widest uppercase block mb-2">
              VENUE &amp; HOST
            </span>
            <p className="text-fest-muted leading-snug mb-2">
              <strong className="text-fest-warm block">Don Bosco College</strong>
              Mampetta, Mukkam, Kozhikode, Kerala 673602
            </p>
            <div className="flex items-center gap-1.5 text-fest-accent text-[10px]">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Main Auditorium &amp; Open Amphitheatre</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-fest-muted/70">
          <div>
            © 2027 ASTRA FEST. All rights reserved. Designed for Don Bosco College Mampetta.
          </div>
          <div className="flex items-center gap-1.5 text-fest-accent">
            <Sparkles className="w-3 h-3" />
            <span>Tech Team Lead: Anandu EP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
