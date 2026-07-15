export function RingCard() {
  const pct = 67;
  const r = 95;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="glass rounded-[20px] p-9 text-center relative overflow-hidden">
      <div className="relative w-[220px] h-[220px] mx-auto mb-5">
        <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#CC5500" />
              <stop offset="55%" stopColor="#E8A317" />
              <stop offset="100%" stopColor="#22774F" />
            </linearGradient>
          </defs>
          <circle cx="110" cy="110" r={r} fill="none" stroke="rgba(44,37,33,.08)" strokeWidth="10" />
          <circle
            cx="110" cy="110" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-mono text-[2.7rem] font-bold leading-none bg-gradient-to-r from-brand-secondary to-brand-primary bg-clip-text text-transparent">
            {pct}<span className="text-xl">%</span>
          </div>
          <div className="text-[.68rem] tracking-[.2em] uppercase text-dim mt-1.5">Programme complete</div>
        </div>
      </div>
      <h3 className="text-[1.05rem] font-bold mb-1.5">38 days remaining</h3>
      <p className="text-[.84rem] text-dim">Your commitment window closes 12 Oct. Keep the momentum.</p>
      <div className="inline-flex items-center gap-2 mt-4 font-mono text-[.8rem] px-4 py-2 rounded-full bg-brand-accent/12 border border-brand-accent/30 text-brand-accent">
        🔥 21-day streak · usiache sasa
      </div>
    </div>
  );
}
