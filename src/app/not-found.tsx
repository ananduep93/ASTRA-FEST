import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-fest-black text-fest-warm flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="space-y-4 max-w-md">
        <span className="text-fest-accent text-xs tracking-widest uppercase font-bold">
          [ ERROR 404 // REALM NOT FOUND ]
        </span>
        <h1 className="font-display font-black text-6xl text-fest-warm">
          404
        </h1>
        <p className="text-fest-muted text-xs leading-relaxed">
          The requested festival coordinate or program realm does not exist in the ASTRA 2027 matrix.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fest-accent text-fest-black font-display font-bold text-xs uppercase tracking-wider hover:bg-fest-warm transition-colors"
          >
            RETURN TO ASTRA ARENA →
          </Link>
        </div>
      </div>
    </div>
  );
}
