import type { Question } from "../../data/schema";

type SingleScaleQuestion = Extract<Question, { type: "single-scale" }>;

interface SingleChoiceProps {
  q: SingleScaleQuestion;
  value: number | undefined;
  onChange: (v: number) => void;
}

export function SingleChoice({ q, value, onChange }: SingleChoiceProps) {
  const options = Array.from({ length: q.max }, (_, i) => i + 1);
  return (
    <div className="space-y-2">
      {q.labels && (
        <div className="flex justify-between text-xs text-dim mb-1">
          <span>{q.labels.min}</span>
          <span>{q.labels.max}</span>
        </div>
      )}
      <div className="flex gap-2 flex-wrap">
        {options.map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all border ${
              value === n
                ? "bg-brand-primary border-brand-primary text-white shadow-[0_0_12px] shadow-brand-primary/40"
                : "border-surface-border text-dim hover:border-brand-primary/50 hover:text-cream"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
