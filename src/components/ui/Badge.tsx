interface BadgeProps {
  children: React.ReactNode;
  color?: "violet" | "cyan" | "pink" | "emerald";
  className?: string;
}

const colors = {
  violet:  "bg-brand-primary/14 text-brand-primary border-brand-primary/35",
  cyan:    "bg-brand-secondary/12 text-brand-secondary border-brand-secondary/30",
  pink:    "bg-brand-accent/12 text-brand-accent border-brand-accent/30",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export function Badge({ children, color = "violet", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[.66rem] tracking-[.12em] uppercase border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
