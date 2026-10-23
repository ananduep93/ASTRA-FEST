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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 py-2 sm:py-3">
      <div
        className={`max-w-6xl mx-auto h-14 sm:h-16 px-4 sm:px-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[#090A10]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
            : "bg-[#090A10]/50 backdrop-blur-md border border-white/[0.04]"
        }`}
      >
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-fest-accent/25 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/logo.png"
              alt="ASTRA Logo"
              width={30}
              height={30}
              className="relative w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,85,0,0.65)]"
              priority
            />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-lg sm:text-xl tracking-[0.14em] text-fest-warm group-hover:text-fest-accent transition-colors">
              ASTRA
            </span>
            <span className="text-[10px] font-mono tracking-widest text-fest-accent font-black">
              ʼ27
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs tracking-wider uppercase text-fest-muted">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-fest-accent transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-fest-accent hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-fest-accent/10 border border-fest-accent/25 text-[10px] font-mono text-fest-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
            <span className="tracking-widest uppercase font-semibold">DON BOSCO MAMPETTA</span>
          </div>

          <button
            onClick={onOpenRegister}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-fest-black text-xs font-display font-black tracking-wider uppercase transition-all duration-300 shadow-[0_2px_16px_rgba(255,85,0,0.35)] active:scale-95"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-fest-warm hover:bg-white/10 active:scale-95 transition-all"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#0A0B12]/98 backdrop-blur-2xl p-5 shadow-2xl overflow-hidden"
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
                  className="w-full py-3.5 rounded-xl bg-fest-accent text-fest-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,85,0,0.3)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-fest-black" />
                  <span>REGISTER FOR 15 EVENTS</span>
                </button>
              </div>

              <div className="pt-2 text-[10px] text-fest-muted/70 text-center font-mono">
                ONE DAY MEGA FEST // DON BOSCO COLLEGE MAMPETTA
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
