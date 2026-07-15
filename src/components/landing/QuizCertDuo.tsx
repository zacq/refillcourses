import { useState } from "react";
import { Reveal } from "../ui/Reveal";

const OPTIONS = [
  "Perfect product packaging",
  "Reliable access, trust and relationship",
  "A bigger advertising budget",
  "Lower prices than every competitor",
];

export function QuizCertDuo() {
  const [selected, setSelected] = useState(1);

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <Reveal className="max-w-xl mb-14">
        <div className="eyebrow">Prove it, then frame it</div>
        <h2 className="font-display text-3xl md:text-4xl mt-4">
          Self-assessments that gate progress. A certificate worth sharing.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Reveal>
          <div className="glass rounded-[20px] p-8 h-full">
            <span className="font-mono text-[.66rem] text-brand-secondary tracking-[.18em] uppercase">
              Module 2 · Self-Assessment · Q4 of 8
            </span>
            <h3 className="text-[1.15rem] font-semibold my-3.5 leading-relaxed">
              A customer passes three kiosks to buy from yours. According to Route to Market, what matters most?
            </h3>
            {OPTIONS.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelected(i)}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl mb-2.5 text-sm text-left transition-colors ${
                  selected === i ? "border border-brand-secondary bg-brand-secondary/8" : "glass hover:border-brand-primary/50"
                }`}
              >
                <span className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 relative ${selected === i ? "border-brand-secondary" : "border-dim"}`}>
                  {selected === i && <span className="absolute inset-[3px] rounded-full bg-brand-secondary" />}
                </span>
                {opt}
              </button>
            ))}
            <div className="flex justify-between font-mono text-[.7rem] text-dim mt-5">
              <span>Pass mark 70% · 2 retries</span>
              <span>Unlocks Module 3 →</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass rounded-[20px] p-8 h-full flex flex-col">
            <div className="flex-1 rounded-2xl p-8 text-center relative overflow-hidden bg-gradient-to-br from-brand-primary/14 via-brand-accent/8 to-brand-secondary/10 border border-brand-primary/35">
              <div className="absolute inset-2.5 border border-dashed border-cream/15 rounded-xl pointer-events-none" />
              <div className="font-display font-extrabold text-[.8rem] tracking-[.3em] text-brand-secondary uppercase">Seed of Power</div>
              <h4 className="font-display text-2xl mt-3.5 mb-1">Certificate of Completion</h4>
              <p className="text-[.74rem] text-dim">Micro & Small Business Growth Code</p>
              <div className="font-display text-[1.15rem] bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent my-3.5">
                Damaris W. Njoki
              </div>
              <p className="text-[.74rem] text-dim">
                Business Design Programme · 8 modules + capstone<br />Completed 12 October 2026
              </p>
              <div className="font-mono text-[.62rem] text-dim mt-[18px] pt-3.5 border-t border-cream/10">
                Verify: <b className="text-brand-secondary font-normal">refillcourses.com/verify/SP-2026-0417</b><br />
                Signed · Gachoka Kang'ata · Powering House
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
