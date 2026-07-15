import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { ProgressRing } from "../ui/ProgressRing";
import { useProgress } from "../../context/ProgressContext";
import type { Course } from "../../data/schema";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { percentComplete, firstIncompleteLesson } = useProgress();
  const navigate = useNavigate();
  const pct = percentComplete(course);
  const nextLesson = firstIncompleteLesson(course);

  function handleContinue() {
    const target = nextLesson ?? course.blocks[0]?.lessons[0]?.id;
    if (target) navigate(`/learn/${course.id}/${target}`);
  }

  return (
    <GlassCard accent="violet" className="group cursor-pointer flex flex-col" onClick={handleContinue}>
      <div className="flex items-start justify-between">
        <Badge>{course.category}</Badge>
        <ProgressRing percent={pct} />
      </div>
      <h3 className="font-display text-xl text-white mt-4 group-hover:text-brand-primary transition-colors line-clamp-2">
        {course.title}
      </h3>
      <p className="text-white/55 text-sm mt-1 line-clamp-2 flex-1">{course.summary}</p>
      <div className="mt-5 flex items-center gap-2 text-sm text-brand-secondary">
        {pct === 100 ? "Review course" : "Continue"}
        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </GlassCard>
  );
}
