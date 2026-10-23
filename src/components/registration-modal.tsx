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
    navigator.clipboard.writeText("astrafest@upi");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !college) {
      alert("Please fill in your Name, Phone Number, and College Name.");
      return;
    }

    const generatedId = `ASTRA27-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegId(generatedId);
    setSubmitted(true);

    // Festive golden confetti burst!
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#F59E0B", "#FBBF24", "#F97316", "#FDE047", "#FFFFFF"],
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
          className="relative w-full max-w-lg bg-[#0C0D15] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-[0_0_60px_rgba(245,158,11,0.18)] z-10 max-h-[92vh] overflow-y-auto scrollbar-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
              <div>
                <span className="font-mono text-[10px] tracking-widest text-fest-accent uppercase block">
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
                  <span className="flex items-center gap-1 text-fest-warm">
                    <Layers className="w-3.5 h-3.5 text-fest-accent" />
                    SELECT PROGRAM / EVENT
                  </span>
                  <span className="text-fest-accent text-[10px]">15 PROGRAMS AVAILABLE</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedProgramId}
                    onChange={(e) => setSelectedProgramId(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#12131F] border border-white/15 text-fest-warm font-mono text-xs focus:outline-none focus:border-fest-accent transition-colors appearance-none"
                  >
                    {allPrograms.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#0C0D15] text-fest-warm">
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
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-fest-warm">
                    <span className="text-fest-accent">Venue:</span> {currentProgram.venue}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-fest-accent/15 border border-fest-accent/30 text-[9px] text-fest-accent font-bold uppercase shrink-0">
                  {currentProgram.badge}
                </span>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] text-fest-muted uppercase tracking-wider mb-1">
                    Participant / Team Lead Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Varma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#12131F] border border-white/10 text-fest-warm text-xs focus:outline-none focus:border-fest-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Mobile / WhatsApp Number */}
                <div>
                  <label className="block text-[10px] text-fest-muted uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#12131F] border border-white/10 text-fest-warm text-xs focus:outline-none focus:border-fest-accent transition-colors"
                  />
                </div>

                {/* College Name */}
                <div>
                  <label className="block text-[10px] text-fest-muted uppercase tracking-wider mb-1">
                    College / Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farook College"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#12131F] border border-white/10 text-fest-warm text-xs focus:outline-none focus:border-fest-accent transition-colors"
                  />
                </div>

                {/* Department & Year */}
                <div>
                  <label className="block text-[10px] text-fest-muted uppercase tracking-wider mb-1">
                    Department & Semester
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BCA, 4th Sem"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#12131F] border border-white/10 text-fest-warm text-xs focus:outline-none focus:border-fest-accent transition-colors"
                  />
                </div>
              </div>

              {/* Number of Members */}
              <div>
                <label className="block font-mono text-[10px] text-fest-muted uppercase tracking-wider mb-1">
                  Total Team Members (1 for Solo)
                </label>
                <div className="flex gap-2">
                  {["1 (Solo)", "2 (Duo)", "3-4", "Squad (5+)"].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setTeamSize(s)}
                      className={`flex-1 py-1.5 rounded-lg border font-mono text-[10px] transition-all ${
                        teamSize === s
                          ? "bg-fest-accent/20 border-fest-accent text-fest-accent font-bold"
                          : "border-white/10 bg-white/5 text-fest-muted hover:text-fest-warm"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI Verification Box */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] font-mono text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-fest-muted uppercase tracking-wider">
                    FESTIVAL UPI ID:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="inline-flex items-center gap-1 text-[10px] text-fest-accent hover:underline"
                  >
                    {copiedUpi ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUpi ? "COPIED" : "COPY UPI"}</span>
                  </button>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-fest-warm text-xs mb-2">
                  <span className="font-bold tracking-wider">astrafest@upi</span>
                  <span className="text-[10px] text-fest-accent font-semibold">1-DAY PASS</span>
                </div>
                <input
                  type="text"
                  placeholder="Optional: Enter UPI Transaction ID / UTR"
                  value={upiRef}
                  onChange={(e) => setUpiRef(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-[#12131F] border border-white/10 text-fest-warm text-[11px] focus:outline-none focus:border-fest-accent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-fest-accent text-fest-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,240,255,0.35)]"
              >
                <span>CONFIRM REGISTRATION VIA WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Digital Registration Pass Success View */
            <div className="py-2 text-center font-mono">
              <div className="w-12 h-12 rounded-full bg-fest-accent/20 border border-fest-accent text-fest-accent flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display font-black text-xl text-fest-warm mb-1">
                REGISTRATION SUBMITTED!
              </h4>
              <p className="text-xs text-fest-muted mb-4">
                Your entry has been recorded and routed to Coordinator{" "}
                <strong className="text-fest-accent">{coordinatorName}</strong>.
              </p>

              {/* Digital Pass Ticket Box */}
              <div className="p-4 rounded-2xl bg-[#11121C] border border-fest-accent/30 text-left space-y-2 mb-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] text-fest-muted">ENTRY PASS ID:</span>
                  <span className="text-xs font-black text-fest-accent tracking-widest">{regId}</span>
                </div>
                <div className="text-xs text-fest-warm font-semibold">
                  {currentProgram.name} (#{currentProgram.number})
                </div>
                <div className="text-[11px] text-fest-muted">
                  Participant: <span className="text-fest-warm">{fullName}</span>
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
                  className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
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
