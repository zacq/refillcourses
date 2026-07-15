import { Reveal } from "../ui/Reveal";

const MODULES = [
  { state: "done" as const, title: "M5 · Sales Infrastructure", detail: "Assessment passed · 86%" },
  { state: "now" as const, title: "M6 · Digital Marketing Pillar", detail: "Task 3 of 6 · Practical activity due", progress: 48 },
  { state: "lock" as const, title: "M7 · KPIs Review System", detail: "Pass M6 assessment to unlock" },
  { state: "lock" as const, title: "Capstone · Reflection & 90-Day Plan", detail: "Certificate awaits" },
];

const dotStyle = {
  done: "bg-brand-secondary/15 text-brand-secondary border border-brand-secondary/35",
  now: "bg-gradient-to-br from-brand-primary to-brand-accent text-white",
  lock: "glass text-dim",
};

const FEATURES = [
  { icon: "⏳", title: "The clock is the curriculum", body: "16-week access that actually expires. Commitment is the real fee — the countdown keeps it honest." },
  { icon: "📓", title: "Your business is the classroom", body: "Every module ends with a practical activity done in your shop, stall, or workshop — logged with a photo or note as evidence." },
  { icon: "💬", title: "WhatsApp keeps you moving", body: "Weekly progress nudges, streak reminders, and expiry alerts arrive where you already are. SMS fallback included." },
  { icon: "📶", title: "Works on your bundles", body: "Text-first pages, offline caching of your current module, printable worksheet packs for paper-based tools." },
];

export function PhoneDashboard() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-[.9fr_1.1fr] gap-14 items-center" id="dashboard">
      <Reveal>
        <div className="w-80 mx-auto rounded-[42px] p-3.5 bg-gradient-to-br from-white/[0.12] to-white/[0.03] border border-white/[0.09] shadow-[0_40px_80px_rgba(0,0,0,.5)]">
          <div className="rounded-[32px] bg-surface px-5 py-6 min-h-[560px]">
            <div className="font-display font-bold text-[1.15rem]">
              Habari, Damaris 👋
              <span className="block font-sans font-normal text-[.78rem] text-dim mt-0.5">
                Salon owner · Business Design · Week 9
              </span>
            </div>

            <div className="flex gap-2.5 my-[18px]">
              {[
                { n: "🔥 21", l: "Streak", c: "text-brand-accent" },
                { n: "38", l: "Days left", c: "text-brand-secondary" },
                { n: "6/9", l: "Modules", c: "text-[#B9A2FA]" },
              ].map(pill => (
                <div key={pill.l} className="flex-1 glass rounded-2xl p-3 text-center">
                  <div className={`font-mono font-bold text-[1.05rem] ${pill.c}`}>{pill.n}</div>
                  <div className="text-[.58rem] tracking-[.14em] uppercase text-dim mt-0.5">{pill.l}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-4 mb-4 bg-gradient-to-br from-brand-primary/16 to-brand-secondary/8 border border-brand-primary/30">
              <div className="text-[.62rem] tracking-[.16em] uppercase text-dim">Today's Cash Book · under 5 minutes</div>
              <div className="flex justify-between mt-2.5 font-mono text-[.78rem]">
                <div>+12,400<span className="block text-[.56rem] font-sans text-dim tracking-[.1em] uppercase mt-0.5">Money in</span></div>
                <div>−4,150<span className="block text-[.56rem] font-sans text-dim tracking-[.1em] uppercase mt-0.5">Money out</span></div>
                <div className="text-brand-secondary">8,250<span className="block text-[.56rem] font-sans text-dim tracking-[.1em] uppercase mt-0.5">Money left</span></div>
              </div>
            </div>

            {MODULES.map(m => (
              <div key={m.title} className="flex items-center gap-3 py-3.5 border-t border-white/[0.06]">
                <div className={`w-[30px] h-[30px] rounded-[10px] flex items-center justify-center font-mono text-[.7rem] shrink-0 ${dotStyle[m.state]}`}>
                  {m.state === "done" ? "✓" : m.state === "now" ? "▶" : "🔒"}
                </div>
                <div className="flex-1">
                  <b className={`text-[.8rem] block font-semibold ${m.state === "lock" ? "text-dim" : ""}`}>{m.title}</b>
                  <span className="text-[.64rem] text-dim">{m.detail}</span>
                  {m.progress !== undefined && (
                    <div className="h-1 rounded-full bg-white/[0.08] mt-1.5 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary" style={{ width: `${m.progress}%` }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="eyebrow">Built for the counter, not the boardroom</div>
        <h2 className="font-display text-2xl md:text-3xl mt-4 mb-6">
          Phone-first. Data-light.<br />Applied daily.
        </h2>
        {FEATURES.map((f, i) => (
          <div key={f.title} className={`flex gap-[18px] py-5 ${i > 0 ? "border-t border-white/[0.09]" : ""}`}>
            <div className="w-11 h-11 rounded-2xl shrink-0 glass flex items-center justify-center text-lg">{f.icon}</div>
            <div>
              <b className="font-display text-base block mb-1">{f.title}</b>
              <p className="text-[.87rem] text-dim">{f.body}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
