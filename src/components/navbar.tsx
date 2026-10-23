"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenRegister?: () => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
    { label: "Home", href: "/" },
    { label: "15 Arenas", href: "/events" },
    { label: "Schedule", href: "/schedule" },
    { label: "Check Status", href: "/status" },
    { label: "About & Crew", href: "/about" },
  ];

  return (
    <>
      {/* WCAG 2.1 AA Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-[9999] px-4 py-2 bg-fest-accent text-black font-bold font-mono text-xs rounded-lg shadow-2xl ring-2 ring-white"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 py-2 sm:py-3">
        <div
          className={`max-w-6xl mx-auto h-14 sm:h-16 px-4 sm:px-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
              : "bg-[#0A0A0A]/70 backdrop-blur-md border border-white/[0.06]"
          }`}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-fest-accent/20 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/logo.png"
                alt="ASTRA Logo"
                width={30}
                height={30}
                className="relative w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,77,0,0.6)]"
                priority
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bebas text-2xl tracking-wider text-fest-warm group-hover:text-fest-accent transition-colors">
                ASTRA
              </span>
              <span className="text-[10px] font-mono tracking-widest text-fest-accent font-black">
                ʼ27
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider uppercase text-zinc-400" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1 relative transition-colors ${
                    isActive
                      ? "text-fest-accent font-bold"
                      : "hover:text-fest-warm"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-fest-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Area */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-fest-accent/10 border border-fest-accent/25 text-[10px] font-mono text-fest-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
              <span className="tracking-widest uppercase font-semibold">DON BOSCO MAMPETTA</span>
            </div>

            {onOpenRegister ? (
              <button
                onClick={onOpenRegister}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-xs font-display font-black tracking-wider uppercase transition-all duration-300 shadow-[0_2px_16px_rgba(255,77,0,0.35)] active:scale-95"
              >
                <span>REGISTER</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            ) : (
              <Link
                href="/register"
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-xs font-display font-black tracking-wider uppercase transition-all duration-300 shadow-[0_2px_16px_rgba(255,77,0,0.35)] active:scale-95"
              >
                <span>REGISTER</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-fest-warm hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#0A0A0A]/98 backdrop-blur-2xl p-5 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest text-fest-warm">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-2.5 border-b border-white/[0.06] flex items-center justify-between ${
                        isActive
                          ? "text-fest-accent font-bold"
                          : "text-zinc-400 hover:text-fest-warm"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </Link>
                  );
                })}

                <div className="pt-2 flex flex-col gap-2">
                  {onOpenRegister ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenRegister();
                      }}
                      className="w-full py-3.5 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,77,0,0.35)]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>REGISTER FOR 15 ARENAS</span>
                    </button>
                  ) : (
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3.5 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,77,0,0.35)]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>REGISTER FOR 15 ARENAS</span>
                    </Link>
                  )}
                </div>

                <div className="pt-2 text-[10px] text-zinc-500 text-center font-mono">
                  ONE DAY FEST // DON BOSCO COLLEGE MAMPETTA
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
