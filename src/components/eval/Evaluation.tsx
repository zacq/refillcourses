import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Printer } from "lucide-react";
import { RatingMatrix } from "./RatingMatrix";
import { SingleChoice } from "./SingleChoice";
import { FreeText } from "./FreeText";
import { Button } from "../ui/Button";
import { api } from "../../lib/api";
import { useProgress } from "../../context/ProgressContext";
import { useAuth } from "../../context/AuthContext";
import type { Course, MatrixValue } from "../../data/schema";

interface EvaluationProps {
  course: Course;
}

export function Evaluation({ course }: EvaluationProps) {
  const { markEvaluationSubmitted } = useProgress();
  const { learner } = useAuth();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [submitting, setSubmitting] = useState(false);

  const survey = course.blocks
    .flatMap(b => b.lessons)
    .find(l => l.type === "quiz")?.survey;

  if (!survey) {
    return <p className="text-white/40">No evaluation configured for this course.</p>;
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await api.post("/evaluations", { courseId, answers, learnerId: learner?.id });
      markEvaluationSubmitted(courseId!);
      navigate(`/learn/${courseId}/certificate`);
    } finally {
      setSubmitting(false);
    }
  }

  function set(id: string, value: unknown) {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-white mb-1">Course Evaluation</h2>
      <p className="text-white/40 text-sm mb-8 flex items-center gap-2">
        <Printer size={14} /> Respondent: <em>Anonymous</em>
      </p>

      {survey.questions.map((q, i) => (
        <section key={q.id} className="mb-8">
          <div className="flex gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-pink-400/15 text-pink-300 font-bold text-sm">
              {i + 1}{q.required && <sup className="text-red-400 text-[10px]">*</sup>}
            </span>
            <div className="flex-1 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/15 px-4 py-3">
              <p className="text-white/90 text-sm">{q.prompt}</p>
            </div>
          </div>

          <div className="mt-4 pl-11">
            {q.type === "rating-matrix" && (
              <RatingMatrix
                q={q}
                value={(answers[q.id] as MatrixValue) ?? {}}
                onChange={v => set(q.id, v)}
              />
            )}
            {q.type === "single-scale" && (
              <SingleChoice
                q={q}
                value={answers[q.id] as number | undefined}
                onChange={v => set(q.id, v)}
              />
            )}
            {q.type === "free-text" && (
              <FreeText
                value={answers[q.id] as string | undefined}
                onChange={v => set(q.id, v)}
              />
            )}
          </div>
        </section>
      ))}

      <Button onClick={handleSubmit} disabled={submitting} className="w-full mt-4">
        {submitting ? "Submitting…" : "Submit Evaluation"}
      </Button>
    </div>
  );
}
