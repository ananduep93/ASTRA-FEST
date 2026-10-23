"use client";

import { useState } from "react";
import { Users, Phone, MessageSquare, ShieldCheck, Laptop, Video, Palette, DollarSign, Volume2, Sparkles } from "lucide-react";

export function Coordinators() {
  const [activeTab, setActiveTab] = useState<"general" | "departments" | "committees">("general");

  const coreCoordinators = [
    { name: "Anandu EP", role: "Student Coordinator & Tech Lead", phone: "8075480258", isLead: true },
    { name: "Liju Joseph", role: "General Coordinator" },
    { name: "Vidhya", role: "General & Finance Coordinator" },
    { name: "Akshaya", role: "General Coordinator" },
    { name: "Rabith", role: "General & Finance Coordinator" },
    { name: "Santhosh", role: "General Coordinator" },
  ];

  const deptCoordinators = [
    { dept: "Computer Science (BCA)", leads: ["Amrutha", "Archana"], icon: Laptop },
    { dept: "Management (BBA)", leads: ["Pranav", "Aswani"], icon: ShieldCheck },
    { dept: "Commerce (B.Com)", leads: ["Sheeja", "Yadhav"], icon: DollarSign },
    { dept: "Social Work (BSW)", leads: ["Athira", "Harsha"], icon: Users },
  ];

  const committees = [
    { name: "Tech Team", members: "Anandu Ep, Shimil Manoj, Kiran Kumar K, Farhad Ashraf, Vivek Kp, Pritiviraj, Amal Irfan, Rahees" },
    { name: "Media & Coverage", members: "Safwan, Sharon, Munvir, Nebhuhan, Najad, Adhil" },
    { name: "Registration Desk", members: "Anjana Johnson, Leena Kumari" },
    { name: "Sound & Light", members: "Jibin, Jimmi, Ananya, Aslam" },
    { name: "LED Screen Ops", members: "Amritha, Harsha" },
    { name: "Promotion & Outreach", members: "Irfan" },
    { name: "Stall Management", members: "Sudheesh, Prabhitha" },
    { name: "Decoration & Arrangement", members: "Hall (BSW), Main Entrance & Parking (B.Com), Photo Points (BBA), Corridors (BCA)" },
  ];

  return (
    <section id="coordinators" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#07070A] border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-fest-accent font-mono text-[10px] tracking-widest uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fest-accent animate-ping" />
              <span>02 // FESTIVAL LEADERSHIP</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-fest-warm">
              CREW &amp; COORDINATORS
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0E0F16] border border-white/[0.08] self-start sm:self-auto font-mono text-xs">
            <button
              onClick={() => setActiveTab("general")}
              className={`py-1.5 px-3 rounded-lg uppercase tracking-wider transition-all ${
                activeTab === "general"
                  ? "bg-fest-accent text-fest-black font-black shadow-[0_0_12px_rgba(255,85,0,0.35)]"
                  : "text-fest-muted hover:text-fest-warm"
              }`}
            >
              CORE HEADS
            </button>
            <button
              onClick={() => setActiveTab("departments")}
              className={`py-1.5 px-3 rounded-lg uppercase tracking-wider transition-all ${
                activeTab === "departments"
                  ? "bg-fest-accent text-fest-black font-black shadow-[0_0_12px_rgba(255,85,0,0.35)]"
                  : "text-fest-muted hover:text-fest-warm"
              }`}
            >
              DEPARTMENTS
            </button>
            <button
              onClick={() => setActiveTab("committees")}
              className={`py-1.5 px-3 rounded-lg uppercase tracking-wider transition-all ${
                activeTab === "committees"
                  ? "bg-fest-accent text-fest-black font-black shadow-[0_0_12px_rgba(255,85,0,0.35)]"
                  : "text-fest-muted hover:text-fest-warm"
              }`}
            >
              COMMITTEES
            </button>
          </div>
        </div>

        {/* Lead Student Coordinator Spotlight Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-fest-accent/[0.1] via-fest-secondary/[0.05] to-transparent border border-fest-accent/30 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-fest-accent/20 border border-fest-accent/40 flex items-center justify-center text-fest-accent shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base sm:text-lg text-fest-warm">
                  Anandu EP
                </span>
                <span className="px-2 py-0.5 rounded bg-fest-accent text-fest-black font-mono text-[9px] font-black uppercase">
                  HEAD COORDINATOR
                </span>
              </div>
              <p className="font-mono text-[11px] text-fest-muted">
                Student Coordinator &amp; Tech Lead · Direct Festival Helpline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto font-mono text-xs">
            <a
              href="https://wa.me/918075480258?text=Hi%20Anandu,%20I%20have%20an%20inquiry%20regarding%20ASTRA%202027"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:8075480258"
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:border-fest-accent/40 text-fest-warm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-fest-accent" />
              <span>8075480258</span>
            </a>
          </div>
        </div>

        {/* Tab 1: General Coordinators Grid */}
        {activeTab === "general" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono">
            {coreCoordinators.map((c, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0E0F16] hover:border-fest-accent/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-display font-black text-sm text-fest-warm block">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-fest-accent block mt-0.5 font-semibold">
                    {c.role}
                  </span>
                </div>
                {c.phone && (
                  <a
                    href={`tel:${c.phone}`}
                    className="mt-2 text-[10px] text-fest-muted hover:text-fest-warm flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-fest-accent" />
                    <span>{c.phone}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Department Coordinators */}
        {activeTab === "departments" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            {deptCoordinators.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/[0.08] bg-[#0E0F16] flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-fest-accent/10 border border-fest-accent/20 flex items-center justify-center text-fest-accent shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-display font-black text-sm text-fest-warm block">
                      {d.dept}
                    </span>
                    <span className="text-[11px] text-fest-accent block mt-0.5">
                      Coordinators: <strong className="text-fest-warm font-normal">{d.leads.join(", ")}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Committees List */}
        {activeTab === "committees" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono">
            {committees.map((com, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0E0F16] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-black text-xs text-fest-accent uppercase tracking-wider">
                      {com.name}
                    </span>
                    <span className="text-[9px] text-fest-muted/70 uppercase">CREW</span>
                  </div>
                  <p className="text-[11px] text-fest-muted leading-relaxed">
                    {com.members}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
