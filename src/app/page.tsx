"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { CosmicCanvas } from "@/components/cosmic-canvas";
import { Hero } from "@/components/hero";
import { MarqueeTicker } from "@/components/marquee-ticker";
import { ProgramsLineup, Program, allPrograms } from "@/components/programs-lineup";
import { Coordinators } from "@/components/coordinators";
import { Footer } from "@/components/footer";
import { RegistrationModal } from "@/components/registration-modal";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedArena, setSelectedArena] = useState<Program | null>(null);
  const [targetArenaIndex, setTargetArenaIndex] = useState<number | null>(null);

  const handleOpenRegister = (program?: Program) => {
    setSelectedArena(program || allPrograms[0]);
    setIsRegisterOpen(true);
  };

  const handleSelectArena = (index: number) => {
    setTargetArenaIndex(index);
    const el = document.getElementById("programs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-fest-black text-fest-warm flex flex-col selection:bg-fest-accent selection:text-fest-black overflow-x-clip">
      {/* Silky 120fps Lenis smooth scroll engine for mobile & desktop */}
      <SmoothScroll />

      {/* Background lightweight cosmic orbital visual with solar gold & amber hues */}
      <CosmicCanvas />

      {/* Slim, elegant fixed mobile-first top navigation */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Hero section: tight, monumental ASTRA typography, zero dead space */}
      <Hero
        onOpenRegister={() => handleOpenRegister()}
        onSelectArena={handleSelectArena}
      />

      {/* Electric Orange Festival Marquee Ticker */}
      <MarqueeTicker />

      {/* 
        15 Programs Lineup with SILKY SMOOTH CIRCULAR MOTION scroll effect:
        Background stays completely constant while programs curve across screen
      */}
      <ProgramsLineup
        onOpenRegister={handleOpenRegister}
        targetIndex={targetArenaIndex}
      />

      {/* Festival Leadership, Department & Committee Coordinators */}
      <Coordinators />

      {/* Streamlined dark footer with Anandu EP hotline & venue */}
      <Footer />

      {/* Interactive In-App Multi-Program Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        arena={selectedArena}
      />
    </main>
  );
}
