import type { Course } from "../data/schema";

export function percentComplete(course: Course, done: Set<string>): number {
  const lessons = course.blocks.flatMap(b => b.lessons);
  if (!lessons.length) return 0;
  const completedCount = lessons.filter(l => done.has(l.id)).length;
  return Math.round((completedCount / lessons.length) * 100);
}

export function firstIncompleteLessonId(course: Course, done: Set<string>): string | null {
  for (const block of course.blocks) {
    for (const lesson of block.lessons) {
      if (!done.has(lesson.id)) return lesson.id;
    }
  }
  return null;
}

export function isCourseComplete(course: Course, done: Set<string>): boolean {
  return course.blocks.every(b => b.lessons.every(l => done.has(l.id)));
}
