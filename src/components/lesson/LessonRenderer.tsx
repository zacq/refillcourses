import { useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { TextLesson } from "./TextLesson";
import { VideoLesson } from "./VideoLesson";
import { DownloadLesson } from "./DownloadLesson";
import { Evaluation } from "../eval/Evaluation";
import { LessonNav } from "./LessonNav";
import { useProgress } from "../../context/ProgressContext";
import { FullPageSkeleton } from "../ui/Skeleton";
import type { Course } from "../../data/schema";

interface OutletContext {
  course: Course;
}

export function LessonRenderer() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { course } = useOutletContext<OutletContext>();
  const { setCurrentLesson } = useProgress();

  const lesson = course.blocks
    .flatMap(b => b.lessons)
    .find(l => l.id === lessonId);

  useEffect(() => {
    if (lessonId) setCurrentLesson(lessonId);
  }, [lessonId, setCurrentLesson]);

  if (!lesson) return <FullPageSkeleton />;

  return (
    <article>
      <p className="text-xs uppercase tracking-wider text-violet-300/70 mb-1">
        {lesson.blockTitle}
      </p>
      <h1 className="font-display text-3xl text-white mb-6">{lesson.title}</h1>

      {lesson.type === "video"    && <VideoLesson    lesson={lesson} />}
      {lesson.type === "text"     && <TextLesson     lesson={lesson} />}
      {lesson.type === "download" && <DownloadLesson lesson={lesson} />}
      {lesson.type === "quiz"     && <Evaluation     course={course} />}

      {lesson.type !== "quiz" && <LessonNav lesson={lesson} />}
    </article>
  );
}
