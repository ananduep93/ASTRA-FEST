"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#060607] text-[#F5F2EB] flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="space-y-4 max-w-md">
          <span className="text-[#FF3D00] text-xs tracking-widest uppercase font-bold">
            [ ROOT SIGNAL FAULT ]
          </span>
          <h2 className="text-3xl font-black text-[#F5F2EB]">
            CRITICAL APPLICATION ERROR
          </h2>
          <div className="pt-4">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-full bg-[#FF3D00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#F5F2EB] transition-colors"
            >
              TRY AGAIN ↻
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
