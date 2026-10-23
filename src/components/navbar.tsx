"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenRegister?: () => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "00 // ORIGIN", href: "#hero" },
    { label: "01 // 15 EVENTS", href: "#programs" },
    { label: "02 // CREW", href: "#coordinators" },
    { label: "03 // VENUE & INFO", href: "#info" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#060609]/92 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto h-14 sm:h-16 px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-fest-accent/25 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/logo.png"
              alt="ASTRA Logo"
              width={26}
              height={26}
              className="relative w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
              priority
            />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-base sm:text-lg tracking-[0.16em] text-fest-warm group-hover:text-fest-accent transition-colors">
              ASTRA
            </span>
            <span className="text-[10px] font-mono tracking-widest text-fest-accent font-semibold">
              ʼ27
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider uppercase text-fest-muted">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-fest-warm transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fest-accent/10 border border-fest-accent/20 text-[10px] font-mono text-fest-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
            <span className="tracking-widest uppercase">DON BOSCO MAMPETTA</span>
          </div>

          <button
            onClick={onOpenRegister}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-fest-accent text-fest-black text-xs font-display font-black tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-[0_2px_14px_rgba(0,240,255,0.35)] active:scale-95"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-fest-warm hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-b border-white/10 bg-[#0A0B12]/98 backdrop-blur-2xl px-5 py-5 overflow-hidden"
          >
            <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest text-fest-warm">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-white/[0.06] flex items-center justify-between text-fest-muted hover:text-fest-accent"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-fest-muted" />
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister?.();
                  }}
                  className="w-full py-3 rounded-xl bg-fest-accent text-fest-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-fest-black" />
                  <span>REGISTER FOR 15 EVENTS</span>
                </button>
              </div>

              <div className="pt-2 text-[10px] text-fest-muted/70 text-center font-mono">
                Coordinator: Anandu EP (8075480258) · Don Bosco College Mampetta
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
