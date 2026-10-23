import { Metadata } from "next";
import { Suspense } from "react";
import { PaymentClient } from "./payment-client";

export const metadata: Metadata = {
  title: "Official UPI Payment Portal | ASTRA 2K27",
  description:
    "Secure UPI and GPay payment verification for ASTRA 2K27 festival passes. Don Bosco College Mampetta.",
};

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-mono text-xs text-fest-accent">
          LOADING SECURE PAYMENT GATEWAY...
        </div>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}
