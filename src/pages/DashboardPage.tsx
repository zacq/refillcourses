import { useEffect, useState } from "react";
import { ContinueCard } from "../components/dashboard/ContinueCard";
import { CourseCard } from "../components/dashboard/CourseCard";
import { Skeleton } from "../components/ui/Skeleton";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import type { Course } from "../data/schema";

export function DashboardPage() {
  const { learner } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Course[]>(`/enrollments/${learner?.id}/courses`)
      .then(setCourses)
      .finally(() => setLoading(false));
  }, [learner?.id]);

  const inProgress = courses.filter(c => c.percentComplete < 100);
  const hero = inProgress[0] ?? courses[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white">
          Welcome back{learner ? `, ${learner.fullName.split(" ")[0]}` : ""}
        </h1>
        <p className="text-white/50 mt-1">Pick up where you left off.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 text-white/40">
          <p>You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <>
          {hero && <div className="mb-8"><ContinueCard course={hero} /></div>}
          <h2 className="font-display text-xl text-white mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        </>
      )}
    </div>
  );
}
