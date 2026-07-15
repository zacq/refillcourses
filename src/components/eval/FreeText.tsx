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
      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm
                 text-white/85 placeholder:text-white/25 resize-none
                 focus:outline-none focus:border-brand-primary/50 focus:bg-white/[0.06] transition-all"
    />
  );
}
