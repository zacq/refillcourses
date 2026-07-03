import type { Lesson } from "../../data/schema";

interface TextLessonProps {
  lesson: Lesson;
}

export function TextLesson({ lesson }: TextLessonProps) {
  return (
    <div
      className="prose-lesson"
      dangerouslySetInnerHTML={{ __html: lesson.body ?? "" }}
    />
  );
}
