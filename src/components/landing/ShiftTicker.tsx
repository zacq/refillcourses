const SHIFTS = [
  ["I do many things", "I do one thing well"],
  ["I sell to everyone", "I serve a specific customer"],
  ["I need to advertise", "I need to follow up"],
  ["I hope there is money", "I know where the money went"],
  ["Numbers stress me", "Numbers guide me"],
  ["I am the system", "I built the system"],
] as const;

export function ShiftTicker() {
  const items = [...SHIFTS, ...SHIFTS];
  return (
    <div className="border-y border-white/[0.09] overflow-hidden py-[18px] bg-white/[0.02]">
      <div className="flex gap-14 whitespace-nowrap animate-marquee">
        {items.map(([before, after], i) => (
          <span key={i} className="font-mono text-[.8rem] text-dim shrink-0">
            &ldquo;{before}&rdquo; <i className="not-italic text-brand-accent mx-2.5">→</i>{" "}
            <b className="font-normal text-brand-secondary">&ldquo;{after}&rdquo;</b>
          </span>
        ))}
      </div>
    </div>
  );
}
