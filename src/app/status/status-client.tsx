"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Printer,
  Share2,
  Calendar,
  MapPin,
  Users,
  Building,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";
import { Registration, RegistrationStatus } from "@/types";
import { FEST_CONFIG } from "@/config/fest.config";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export function StatusClient() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";
  const initialPhone = searchParams.get("phone") || "";

  const [refId, setRefId] = useState(initialRef);
  const [phone, setPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-search if ref or phone is provided in URL
  useEffect(() => {
    if (initialRef) {
      handleLookup(initialRef, initialPhone);
    }
  }, [initialRef, initialPhone]);

  const handleLookup = async (lookupRef: string, lookupPhone: string) => {
    const cleanRef = lookupRef.trim().toUpperCase();
    const cleanPhone = lookupPhone.trim();

    if (!cleanRef) {
      setErrorMessage("Please enter your ASTRA Reference Number (e.g. ASTRA-8492).");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSearched(true);

    try {
      const result = await api.getRegistrationStatus(cleanRef, cleanPhone);
      setRegistration(result);
      if (!result) {
        setErrorMessage(
          `No registration pass found matching Reference "${cleanRef}". Please verify your reference number or phone number.`
        );
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to query festival database.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLookup(refId, phone);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const renderStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            PASS CONFIRMED
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            PENDING VERIFICATION
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            PAYMENT REJECTED
          </span>
        );
      case "Expired":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700">
            <AlertTriangle className="w-3.5 h-3.5" />
            PASS EXPIRED
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-fest-warm selection:bg-fest-accent selection:text-black flex flex-col">
      <SmoothScroll />
      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Breadcrumb HUD */}
        <div className="flex items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-fest-accent transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-fest-accent font-bold">PASS VERIFICATION DESK</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
            <span>CENTRAL REGISTRY</span>
          </div>
        </div>

        {/* Header */}
        <section className="pt-8 pb-6">
          <span className="inline-block px-3 py-1 rounded-md bg-fest-accent/10 border border-fest-accent/25 text-fest-accent text-[11px] font-mono font-bold tracking-widest uppercase mb-3">
            STUDENT PASS CHECK-IN
          </span>
          <h1 className="font-bebas text-5xl sm:text-6xl tracking-tight text-fest-warm uppercase leading-[0.9]">
            CHECK YOUR <span className="text-fest-accent">REGISTRATION STATUS</span>
          </h1>
          <p className="mt-3 text-zinc-400 text-xs sm:text-sm font-sans max-w-xl">
            Enter your ASTRA reference code (from your registration SMS/screen) along with your 10-digit mobile number to verify admission status.
          </p>
        </section>

        {/* Search Lookup Form */}
        <form
          onSubmit={handleFormSubmit}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="refField"
                className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 font-bold"
              >
                PASS REFERENCE NUMBER <span className="text-fest-accent">*</span>
              </label>
              <input
                id="refField"
                type="text"
                value={refId}
                onChange={(e) => setRefId(e.target.value.toUpperCase())}
                placeholder="e.g. ASTRA-8492"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-mono placeholder:text-zinc-600 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all uppercase"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phoneField"
                className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 font-bold"
              >
                REGISTERED MOBILE NUMBER <span className="text-fest-accent">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">
                  +91
                </span>
                <input
                  id="phoneField"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-mono placeholder:text-zinc-600 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <span className="text-[11px] font-mono text-zinc-500">
              💡 Demo test: Try ref <strong>ASTRA-2027</strong> with phone <strong>9876543210</strong>
            </span>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-[0_2px_16px_rgba(255,77,0,0.3)] disabled:opacity-50 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>SEARCHING ARCHIVE...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>LOOKUP PASS</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error / Not Found Message */}
        {errorMessage && (
          <div className="mt-6 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>RECORD NOT FOUND</span>
            </div>
            <p className="text-zinc-400 font-sans">{errorMessage}</p>
            <div className="pt-2">
              <a
                href={FEST_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fest-accent underline inline-flex items-center gap-1"
              >
                <span>Need assistance? Contact lead coordinator Anandu on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* PASS DISPLAY CARD */}
        {registration && (
          <div className="mt-8 space-y-6">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
              {/* Watermark / Background stamp */}
              <div className="absolute top-1/2 right-6 -translate-y-1/2 font-bebas text-8xl sm:text-9xl text-white/[0.02] select-none pointer-events-none">
                ASTRA
              </div>

              {/* Pass Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fest-accent/20 border border-fest-accent/40 flex items-center justify-center p-2">
                    <Image
                      src="/logo.png"
                      alt="ASTRA Logo"
                      width={28}
                      height={28}
                      className="object-contain filter drop-shadow-[0_0_8px_rgba(255,77,0,0.6)]"
                    />
                  </div>
                  <div>
                    <span className="font-bebas text-2xl tracking-wider text-fest-warm">
                      ASTRA 2K27 OFFICIAL PASS
                    </span>
                    <p className="text-[10px] font-mono text-zinc-400">
                      DON BOSCO COLLEGE MAMPETTA // FEB 20, 2027
                    </p>
                  </div>
                </div>

                <div>{renderStatusBadge(registration.status)}</div>
              </div>

              {/* Pass Core Information */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                    PASS REFERENCE
                  </span>
                  <span className="text-xl font-black text-fest-accent">
                    {registration.referenceId}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                    COMPETITIVE ARENA
                  </span>
                  <span className="text-sm font-bold text-fest-warm">
                    {registration.programName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                    TEAM LEAD / PARTICIPANT
                  </span>
                  <span className="text-sm font-bold text-fest-warm">
                    {registration.participantName}
                  </span>
                  <p className="text-[11px] text-zinc-400">+91 {registration.phone}</p>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                    COLLEGE &amp; DEPARTMENT
                  </span>
                  <span className="text-fest-warm font-semibold">
                    {registration.collegeName}
                  </span>
                  <p className="text-[11px] text-zinc-400">
                    {registration.department} • {registration.year}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                    TEAM SIZE
                  </span>
                  <div className="flex items-center gap-1.5 text-fest-warm font-bold">
                    <Users className="w-3.5 h-3.5 text-fest-accent" />
                    <span>{registration.teamSize} Member(s)</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                    VENUE &amp; REPORTING
                  </span>
                  <div className="flex items-center gap-1.5 text-fest-warm">
                    <MapPin className="w-3.5 h-3.5 text-fest-accent" />
                    <span>Campus Desks @ 08:30 AM</span>
                  </div>
                </div>
              </div>

              {/* Squad members list if > 1 */}
              {registration.members && registration.members.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-2">
                    REGISTERED SQUAD MEMBERS ({registration.members.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {registration.members.map((m, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between"
                      >
                        <span className="text-fest-warm">
                          #{i + 2} {m.name}
                        </span>
                        {m.phone && (
                          <span className="text-[10px] text-zinc-500">{m.phone}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Steps Instructions */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-sans space-y-2">
                <span className="font-mono text-[11px] font-bold text-fest-accent uppercase tracking-wider block">
                  CHECK-IN GUIDELINES:
                </span>
                <ul className="space-y-1.5 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-fest-accent">•</span>
                    <span>
                      Carry your physical <strong>College Identity Card</strong> or bonafide certificate for physical verification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-fest-accent">•</span>
                    <span>
                      Report at Don Bosco College Mampetta Central Reception Desk by <strong>08:30 AM</strong> to receive your participant badge and breakfast coupon.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-fest-accent">•</span>
                    <span>
                      Take a screenshot or print this pass for fast barcode scanning at the gates.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-fest-warm text-xs font-mono transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PRINT / SAVE PDF</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `🎟️ Here is my official ASTRA 2K27 festival entry pass (${registration.referenceId}) for ${registration.programName} at Don Bosco College Mampetta!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-mono transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>SHARE PASS</span>
                  </a>

                  <Link
                    href="/schedule"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-fest-accent text-black text-xs font-display font-black tracking-wider uppercase shadow-[0_2px_12px_rgba(255,77,0,0.3)]"
                  >
                    <span>VIEW FEST TIMELINE</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
