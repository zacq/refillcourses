import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";

const BLOCKS = [
  {
    count: "01",
    tag: "Free · Awareness",
    color: "cyan" as const,
    title: "The Wake-Up",
    description: "Gachoka's story — from losing everything in Nov 2023 to a rebuilt growth engine. The 5 levels that separate hustle from entrepreneurship.",
    items: ["Why businesses are always innocent", "The 8 elements of business design", "Your next-24-hours plan"],
  },
  {
    count: "02",
    tag: "Core · 8 modules",
    color: "violet" as const,
    title: "Business Design",
    description: "Design your business as a system — clarity, market access, money discipline, customer journey, sales infrastructure, KPIs.",
    items: [
      "Universe of Business & Value Proposition",
      "Business Money — daily 5-minute control",
      "Sales as a process, not talent",
      "Capstone: your 90-day scaling plan",
    ],
  },
  {
    count: "03",
    tag: "Growth · 13 pillars",
    color: "pink" as const,
    title: "Pillars of Growth",
    description: "Sustain what you've built. Protect the system that produces income — not just the income itself.",
    items: [
      "The art of starting small",
      "Business MOAT & community trust",
      "Staff, processes & SOPs",
      "Stress, health & leadership capacity",
    ],
  },
];

export function ProgramBlocks() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20" id="program">
      <Reveal className="max-w-xl mb-14">
        <div className="eyebrow">The Growth Code</div>
        <h2 className="font-display text-3xl md:text-4xl mt-4">
          Three blocks. One journey from hustle to enterprise.
        </h2>
        <p className="text-dim mt-3.5">
          Structured as Blocks → Modules → Tasks. Finish a module's self-assessment
          to unlock the next. Every module ends inside your real business, not a textbook.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {BLOCKS.map((block, i) => (
          <Reveal key={block.count} delay={i * 100}>
            <div className="glass rounded-[20px] p-8 relative overflow-hidden h-full hover:border-brand-primary/45 transition-colors duration-300">
              <span className="absolute top-5 right-6 font-mono text-4xl font-bold text-cream/[0.07]">
                {block.count}
              </span>
              <Badge color={block.color} className="mb-5">{block.tag}</Badge>
              <h3 className="text-[1.3rem] font-bold font-display mb-2.5">{block.title}</h3>
              <p className="text-dim text-sm mb-5">{block.description}</p>
              <ul className="text-sm">
                {block.items.map(item => (
                  <li key={item} className="py-2.5 border-t border-surface-border flex gap-2.5 text-cream/80">
                    <span className="font-mono text-brand-primary">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
