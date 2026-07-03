interface BadgeProps {
  children: React.ReactNode;
  color?: "violet" | "cyan" | "pink" | "emerald";
  className?: string;
}

const colors = {
  violet:  "bg-violet-500/15 text-violet-300 border-violet-500/30",
  cyan:    "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  pink:    "bg-pink-400/15 text-pink-300 border-pink-400/30",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export function Badge({ children, color = "violet", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
