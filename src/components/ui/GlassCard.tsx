interface GlassCardProps {
  accent?: "violet" | "cyan" | "plain";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const accents: Record<string, string> = {
  violet: "hover:border-brand-primary/45",
  cyan:   "hover:border-brand-secondary/40",
  plain:  "hover:border-white/20",
};

export function GlassCard({ accent = "violet", className = "", children, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass p-6 rounded-2xl transition-colors duration-300 ${accents[accent]} ${className}`}
    >
      {children}
    </div>
  );
}
