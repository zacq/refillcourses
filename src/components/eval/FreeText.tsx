interface FreeTextProps {
  value: string | undefined;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function FreeText({ value = "", onChange, placeholder = "Type your answer here…" }: FreeTextProps) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full rounded-xl border border-surface-border bg-cream/[0.03] px-4 py-3 text-sm
                 text-cream/85 placeholder:text-dim/60 resize-none
                 focus:outline-none focus:border-brand-primary/50 focus:bg-cream/[0.05] transition-all"
    />
  );
}
