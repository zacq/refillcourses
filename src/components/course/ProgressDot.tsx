const DOT: Record<string, string> = {
  done:    "bg-[var(--color-progress)]",
  current: "bg-[var(--color-in-progress)] animate-pulse",
  todo:    "bg-[var(--color-locked)]",
};

interface ProgressDotProps {
  state: "done" | "current" | "todo";
}

export function ProgressDot({ state }: ProgressDotProps) {
  return <span className={`w-2 h-2 rounded-full shrink-0 ${DOT[state]}`} />;
}
