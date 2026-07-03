interface GlassCardProps {
  accent?: "violet" | "cyan" | "plain";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const accents: Record<string, string> = {
  violet: "border-violet-500/30 from-violet-900/20 hover:border-violet-500/50",
  cyan:   "border-cyan-500/30 from-cyan-900/20 hover:border-cyan-500/50",
  plain:  "border-white/10 from-white/[0.03] hover:border-white/20",
};

export function GlassCard({ accent = "violet", className = "", children, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl border bg-gradient-to-b to-[#0a0a1f] transition-all duration-300 ${accents[accent]} ${className}`}
    >
      {children}
    </div>
  );
}
