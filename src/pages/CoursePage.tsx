import { useEffect } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { FullPageSkeleton } from "../components/ui/Skeleton";
import type { Course } from "../data/schema";

interface OutletContext {
  course: Course;
}

export function CoursePage() {
  const { course } = useOutletContext<OutletContext>();
  const { courseId } = useParams<{ courseId: string }>();
  const { firstIncompleteLesson } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!course) return;
    const nextId = firstIncompleteLesson(course);
    const fallback = course.blocks[0]?.lessons[0]?.id;
    const target = nextId ?? fallback;
    if (target) navigate(`/learn/${courseId}/${target}`, { replace: true });
  }, [course, courseId, firstIncompleteLesson, navigate]);

  return <FullPageSkeleton />;
}
