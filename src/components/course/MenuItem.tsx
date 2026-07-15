import { NavLink } from "react-router-dom";
import { ProgressDot } from "./ProgressDot";
import type { Lesson } from "../../data/schema";

interface MenuItemProps {
  lesson: Lesson;
  state: "done" | "current" | "todo";
}

export function MenuItem({ lesson, state }: MenuItemProps) {
  return (
    <li>
      <NavLink
        to={`/learn/${lesson.courseId}/${lesson.id}`}
        className={({ isActive }) =>
          `flex items-center gap-2.5 px-4 py-2 text-sm transition-colors border-l-2 ${
            isActive
              ? "text-white bg-brand-primary/10 border-brand-primary"
              : "text-white/60 hover:text-white/90 border-transparent"
          }`
        }
      >
        <ProgressDot state={state} />
        <span className="truncate">{lesson.title}</span>
      </NavLink>
    </li>
  );
}
