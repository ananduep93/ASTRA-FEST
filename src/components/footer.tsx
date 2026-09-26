export function Footer() {
  return (
    <footer id="info" className="relative border-t border-fest-border bg-fest-black py-10 sm:py-14 px-4 sm:px-8 lg:px-14 text-fest-muted text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6 sm:gap-8 text-center md:text-left">
        
        {/* Left: Festival Brand & Host */}
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="w-2 h-2 rounded-full bg-fest-accent" />
            <span className="font-display font-black text-base sm:text-lg tracking-widest text-fest-warm">
              ASTRA &apos;27
            </span>
            <span className="text-white/20">/</span>
            <span className="text-fest-warm text-[11px] sm:text-xs">ANNUAL INTER-COLLEGE FEST</span>
          </div>
          <p className="text-neutral-400 text-[10px] sm:text-[11px] font-light max-w-sm">
            Hosted by Don Bosco College, Mampetta, Mukkam, Kozhikode, Kerala — 673602.
          </p>
        </div>

        {/* Center: Festival Motif */}
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-fest-accent uppercase py-1">
          ✦ PER ASPERA AD ASTRA ✦
        </div>

        {/* Right: Accreditations */}
        <div className="flex flex-col items-center md:items-end space-y-1 text-[10px] sm:text-[11px]">
          <span className="text-fest-warm font-semibold">DON BOSCO COLLEGE MAMPETTA</span>
          <span className="text-neutral-500">© 2027 ASTRA FESTIVAL. ALL RIGHTS RESERVED.</span>
        </div>

      </div>
    </footer>
  );
}
