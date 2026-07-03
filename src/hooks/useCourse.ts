import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Course } from "../data/schema";

export function useCourse(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get<Course>(`/courses/${courseId}`)
      .then(setCourse)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [courseId]);

  return { course, loading, error };
}
