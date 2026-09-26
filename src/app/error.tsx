"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Festival runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-fest-black text-fest-warm flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="space-y-4 max-w-md">
        <span className="text-fest-accent text-xs tracking-widest uppercase font-bold">
          [ SIGNAL INTERRUPTED // ERROR ]
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-fest-warm">
          SOMETHING WENT WRONG
        </h2>
        <p className="text-fest-muted text-xs leading-relaxed">
          An unexpected interruption occurred in the live festival client stream.
        </p>
        <div className="pt-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fest-accent text-fest-black font-display font-bold text-xs uppercase tracking-wider hover:bg-fest-warm transition-colors"
          >
            RE-ESTABLISH SIGNAL ↻
          </button>
        </div>
      </div>
    </div>
  );
}
