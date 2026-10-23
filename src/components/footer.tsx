"use client";

import Image from "next/image";
import { ArrowUp, MapPin, Phone, MessageSquare, Mail, Sparkles } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="info" className="relative border-t border-white/[0.08] bg-[#050508] py-10 sm:py-14 px-4 sm:px-6 lg:px-12 text-fest-muted text-xs font-mono">
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
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-lg tracking-[0.16em] text-fest-warm">
                  ASTRA
                </span>
                <span className="text-[10px] text-fest-accent font-bold">2027</span>
              </div>
              <p className="text-[10px] text-fest-muted/70">
                ONE DAY MEGA FEST // Don Bosco College Mampetta
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:border-fest-accent/40 text-fest-warm text-[11px] transition-colors active:scale-95"
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

          {/* Venue & Host Institution */}
          <div>
            <span className="font-mono text-[10px] font-bold text-fest-accent tracking-widest uppercase block mb-2">
              HOST INSTITUTION
            </span>
            <p className="text-fest-warm font-medium">
              Don Bosco College, Mampetta
            </p>
            <p className="text-fest-muted text-[10px]">
              Mukkam, Kozhikode, Kerala — 673602
            </p>
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Don+Bosco+College+Mampetta+Mukkam+Kozhikode"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] text-fest-accent hover:underline"
              >
                <MapPin className="w-3 h-3" />
                <span>Open Location in Google Maps ↗</span>
              </a>
            </div>
            <p className="text-fest-secondary font-semibold text-[10px] pt-2">
              ✦ PER ASPERA AD ASTRA ✦
            </p>
          </div>
        </div>

        {/* Bottom Legal / Copyright strip */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-fest-muted/50">
          <span>© 2027 ASTRA FESTIVAL · DON BOSCO COLLEGE MAMPETTA</span>
          <span>ONE DAY MEGA FESTIVAL</span>
        </div>

      </div>
    </footer>
  );
}
