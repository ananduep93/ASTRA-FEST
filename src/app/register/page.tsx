import { Metadata } from "next";
import { Suspense } from "react";
import { RegisterClient } from "./register-client";

export const metadata: Metadata = {
  title: "Official Festival Registration | ASTRA 2K27",
  description:
    "Register for ASTRA 2K27 competitive arenas at Don Bosco College Mampetta. Fast multi-step registration with instant 10-minute seat hold.",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-mono text-xs text-fest-accent">
          INITIALIZING REGISTRATION PORTAL...
        </div>
      }
    >
      <RegisterClient />
    </Suspense>
  );
}
