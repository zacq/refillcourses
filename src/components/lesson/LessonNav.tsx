import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import type { Lesson } from "../../data/schema";

interface LessonNavProps {
  lesson: Lesson;
}

export function LessonNav({ lesson }: LessonNavProps) {
  const { markComplete, isComplete } = useProgress();
  const navigate = useNavigate();
  const done = isComplete(lesson.id);

  return (
    <div className="mt-10 flex items-center justify-between border-t border-white/[0.08] pt-6">
      <button
        onClick={() => lesson.prevId && navigate(`/learn/${lesson.courseId}/${lesson.prevId}`)}
        disabled={!lesson.prevId}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white/60
                   hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={16} /> Previous
      </button>

      <button
        onClick={() => !done && markComplete(lesson.id)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          done
            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 cursor-default"
            : "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90"
        }`}
      >
        {done && <CheckCircle size={15} />}
        {done ? "Completed" : "Mark Complete"}
      </button>

      <button
        onClick={() => lesson.nextId && navigate(`/learn/${lesson.courseId}/${lesson.nextId}`)}
        disabled={!lesson.nextId}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white/60
                   hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
