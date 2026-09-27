"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector("#scroll-sentinel");
    if (!sentinel) {
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrolled(window.scrollY > 20);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-5 sm:top-6 left-0 right-0 z-50 flex justify-center px-3.5 sm:px-6 pointer-events-none pt-safe">
      {/* iOS Liquid Glass Floating Dynamic Island Bar */}
      <div
        className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between px-3.5 sm:px-7 py-2 sm:py-3 rounded-full transition-all duration-300 relative ${
          scrolled
            ? "bg-black/75 backdrop-blur-2xl border border-white/[0.14] shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.22)]"
            : "bg-black/50 backdrop-blur-xl border border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)]"
        }`}
      >
        {/* Subtle iOS liquid inner rim refraction highlight */}
        <div className="absolute inset-0 rounded-full pointer-events-none ring-1 ring-white/10 ring-inset" />

        {/* Brand identity */}
        <a
          href="#"
          className="group flex items-center space-x-2 sm:space-x-3 text-fest-warm"
        >
          <div className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-fest-accent/20 border border-fest-accent/40 shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-fest-accent animate-pulse" />
          </div>
          <span className="font-display font-extrabold text-sm sm:text-lg tracking-[0.2em] sm:tracking-[0.22em] text-fest-warm group-hover:text-fest-accent transition-colors">
            ASTRA
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-fest-muted uppercase border-l border-white/10 pl-2">
            2027
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-7 text-[11px] lg:text-xs font-mono tracking-widest uppercase text-fest-muted">
          <a
            href="#hero"
            className="hover:text-fest-warm transition-colors py-1"
          >
            00 / ORIGIN
          </a>
          <a
            href="#programs"
            className="hover:text-fest-accent transition-colors py-1 flex items-center gap-1.5 font-semibold text-fest-warm"
          >
            <span>01 / LINEUP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent" />
          </a>
          <a
            href="#info"
            className="hover:text-fest-warm transition-colors py-1"
          >
            02 / VENUE
          </a>
        </nav>

        {/* Right Status Capsule & Action */}
        <div className="hidden sm:flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-fest-warm/90">
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
            <span className="tracking-wider">KOZHIKODE • KERALA</span>
          </div>

          <a
            href="#programs"
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-fest-accent text-fest-black text-[11px] font-display font-bold tracking-wider uppercase hover:bg-fest-warm transition-all duration-300"
          >
            <span>LINEUP</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-fest-warm hover:bg-white/5"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile iOS Liquid Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-x-3 top-16 sm:top-20 rounded-3xl bg-black/90 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] p-6 z-50 md:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 text-xs font-mono uppercase tracking-widest text-fest-warm/90">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 border-b border-white/[0.08] flex items-center justify-between hover:text-fest-accent"
              >
                <span>00 // ORIGIN</span>
                <span className="text-[10px] text-fest-muted">HOME</span>
              </a>
              <a
                href="#programs"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 border-b border-white/[0.08] flex items-center justify-between text-fest-accent font-semibold"
              >
                <span>01 // FESTIVAL LINEUP</span>
                <span className="text-[10px] bg-fest-accent/20 text-fest-accent px-2 py-0.5 rounded-full">4 ARENAS</span>
              </a>
              <a
                href="#info"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 border-b border-white/[0.08] flex items-center justify-between hover:text-fest-accent"
              >
                <span>02 // VENUE & INFO</span>
                <span className="text-[10px] text-fest-muted">MUKKAM</span>
              </a>
              
              <div className="pt-2 text-[10px] font-mono text-fest-muted flex flex-col space-y-1.5">
                <span className="text-fest-warm font-semibold tracking-wide">DON BOSCO COLLEGE MAMPETTA</span>
                <span>MUKKAM, KOZHIKODE, KERALA — 673602</span>
                <span className="text-fest-accent font-bold pt-1">INTER-COLLEGE FEST • 2027</span>
              </div>

              <div className="pt-2">
                <a
                  href="#programs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-fest-accent text-fest-black text-center font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5"
                >
                  <span>VIEW LINEUP</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
