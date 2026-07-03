import type { MatrixValue, Question } from "../../data/schema";

type MatrixQuestion = Extract<Question, { type: "rating-matrix" }>;

interface RatingMatrixProps {
  q: MatrixQuestion;
  value: MatrixValue;
  onChange: (v: MatrixValue) => void;
}

const SCALE = [1, 2, 3, 4, 5];

export function RatingMatrix({ q, value = {}, onChange }: RatingMatrixProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/[0.03] text-white/50">
            <th className="text-left px-3 py-2 font-normal">{q.scaleHint}</th>
            {SCALE.map(n => (
              <th key={n} className="px-3 py-2 font-medium text-center">{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {q.rows.map(row => (
            <tr key={row.id} className="border-t border-white/5">
              <td className="px-3 py-3 text-white/75">{row.label}</td>
              {SCALE.map(n => (
                <td key={n} className="text-center py-3">
                  <button
                    type="button"
                    onClick={() => onChange({ ...value, [row.id]: n })}
                    aria-label={`${row.label}: ${n}`}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      value[row.id] === n
                        ? "border-violet-400 bg-violet-500 shadow-[0_0_10px] shadow-violet-500/50"
                        : "border-white/25 hover:border-violet-400/60"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
