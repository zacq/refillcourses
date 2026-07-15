import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { MenuItem } from "./MenuItem";
import { ProgressBar } from "../ui/ProgressBar";
import { useProgress } from "../../context/ProgressContext";
import type { Course } from "../../data/schema";

interface CourseMenuProps {
  course: Course;
}

export function CourseMenu({ course }: CourseMenuProps) {
  const { isComplete, currentLessonId, percentComplete } = useProgress();
  const [openBlocks, setOpenBlocks] = useState<Set<string>>(
    () => new Set(course.blocks.map(b => b.id))
  );

  function toggleBlock(id: string) {
    setOpenBlocks(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const pct = percentComplete(course);

  return (
    <nav className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-4rem)]">
      <header className="px-1 pb-2">
        <h2 className="font-display text-lg text-cream">Course Menu</h2>
        <div className="flex items-center gap-2 mt-2">
          <ProgressBar value={pct} className="flex-1" />
          <span className="text-xs text-dim tabular-nums">{pct}%</span>
        </div>
      </header>

      {course.blocks.map(block => {
        const open = openBlocks.has(block.id);
        return (
          <div
            key={block.id}
            className="rounded-xl border border-surface-border bg-surface-2/50 overflow-hidden"
          >
            <button
              onClick={() => toggleBlock(block.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-cream/90 hover:bg-cream/[0.03] transition-colors"
            >
              <span className="truncate text-left">{block.title}</span>
              <ChevronUp
                size={16}
                className={`shrink-0 transition-transform ${open ? "" : "rotate-180"}`}
              />
            </button>

            {open && (
              <ul className="pb-2">
                {block.lessons.map(lesson => (
                  <MenuItem
                    key={lesson.id}
                    lesson={lesson}
                    state={
                      isComplete(lesson.id)
                        ? "done"
                        : lesson.id === currentLessonId
                        ? "current"
                        : "todo"
                    }
                  />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
