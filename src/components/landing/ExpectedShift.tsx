import { useState } from "react";
import { Reveal } from "../ui/Reveal";

const CARDS = [
  { module: "Module 1", before: '"I work very hard."', after: '"My business works clearly."' },
  { module: "Module 3", before: '"All this is my money."', after: '"Business money is never mixed."' },
  { module: "Module 5", before: '"I\'m not a sales person."', after: '"We follow the same steps every time."' },
];

export function ExpectedShift() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setFlipped(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="bg-white/[0.015] border-y border-white/[0.09]" id="shift">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Reveal className="max-w-xl mb-14">
          <div className="eyebrow">The Expected Shift</div>
          <h2 className="font-display text-3xl md:text-4xl mt-4">
            We don't measure watch time.<br />We measure who you become.
          </h2>
          <p className="text-dim mt-3.5">
            Each module names the mindset it replaces. Tap a card to see the shift —
            these become your reflection check-ins inside the platform.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => {
            const isFlipped = flipped.has(i);
            return (
              <Reveal key={card.module} delay={i * 100}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="glass rounded-[20px] p-7 text-left cursor-pointer relative min-h-[190px] w-full hover:border-brand-secondary/40 transition-colors duration-300"
                >
                  <div className={`font-mono text-[.62rem] tracking-[.2em] uppercase mb-4 flex items-center gap-2.5 ${isFlipped ? "text-brand-secondary" : "text-dim"}`}>
                    <span className={`w-2 h-2 rounded-sm ${isFlipped ? "bg-brand-secondary" : "bg-dim"}`} />
                    {isFlipped ? "After" : "Before"} · {card.module}
                  </div>
                  <div
                    className={`font-display text-[1.28rem] font-semibold leading-tight transition-opacity duration-300 ${
                      isFlipped ? "bg-gradient-to-r from-brand-secondary to-brand-primary bg-clip-text text-transparent" : "text-dim"
                    }`}
                  >
                    {isFlipped ? card.after : card.before}
                  </div>
                  <div className="absolute bottom-5 left-7 font-mono text-[.68rem] text-dim">tap to shift ⟲</div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
