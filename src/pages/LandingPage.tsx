import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { RingCard } from "../components/landing/RingCard";
import { ShiftTicker } from "../components/landing/ShiftTicker";
import { ProgramBlocks } from "../components/landing/ProgramBlocks";
import { PhoneDashboard } from "../components/landing/PhoneDashboard";
import { ExpectedShift } from "../components/landing/ExpectedShift";
import { QuizCertDuo } from "../components/landing/QuizCertDuo";
import { PricingPlans } from "../components/landing/PricingPlans";

const HERO_META = [
  { n: "21", l: "Modules" },
  { n: "16 wks", l: "Access window" },
  { n: "1 hr", l: "Per day" },
  { n: "Kes 0", l: "To start" },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-28 pb-16 grid grid-cols-1 md:grid-cols-[1.15fr_.85fr] gap-12 items-center">
        <Reveal>
          <div className="eyebrow">Micro &amp; Small Business Growth Code</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[4.2rem] leading-[1.08] mt-5 mb-5">
            Every business<br />
            is{" "}
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
              scalable.
            </span>
            <br />Even yours.
          </h1>
          <p className="text-dim text-[1.08rem] max-w-[44ch]">
            A self-paced growth school for Kenyan micro-enterprises. Redesign your
            business in 16 weeks — on your phone, one hour a day. Learn. Discover. Grow.
          </p>
          <div className="flex gap-3.5 mt-8 flex-wrap">
            <Button onClick={() => navigate("/catalog")}>Begin free — Level 1: Awareness</Button>
            <Button
              variant="ghost"
              onClick={() => document.getElementById("program")?.scrollIntoView({ behavior: "smooth" })}
            >
              See the 21 modules ↓
            </Button>
          </div>
          <div className="flex gap-6 mt-9 flex-wrap">
            {HERO_META.map(m => (
              <div key={m.l}>
                <strong className="font-mono text-lg block">{m.n}</strong>
                <span className="text-[.74rem] text-dim uppercase tracking-[.12em]">{m.l}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <RingCard />
        </Reveal>
      </section>

      <ShiftTicker />
      <ProgramBlocks />
      <PhoneDashboard />
      <ExpectedShift />
      <QuizCertDuo />
      <PricingPlans />

      {/* Footer quote */}
      <footer className="border-t border-cream/10 py-16 mt-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl font-semibold leading-snug">
              "You don't take time growing the business. You take time{" "}
              <em className="not-italic bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                becoming the right person
              </em>{" "}
              to grow the business."
            </p>
            <span className="block text-[.82rem] text-dim mt-3.5">
              — Gachoka Kang'ata (GK) · Founder, Powering House · Main Coach
            </span>
          </Reveal>
          <Reveal delay={80} className="md:text-right text-[.78rem] text-dim">
            <div className="font-display font-extrabold text-base text-cream mb-2">Seed of Power</div>
            Learn. Discover. Grow your business.<br />
            No more excuses — every business is scalable.
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
