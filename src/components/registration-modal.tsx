"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  User,
  GraduationCap,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { allPrograms, Program } from "./programs-lineup";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  arena?: Program | null;
}

export function RegistrationModal({ isOpen, onClose, arena }: RegistrationModalProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(
    arena?.id || allPrograms[0].id
  );
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [dept, setDept] = useState("");
  const [teamSize, setTeamSize] = useState("1");
  const [upiRef, setUpiRef] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [regId, setRegId] = useState("");

  const coordinatorName = "Anandu EP";
  const coordinatorPhone = "8075480258";

  // When arena prop updates, set selected program
  useEffect(() => {
    if (arena?.id) {
      setSelectedProgramId(arena.id);
    }
  }, [arena]);

  // Reset form when reopened
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentProgram =
    allPrograms.find((p) => p.id === selectedProgramId) || allPrograms[0];

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("8075480258@upi");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !college) {
      alert("Please fill in your name, contact phone, and college name.");
      return;
    }

    const generatedId = `ASTRA-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegId(generatedId);
    setSubmitted(true);

    // Festive electric-orange confetti burst!
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FF5500", "#FF7722", "#FFA040", "#FFF9F2", "#FFFFFF"],
      });
    } catch {
      // safe fallback
    }

    // Prepare WhatsApp message to Anandu EP
    const msg = encodeURIComponent(
      `*ASTRA 2027 REGISTRATION ENTRY*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*Reg ID:* ${generatedId}\n` +
      `*Program:* ${currentProgram.name} (#${currentProgram.number})\n` +
      `*Participant / Lead:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*College:* ${college}\n` +
      `*Department:* ${dept || "N/A"}\n` +
      `*Team Members:* ${teamSize}\n` +
      `*UPI Ref / UTR:* ${upiRef || "Pending Verification"}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Kindly confirm my slot for ASTRA 2027 at Don Bosco College Mampetta.`
    );

    const waUrl = `https://wa.me/91${coordinatorPhone}?text=${msg}`;
    // Delay slightly so user sees the digital ticket first
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window / Mobile Bottom Sheet */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="relative w-full max-w-lg bg-[#0B0E14] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-[0_0_60px_rgba(255,85,0,0.22)] z-10 max-h-[92vh] overflow-y-auto scrollbar-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
              <div>
                <span className="font-mono text-[10px] tracking-widest text-fest-accent uppercase block font-bold">
                  OFFICIAL REGISTRATION PORTAL
                </span>
                <h3 className="font-display font-black text-lg sm:text-xl text-fest-warm">
                  ASTRA FEST 2027
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-fest-muted hover:text-fest-warm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Selector Dropdown: Shows all 15 events */}
              <div>
                <label className="block font-mono text-[11px] text-fest-muted uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-fest-warm font-semibold">
                    <Layers className="w-3.5 h-3.5 text-fest-accent" />
                    SELECT PROGRAM / EVENT
                  </span>
                  <span className="text-fest-accent text-[10px] font-bold">15 PROGRAMS AVAILABLE</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedProgramId}
                    onChange={(e) => setSelectedProgramId(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#141522] border border-white/15 text-fest-warm font-mono text-xs focus:outline-none focus:border-fest-accent transition-colors appearance-none cursor-pointer"
                  >
                    {allPrograms.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#0E0F16] text-fest-warm">
                        #{p.number} — {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fest-muted text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Selected Event Quick Brief Card */}
              <div className="p-3 rounded-xl bg-fest-accent/[0.06] border border-fest-accent/25 flex items-start justify-between gap-3 font-mono text-[11px]">
                <div>
                  <span className="text-fest-accent font-black block">
                    #{currentProgram.number} {currentProgram.name.toUpperCase()}
                  </span>
                  <p className="text-fest-muted text-[10px] leading-tight mt-0.5">
                    {currentProgram.tagline}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[9px] text-fest-muted">
                    <span>Venue: <strong className="text-fest-warm font-normal">{currentProgram.venue}</strong></span>
                    <span>Badge: <strong className="text-fest-accent font-normal">{currentProgram.badge}</strong></span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-fest-accent font-bold block text-xs">
                    {currentProgram.fee}
                  </span>
                  <span className="text-[9px] text-fest-secondary font-semibold">
                    {currentProgram.prize}
                  </span>
                </div>
              </div>

              {/* Participant Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div>
                  <label className="block text-fest-muted text-[10px] uppercase mb-1">
                    Participant / Team Lead Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-[#141522] border border-white/10 text-fest-warm focus:outline-none focus:border-fest-accent"
                  />
                </div>

                <div>
                  <label className="block text-fest-muted text-[10px] uppercase mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-[#141522] border border-white/10 text-fest-warm focus:outline-none focus:border-fest-accent"
                  />
                </div>

                <div>
                  <label className="block text-fest-muted text-[10px] uppercase mb-1">
                    College / Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. St. Joseph's College"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-[#141522] border border-white/10 text-fest-warm focus:outline-none focus:border-fest-accent"
                  />
                </div>

                <div>
                  <label className="block text-fest-muted text-[10px] uppercase mb-1">
                    Department / Course (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BCA / BBA / B.Com"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-[#141522] border border-white/10 text-fest-warm focus:outline-none focus:border-fest-accent"
                  />
                </div>
              </div>

              {/* Team Size */}
              <div>
                <label className="block font-mono text-[10px] text-fest-muted uppercase mb-1">
                  Total Team Members (Including You)
                </label>
                <div className="grid grid-cols-5 gap-1.5 font-mono text-xs">
                  {["1", "2", "3", "4", "5+"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
                      className={`py-1.5 rounded-lg border transition-all ${
                        teamSize === size
                          ? "bg-fest-accent text-fest-black font-black border-fest-accent shadow-sm"
                          : "border-white/10 bg-white/5 text-fest-muted hover:text-fest-warm"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Notice & Coordinator Verification Info */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-fest-warm font-semibold">Payment &amp; Slot Confirmation</span>
                  <span className="text-[10px] text-fest-accent font-bold">FAST WHATSAPP VERIFY</span>
                </div>
                <p className="text-fest-muted text-[10px] leading-relaxed">
                  Upon clicking submit, your registration details will open directly in WhatsApp to student coordinator <strong>{coordinatorName}</strong> ({coordinatorPhone}) for instant verification and official slot allocation.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-fest-black font-display font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_24px_rgba(255,85,0,0.35)] active:scale-95"
              >
                <span>CONFIRM &amp; NOTIFY VIA WHATSAPP</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          ) : (
            /* Digital Ticket Confirmation */
            <div className="py-4 space-y-4 font-mono">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-black text-xl text-fest-warm">
                  REGISTRATION INITIATED!
                </h4>
                <p className="text-xs text-fest-muted">
                  Official Slot Pass Generated · Sent to Coordinator
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-4 rounded-2xl border border-fest-accent/30 bg-gradient-to-b from-fest-accent/10 to-transparent space-y-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs text-fest-muted">PASS ID</span>
                  <span className="font-black text-fest-accent text-sm tracking-wider">{regId}</span>
                </div>
                <div className="text-xs text-fest-warm font-bold">
                  {currentProgram.name} (#{currentProgram.number})
                </div>
                <div className="text-[11px] text-fest-muted">
                  Lead: <span className="text-fest-warm">{fullName}</span> · Phone: <span className="text-fest-warm">{phone}</span>
                </div>
                <div className="text-[11px] text-fest-muted">
                  College: <span className="text-fest-warm">{college}</span>
                </div>
                <div className="text-[10px] text-fest-accent pt-1">
                  ONE DAY MEGA FEST // DON BOSCO COLLEGE
                </div>
              </div>

              {/* Direct Buttons to WhatsApp / Phone */}
              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/91${coordinatorPhone}?text=Hi%20${coordinatorName},%20I%20have%20registered%20for%20ASTRA%202027%20(${regId})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat with Anandu EP on WhatsApp</span>
                </a>

                <a
                  href={`tel:${coordinatorPhone}`}
                  className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-fest-warm font-mono text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-fest-accent" />
                  <span>Call Coordinator: {coordinatorPhone}</span>
                </a>
              </div>
            </div>
          )}

          {/* Coordinator Hotline Footer */}
          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-fest-muted">
            <span>Student Coordinator: <strong className="text-fest-warm">{coordinatorName}</strong></span>
            <a href={`tel:${coordinatorPhone}`} className="text-fest-accent hover:underline">
              {coordinatorPhone}
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
