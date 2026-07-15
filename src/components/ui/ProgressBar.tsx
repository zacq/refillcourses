interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`h-1.5 rounded-full bg-white/10 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
