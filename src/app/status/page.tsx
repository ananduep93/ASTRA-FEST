import { Metadata } from "next";
import { Suspense } from "react";
import { StatusClient } from "./status-client";

export const metadata: Metadata = {
  title: "Check Festival Pass Status | ASTRA 2K27",
  description:
    "Verify your ASTRA 2K27 registration pass status, download entry badge, and view reporting instructions for Don Bosco College Mampetta.",
};

export default function StatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-mono text-xs text-fest-accent">
          RETRIEVING PASS VERIFICATION PORTAL...
        </div>
      }
    >
      <StatusClient />
    </Suspense>
  );
}
