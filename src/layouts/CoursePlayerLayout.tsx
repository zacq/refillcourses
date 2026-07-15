import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CourseMenu } from "../components/course/CourseMenu";
import { useCourse } from "../hooks/useCourse";
import { FullPageSkeleton } from "../components/ui/Skeleton";

export function CoursePlayerLayout() {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, loading } = useCourse(courseId!);
  const [menuOpen, setMenuOpen] = useState(true);

  if (loading || !course) return <FullPageSkeleton />;

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-brand-bg flex">
        {/* Sidebar */}
        <aside
          className={`shrink-0 border-r border-surface-border bg-surface
                      transition-[width] duration-300 overflow-hidden
                      ${menuOpen ? "w-[300px]" : "w-0"}`}
        >
          <CourseMenu course={course} />
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="mb-4 text-dim hover:text-cream transition-colors"
              aria-label={menuOpen ? "Collapse menu" : "Expand menu"}
            >
              {menuOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>
            <Outlet context={{ course }} />
          </div>
        </main>
      </div>
    </>
  );
}
