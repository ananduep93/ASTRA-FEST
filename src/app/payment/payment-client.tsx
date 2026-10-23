"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  QrCode,
  Smartphone,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  Printer,
  Loader2,
} from "lucide-react";
import { FEST_CONFIG } from "@/config/fest.config";
import { api } from "@/lib/api";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export function PaymentClient() {
  const searchParams = useSearchParams();
  const refId = searchParams.get("ref") || "ASTRA-DEMO";
  const amountStr = searchParams.get("amount") || "150";
  const programSlug = searchParams.get("program") || "general";
  const amount = parseInt(amountStr, 10) || 150;

  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifiedSubmitted, setIsVerifiedSubmitted] = useState(false);

  const upiId = FEST_CONFIG.payment.upiId;
  const payeeName = FEST_CONFIG.payment.payeeName;

  // Standard UPI URI format for India
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tr=${refId}&tn=${encodeURIComponent(
    `ASTRA2K27-${refId}`
  )}`;

  // Scannable QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=8&data=${encodeURIComponent(
    upiDeepLink
  )}`;

  const handleCopyUpi = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUtr = utrNumber.trim();
    if (cleanUtr.length < 6) {
      setError("Please enter a valid 12-digit UPI Reference / UTR Number or Transaction ID.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await api.submitPayment({
        registrationId: `reg_${refId}`,
        referenceId: refId,
        amount,
        upiRef: cleanUtr,
      });
      setIsVerifiedSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Failed to submit verification details. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-fest-warm selection:bg-fest-accent selection:text-black flex flex-col">
      <SmoothScroll />
      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {/* HUD Navigation */}
        <div className="flex items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Link href="/register" className="hover:text-fest-accent transition-colors">
              REGISTRATION
            </Link>
            <span>/</span>
            <span className="text-fest-accent font-bold">UPI PAYMENT VERIFICATION</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>256-BIT ENCRYPTED</span>
          </div>
        </div>

        {!isVerifiedSubmitted ? (
          <div className="mt-8 space-y-8">
            {/* Header / Amount Due */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                  PASS REFERENCE NUMBER
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-black text-fest-warm tracking-wider mt-1 block">
                  {refId}
                </span>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  Keep this reference ID for pass verification &amp; check-in.
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                  TOTAL AMOUNT PAYABLE
                </span>
                <span className="font-bebas text-4xl sm:text-5xl text-fest-accent tracking-wider block mt-0.5">
                  ₹{amount}
                </span>
              </div>
            </div>

            {/* UPI QR & Deep link section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* QR Box */}
              <div className="p-6 rounded-2xl bg-white flex flex-col items-center justify-center text-center shadow-[0_16px_50px_rgba(0,0,0,0.8)] border border-zinc-200">
                <div className="relative w-56 h-56 bg-zinc-100 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                  <Image
                    src={qrCodeUrl}
                    alt="UPI Payment QR Code"
                    width={220}
                    height={220}
                    className="w-full h-full object-contain"
                    priority
                    unoptimized
                  />
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-zinc-900 font-mono text-xs font-bold uppercase tracking-wider">
                  <QrCode className="w-4 h-4 text-fest-accent" />
                  <span>SCAN WITH ANY UPI APP</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-sans mt-0.5">
                  GPay • PhonePe • Paytm • BHIM • Cred
                </p>
              </div>

              {/* UPI ID & Deep Link CTA */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    COLLEGE FEST UPI ID (VPA)
                  </span>
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-black/60 border border-white/10 font-mono text-xs sm:text-sm text-fest-accent">
                    <span className="truncate">{upiId}</span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-fest-warm text-xs flex items-center gap-1 shrink-0 transition-colors"
                      aria-label="Copy UPI ID"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    Payee: <strong>{payeeName}</strong>
                  </p>
                </div>

                {/* Direct Mobile App Opener Deep Link */}
                <a
                  href={upiDeepLink}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-fest-warm text-xs font-mono font-bold tracking-wider uppercase transition-all active:scale-95"
                >
                  <Smartphone className="w-4 h-4 text-fest-accent" />
                  <span>OPEN INSTALLED UPI APP</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono leading-relaxed">
                  ⚠️ Note: After completing the transfer in your UPI app, copy the 12-digit UTR / UPI Reference Number from transaction details and submit below.
                </div>
              </div>
            </div>

            {/* UTR Reference Submission Form */}
            <form
              onSubmit={handleSubmitPayment}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 space-y-4"
            >
              <div>
                <label
                  htmlFor="utrInput"
                  className="block text-xs font-mono uppercase tracking-widest text-zinc-300 mb-2 font-bold"
                >
                  ENTER 12-DIGIT UPI REFERENCE / UTR / TXN ID <span className="text-fest-accent">*</span>
                </label>
                <input
                  id="utrInput"
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 408271639102 or UPI Txn Ref"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-fest-warm font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all uppercase"
                  required
                />
                <p className="text-[11px] text-zinc-500 font-mono mt-1.5">
                  Found in your GPay / PhonePe / Paytm transaction receipt under &quot;UPI Ref No.&quot; or &quot;UTR&quot;.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-sm font-display font-black tracking-wider uppercase transition-all shadow-[0_4px_24px_rgba(255,77,0,0.4)] disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING VERIFICATION...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT FOR PASS ACTIVATION</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Payment Verification Submitted Screen */
          <div className="mt-8 p-8 rounded-2xl bg-white/[0.03] border border-emerald-500/30 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                STATUS: PENDING VERIFICATION
              </span>
              <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-fest-warm uppercase">
                PAYMENT DETAILS SUBMITTED
              </h2>
              <p className="mt-2 text-zinc-400 text-xs sm:text-sm font-sans max-w-md mx-auto leading-relaxed">
                Thank you! Your reference number <strong>{refId}</strong> with UTR <strong>{utrNumber}</strong> has been logged into the festival desk system.
              </p>
            </div>

            {/* Pass Reference Card */}
            <div className="p-6 rounded-xl bg-black/60 border border-white/10 max-w-md mx-auto text-left font-mono text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-zinc-500 uppercase">FESTIVAL PASS</span>
                <span className="text-fest-accent font-bold">ASTRA 2K27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">REF ID:</span>
                <span className="text-fest-warm font-bold">{refId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">AMOUNT:</span>
                <span className="text-fest-warm">₹{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">SUBMITTED UTR:</span>
                <span className="text-fest-warm truncate max-w-[180px]">{utrNumber}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/status?ref=${refId}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-[0_2px_16px_rgba(255,77,0,0.3)]"
              >
                TRACK PASS LIVE STATUS
              </Link>

              <a
                href={FEST_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-fest-warm text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WHATSAPP SUPPORT (ANANDU)</span>
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
