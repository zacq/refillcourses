import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

const PLANS = [
  {
    name: "Awareness",
    sub: "The full 5-level wake-up. Gachoka's story and the growth kit map.",
    price: "Free",
    per: "Forever · no account needed to read",
    items: ["Levels 1–5 in full", "8 elements of design preview", "Next-24-hours action plan"],
    cta: "Start reading",
    variant: "ghost" as const,
    featured: false,
  },
  {
    name: "Full Growth Code",
    sub: "Business Design + Pillars of Growth + the complete productivity toolkit.",
    price: "Kes 6,950",
    per: "One-time · 16 weeks access · certificate included",
    items: ["All 21 modules + capstone", "8 fillable productivity tools", "Printable worksheet packs", "Verified certificate + WhatsApp nudges"],
    cta: "Pay with M-PESA",
    variant: "mpesa" as const,
    featured: true,
  },
  {
    name: "Business Design only",
    sub: "The core 8-module system plus the 90-day capstone plan.",
    price: "Kes 4,450",
    per: "One-time · 16 weeks access",
    items: ["Modules 1–8 + capstone", "Self-assessments & certificate", "Upgrade to Pillars anytime"],
    cta: "Pay with M-PESA",
    variant: "mpesa" as const,
    featured: false,
  },
];

export function PricingPlans() {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-4 py-20" id="pricing">
      <Reveal className="max-w-xl mb-14">
        <div className="eyebrow">Enroll · Lipa na M-Pesa</div>
        <h2 className="font-display text-3xl md:text-4xl mt-4">
          Commitment is the main fee.<br />The rest is here.
        </h2>
        <p className="text-dim mt-3.5">
          One payment. Sixteen weeks. STK push straight to your phone — no cards, no forms, no stress.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 100}>
            <div className={`relative flex flex-col h-full rounded-[20px] p-9 glass ${
              plan.featured ? "border-brand-primary/55 bg-gradient-to-b from-brand-primary/10 to-white/[0.03]" : ""
            }`}>
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[.62rem] tracking-[.18em] uppercase bg-gradient-to-r from-brand-primary to-brand-accent px-4 py-1.5 rounded-full whitespace-nowrap">
                  Most chosen
                </span>
              )}
              <h3 className="text-[1.1rem] font-bold mb-1.5">{plan.name}</h3>
              <p className="text-[.8rem] text-dim min-h-[38px]">{plan.sub}</p>
              <div className="font-mono text-[2rem] font-bold mt-[18px] mb-1">{plan.price}</div>
              <div className="text-[.72rem] text-dim mb-6">{plan.per}</div>
              <ul className="text-sm flex-1">
                {plan.items.map(item => (
                  <li key={item} className="py-2 flex gap-2.5 text-cream/80">
                    <span className="font-mono text-brand-accent">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.variant}
                className="mt-6 justify-center w-full"
                onClick={() => navigate(plan.price === "Free" ? "/catalog" : "/login")}
              >
                {plan.cta}
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
