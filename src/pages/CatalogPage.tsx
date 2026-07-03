import { useEffect, useState } from "react";
import { CatalogCard } from "../components/catalog/CatalogCard";
import { Skeleton } from "../components/ui/Skeleton";
import { api } from "../lib/api";
import type { Course } from "../data/schema";

export function CatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Course[]>("/courses")
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white">All Programmes</h1>
        <p className="text-white/50 mt-1">Browse and enroll in available courses.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(c => <CatalogCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
