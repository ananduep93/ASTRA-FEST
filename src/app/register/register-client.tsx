"use client";

import { useState, useEffect, useId, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationFormSchema,
  RegistrationFormData,
} from "@/lib/validations/registration";
import { api } from "@/lib/api";
import { Program, CapacityHold } from "@/types";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  Clock,
  ShieldCheck,
  AlertCircle,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  Trophy,
  RefreshCw,
  Loader2,
} from "lucide-react";

const YEARS = [
  "1st Year (UG)",
  "2nd Year (UG)",
  "3rd Year (UG)",
  "4th Year (UG)",
  "Postgraduate (PG)",
];

export function RegisterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedProgramId = searchParams.get("program");

  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Capacity Hold state
  const [hold, setHold] = useState<CapacityHold | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(600);
  const [holdExpired, setHoldExpired] = useState<boolean>(false);
  const [holdLoading, setHoldLoading] = useState<boolean>(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const idempotencyKeyRef = useRef<string>(
    `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      programId: preSelectedProgramId || "",
      participantName: "",
      phone: "",
      email: "",
      collegeName: "",
      department: "",
      year: "3rd Year (UG)",
      teamMembers: [],
      fax_hp: "",
      agreeRules: true,
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const watchedProgramId = watch("programId");

  // Fetch available programs on mount
  useEffect(() => {
    let mounted = true;
    api.getPrograms().then((data) => {
      if (mounted) {
        setPrograms(data);
        setLoadingPrograms(false);
        const match = data.find((p) => p.id === (preSelectedProgramId || data[0]?.id));
        if (match) {
          setSelectedProgram(match);
          setValue("programId", match.id);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, [preSelectedProgramId, setValue]);

  // When selected program changes, update selectedProgram object and acquire seat hold
  useEffect(() => {
    if (!watchedProgramId || programs.length === 0) return;
    const prog = programs.find((p) => p.id === watchedProgramId);
    if (prog) {
      setSelectedProgram(prog);
      acquireHold(prog.id);
    }
  }, [watchedProgramId, programs]);

  // Seat hold acquirer
  const acquireHold = async (progId: string) => {
    setHoldLoading(true);
    setHoldExpired(false);
    try {
      const holdData = await api.createCapacityHold(progId);
      setHold(holdData);
      const remaining = Math.max(
        0,
        Math.floor((holdData.expiresAt - Date.now()) / 1000)
      );
      setSecondsRemaining(remaining);
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to acquire temporary seat hold");
    } finally {
      setHoldLoading(false);
    }
  };

  // Seat hold countdown timer
  useEffect(() => {
    if (!hold || holdExpired) return;

    const timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((hold.expiresAt - Date.now()) / 1000)
      );
      setSecondsRemaining(remaining);

      if (remaining <= 0) {
        setHoldExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hold, holdExpired]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Step 1 Validation before moving to Step 2
  const handleProceedToStep2 = async () => {
    const isValid = await trigger([
      "programId",
      "participantName",
      "phone",
      "email",
      "collegeName",
      "department",
      "year",
    ]);

    if (!isValid) return;

    // Check if solo event
    if (selectedProgram && selectedProgram.maxTeamSize <= 1) {
      setStep(3); // skip team step for solo competitions
    } else {
      setStep(2);
    }
  };

  // Step 2 Validation before moving to Step 3
  const handleProceedToStep3 = async () => {
    if (fields.length > 0) {
      const isValid = await trigger("teamMembers");
      if (!isValid) return;
    }

    if (selectedProgram) {
      const totalTeam = 1 + fields.length;
      if (totalTeam < selectedProgram.minTeamSize) {
        setSubmitError(
          `Minimum team size for ${selectedProgram.name} is ${selectedProgram.minTeamSize} members. Please add ${
            selectedProgram.minTeamSize - totalTeam
          } more member(s).`
        );
        return;
      }
    }
    setSubmitError(null);
    setStep(3);
  };

  // Final Form Submission
  const onFormSubmit = async (data: RegistrationFormData) => {
    if (holdExpired) {
      setSubmitError("Your 10-minute seat hold expired. Please refresh the hold before submitting.");
      return;
    }

    // Bot honeypot check
    if (data.fax_hp) {
      console.warn("Bot detected via honeypot");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const totalTeam = 1 + data.teamMembers.length;

      const reg = await api.createRegistration({
        programId: data.programId,
        participantName: data.participantName,
        phone: data.phone,
        email: data.email,
        collegeName: data.collegeName,
        department: data.department,
        year: data.year,
        teamSize: totalTeam,
        members: data.teamMembers,
        idempotencyKey: idempotencyKeyRef.current,
      });

      // If program has a registration fee, route to Payment portal with reference ID
      if (selectedProgram && selectedProgram.fee > 0) {
        router.push(
          `/payment?ref=${reg.referenceId}&amount=${selectedProgram.fee}&program=${selectedProgram.slug}`
        );
      } else {
        // Free entry event: route directly to status confirmation
        router.push(`/status?ref=${reg.referenceId}&phone=${reg.phone}&new=1`);
      }
    } catch (err: any) {
      setSubmitError(err?.message || "Registration failed. Please check network connection.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-fest-warm selection:bg-fest-accent selection:text-black flex flex-col">
      <SmoothScroll />
      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Top Header & Tathva HUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Link href="/events" className="hover:text-fest-accent transition-colors">
              ARENAS
            </Link>
            <span>/</span>
            <span className="text-fest-accent font-bold">REGISTRATION PORTAL</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-fest-accent animate-ping" />
            <span>IDEMPOTENCY VERIFIED</span>
          </div>
        </div>

        {/* 10-Minute Capacity Hold Bar */}
        <div
          className={`mt-6 p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            holdExpired
              ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
              : secondsRemaining < 120
              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <Clock
              className={`w-5 h-5 shrink-0 ${
                holdExpired
                  ? "text-rose-400"
                  : secondsRemaining < 120
                  ? "text-amber-400 animate-pulse"
                  : "text-emerald-400"
              }`}
            />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider">
                {holdExpired
                  ? "SEAT HOLD EXPIRED"
                  : `SEAT TEMPORARILY RESERVED (${formatTimer(secondsRemaining)} REMAINING)`}
              </p>
              <p className="text-[11px] opacity-80 font-sans">
                {holdExpired
                  ? "Your 10-minute capacity reservation has expired. Refresh to hold seat again."
                  : "We hold your team seat while you complete your details to prevent slot loss."}
              </p>
            </div>
          </div>

          {holdExpired && selectedProgram && (
            <button
              type="button"
              onClick={() => acquireHold(selectedProgram.id)}
              disabled={holdLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fest-accent text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-fest-accentHover transition-colors shrink-0"
            >
              {holdLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              <span>RENEW SEAT HOLD</span>
            </button>
          )}
        </div>

        {/* Step Progression Bar */}
        <div className="mt-8 mb-10">
          <div className="flex items-center justify-between font-mono text-xs mb-2">
            <span className={step >= 1 ? "text-fest-accent font-bold" : "text-zinc-600"}>
              01 // CANDIDATE INFO
            </span>
            <span
              className={
                selectedProgram && selectedProgram.maxTeamSize <= 1
                  ? "text-zinc-600 line-through"
                  : step >= 2
                  ? "text-fest-accent font-bold"
                  : "text-zinc-600"
              }
            >
              02 // SQUAD MEMBERS
            </span>
            <span className={step >= 3 ? "text-fest-accent font-bold" : "text-zinc-600"}>
              03 // REVIEW &amp; SUBMIT
            </span>
          </div>

          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-fest-accent transition-all duration-300"
              style={{
                width: step === 1 ? "33.3%" : step === 2 ? "66.6%" : "100%",
              }}
            />
          </div>
        </div>

        {/* Error Notification Banner */}
        {submitError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            {...register("fax_hp")}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {/* STEP 1: Candidate & College Details */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Event Selector Dropdown */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  SELECT FESTIVAL ARENA <span className="text-fest-accent">*</span>
                </label>
                <select
                  {...register("programId")}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-sans focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                  disabled={loadingPrograms}
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id} className="bg-zinc-900 text-white">
                      ARENA {p.number} — {p.name} ({p.feeLabel})
                    </option>
                  ))}
                </select>
                {errors.programId && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">
                    {errors.programId.message}
                  </p>
                )}
              </div>

              {/* Selected Arena Preview Pill */}
              {selectedProgram && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <Image
                        src={selectedProgram.image}
                        alt={selectedProgram.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-fest-warm text-sm">
                        {selectedProgram.name}
                      </p>
                      <p className="text-[11px] text-fest-accent">
                        {selectedProgram.category} • Team: {selectedProgram.minTeamSize}-
                        {selectedProgram.maxTeamSize}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 uppercase block">FEE</span>
                    <span className="font-bold text-fest-warm text-sm">
                      {selectedProgram.feeLabel}
                    </span>
                  </div>
                </div>
              )}

              {/* Participant Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  FULL NAME (TEAM LEAD / PARTICIPANT) <span className="text-fest-accent">*</span>
                </label>
                <input
                  type="text"
                  {...register("participantName")}
                  placeholder="e.g. Anandu E.P."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-sans placeholder:text-zinc-600 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                />
                {errors.participantName && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">
                    {errors.participantName.message}
                  </p>
                )}
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    WHATSAPP MOBILE NUMBER <span className="text-fest-accent">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      {...register("phone")}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-sans placeholder:text-zinc-600 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                    />
                  </div>
                  {errors.phone ? (
                    <p className="text-xs text-rose-400 mt-1 font-mono">
                      {errors.phone.message}
                    </p>
                  ) : (
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">
                      10 digits without country code. Used for pass verification.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    EMAIL ADDRESS <span className="text-fest-accent">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="student@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-sans placeholder:text-zinc-600 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* College, Department & Year */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    COLLEGE / INSTITUTION NAME <span className="text-fest-accent">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("collegeName")}
                    placeholder="e.g. Don Bosco College, Mampetta"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-sans placeholder:text-zinc-600 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                  />
                  {errors.collegeName && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">
                      {errors.collegeName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                      DEPARTMENT / STREAM <span className="text-fest-accent">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("department")}
                      placeholder="e.g. Computer Applications (BCA)"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-sans placeholder:text-zinc-600 focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                    />
                    {errors.department && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">
                        {errors.department.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                      YEAR OF STUDY <span className="text-fest-accent">*</span>
                    </label>
                    <select
                      {...register("year")}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-fest-warm text-sm font-sans focus:outline-none focus:border-fest-accent focus:ring-1 focus:ring-fest-accent transition-all"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y} className="bg-zinc-900 text-white">
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-[0_2px_16px_rgba(255,77,0,0.35)] active:scale-95"
                >
                  <span>
                    {selectedProgram && selectedProgram.maxTeamSize <= 1
                      ? "PROCEED TO REVIEW"
                      : "SQUAD MEMBERS"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Team Members Configuration */}
          {step === 2 && selectedProgram && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-bebas text-2xl tracking-wide text-fest-warm">
                    ASSEMBLE SQUAD ({1 + fields.length} OF MAX {selectedProgram.maxTeamSize})
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans">
                    Lead: {watch("participantName")} (Member 1). Add remaining squad members below.
                  </p>
                </div>

                {1 + fields.length < selectedProgram.maxTeamSize && (
                  <button
                    type="button"
                    onClick={() => append({ name: "", phone: "", email: "" })}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-fest-accent font-mono text-xs font-bold uppercase transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD MEMBER</span>
                  </button>
                )}
              </div>

              {fields.length === 0 && (
                <div className="p-6 text-center rounded-xl bg-white/[0.02] border border-dashed border-white/10">
                  <p className="text-xs font-mono text-zinc-400">
                    No extra team members added yet. Minimum required: {selectedProgram.minTeamSize} total.
                  </p>
                  {selectedProgram.minTeamSize > 1 && (
                    <button
                      type="button"
                      onClick={() => append({ name: "", phone: "", email: "" })}
                      className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-fest-accent text-black font-mono text-xs font-bold uppercase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD MEMBER #{2}</span>
                    </button>
                  )}
                </div>
              )}

              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-fest-accent">
                      MEMBER #{idx + 2}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                      aria-label="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <input
                        type="text"
                        {...register(`teamMembers.${idx}.name` as const)}
                        placeholder="Member Full Name *"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-xs text-fest-warm focus:outline-none focus:border-fest-accent"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <input
                        type="tel"
                        maxLength={10}
                        {...register(`teamMembers.${idx}.phone` as const)}
                        placeholder="Mobile (Optional)"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-xs text-fest-warm focus:outline-none focus:border-fest-accent"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <input
                        type="email"
                        {...register(`teamMembers.${idx}.email` as const)}
                        placeholder="Email (Optional)"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-xs text-fest-warm focus:outline-none focus:border-fest-accent"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-zinc-400 hover:text-fest-warm text-xs font-mono transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>BACK</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-[0_2px_16px_rgba(255,77,0,0.35)] active:scale-95"
                >
                  <span>REVIEW &amp; CONFIRM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Submit */}
          {step === 3 && selectedProgram && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <h3 className="font-bebas text-2xl tracking-wide text-fest-warm pb-3 border-b border-white/10">
                  REGISTRATION SUMMARY
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 uppercase block mb-0.5">SELECTED ARENA</span>
                    <strong className="text-fest-warm text-sm">
                      {selectedProgram.name}
                    </strong>
                    <p className="text-[11px] text-zinc-400">{selectedProgram.category}</p>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase block mb-0.5">TOTAL FEE DUE</span>
                    <strong className="text-fest-accent text-xl">
                      {selectedProgram.feeLabel}
                    </strong>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase block mb-0.5">PARTICIPANT / LEAD</span>
                    <strong className="text-fest-warm">{watch("participantName")}</strong>
                    <p className="text-[11px] text-zinc-400">+91 {watch("phone")}</p>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase block mb-0.5">INSTITUTION</span>
                    <strong className="text-fest-warm">{watch("collegeName")}</strong>
                    <p className="text-[11px] text-zinc-400">
                      {watch("department")} • {watch("year")}
                    </p>
                  </div>

                  <div className="sm:col-span-2 pt-2 border-t border-white/5">
                    <span className="text-zinc-500 uppercase block mb-1">
                      TOTAL SQUAD ({1 + watch("teamMembers").length} PERSONS)
                    </span>
                    <ul className="space-y-1 text-zinc-300">
                      <li>• {watch("participantName")} (Lead)</li>
                      {watch("teamMembers").map((m, i) => (
                        <li key={i}>
                          • {m.name || `Member ${i + 2}`} {m.phone ? `(${m.phone})` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Rules and Conduct Agreement */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeRules"
                  {...register("agreeRules")}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-black text-fest-accent focus:ring-fest-accent"
                />
                <label htmlFor="agreeRules" className="text-xs font-sans text-zinc-300 cursor-pointer">
                  I confirm that all provided details and student credentials are valid. I agree to abide by the festival rules, venue code of conduct, and schedule designated by Don Bosco College Mampetta.
                </label>
              </div>
              {errors.agreeRules && (
                <p className="text-xs text-rose-400 font-mono">{errors.agreeRules.message}</p>
              )}

              {/* Actions */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setStep(selectedProgram.maxTeamSize <= 1 ? 1 : 2)
                  }
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-zinc-400 hover:text-fest-warm text-xs font-mono transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>EDIT DETAILS</span>
                </button>

                <button
                  type="submit"
                  disabled={submitting || holdExpired}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-fest-accent hover:bg-fest-accentHover text-black text-sm font-display font-black tracking-wider uppercase transition-all shadow-[0_4px_24px_rgba(255,77,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SECURING PASS...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {selectedProgram.fee > 0
                          ? "CONFIRM & PROCEED TO PAYMENT"
                          : "CONFIRM REGISTRATION"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </main>

      <Footer />
    </div>
  );
}
