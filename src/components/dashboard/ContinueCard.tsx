import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { useProgress } from "../../context/ProgressContext";
import type { Course } from "../../data/schema";

interface ContinueCardProps {
  course: Course;
}

export function ContinueCard({ course }: ContinueCardProps) {
  const { percentComplete, firstIncompleteLesson } = useProgress();
  const navigate = useNavigate();
  const pct = percentComplete(course);
  const nextLesson = firstIncompleteLesson(course);

  function handleContinue() {
    const target = nextLesson ?? course.blocks[0]?.lessons[0]?.id;
    if (target) navigate(`/learn/${course.id}/${target}`);
  }

  return (
    <div className="relative glass rounded-2xl border-brand-primary/20 bg-gradient-to-br from-brand-primary/20 via-[#11111D] to-brand-secondary/10 p-6 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-brand-primary/10 blur-3xl animate-pulse-soft pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-brand-secondary/10 blur-2xl animate-pulse-soft pointer-events-none" />

      <div className="relative">
        <p className="text-xs uppercase tracking-wider text-brand-primary/70 mb-1">Pick up where you left off</p>
        <h2 className="font-display text-2xl text-white mb-1">{course.title}</h2>
        <p className="text-white/50 text-sm mb-4">{pct}% complete</p>
        <ProgressBar value={pct} className="mb-5" />
        <Button onClick={handleContinue} className="flex items-center gap-2">
          <PlayCircle size={16} />
          Continue Learning
        </Button>
      </div>
    </div>
  );
}
