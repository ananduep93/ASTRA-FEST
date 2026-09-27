"use client";

import { Navbar } from "@/components/navbar";
import { CosmicCanvas } from "@/components/cosmic-canvas";
import { Hero } from "@/components/hero";
import { ProgramsLineup } from "@/components/programs-lineup";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-fest-black text-fest-warm flex flex-col selection:bg-fest-accent selection:text-fest-black">
      {/* Scroll sentinel element for zero-overhead IntersectionObserver in Navbar */}
      <div id="scroll-sentinel" className="absolute top-0 left-0 w-full h-5 pointer-events-none -z-10" aria-hidden="true" />

      {/* Background lightweight cosmic orbital visual for low-end device performance */}
      <CosmicCanvas />

      {/* Floating iOS liquid glass navbar */}
      <Navbar />

      {/* Full-screen Hero with interactive ASTRA typography */}
      <Hero />

      {/* Interactive Festival Lineup: 01 Dance, 02 Music, 03 Photography, 04 Coding */}
      <ProgramsLineup />

      {/* Minimalist festival baseline footer */}
      <Footer />
    </main>
  );
}
