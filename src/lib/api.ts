import { MOCK_COURSES } from "./mockData";
import type { Course } from "../data/schema";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const USE_MOCK = !BASE_URL;

// --- Mock handler ---
function mockGet<T>(path: string): T {
  if (path === "/courses") return MOCK_COURSES as T;

  const courseMatch = path.match(/^\/courses\/(.+)$/);
  if (courseMatch) {
    const course = MOCK_COURSES.find(c => c.id === courseMatch[1]);
    if (!course) throw new Error(`Mock: course ${courseMatch[1]} not found`);
    return course as T;
  }

  const enrolledMatch = path.match(/^\/enrollments\/(.+)\/courses$/);
  if (enrolledMatch) {
    const learnerId = enrolledMatch[1];
    const enrolled = JSON.parse(localStorage.getItem(`rc_enrollments_${learnerId}`) ?? "[]") as string[];
    const courses = MOCK_COURSES.filter(c => enrolled.includes(c.id)).map(c => ({
      ...c,
      percentComplete: mockPercentComplete(c),
    }));
    return courses as T;
  }

  return {} as T;
}

function mockPercentComplete(course: Course): number {
  const done: string[] = JSON.parse(localStorage.getItem("rc_done") ?? "[]");
  const doneSet = new Set(done);
  const lessons = course.blocks.flatMap(b => b.lessons);
  if (!lessons.length) return 0;
  return Math.round((lessons.filter(l => doneSet.has(l.id)).length / lessons.length) * 100);
}

function mockPost<T>(path: string, body: unknown): T {
  if (path === "/enrollments") {
    const { courseId, learnerId } = body as { courseId: string; learnerId: string };
    const key = `rc_enrollments_${learnerId}`;
    const existing: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
    if (!existing.includes(courseId)) {
      localStorage.setItem(key, JSON.stringify([...existing, courseId]));
    }
    return {} as T;
  }
  if (path === "/progress") return {} as T;
  if (path === "/evaluations") return {} as T;
  if (path === "/auth/magic-link") {
    const { email } = body as { email: string };
    const namePart = email.split("@")[0];
    const fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[._]/g, " ");
    const initials = fullName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
    return { id: "mock-learner", fullName, email, initials } as T;
  }
  return {} as T;
}

// --- Real API ---
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) =>
    USE_MOCK
      ? Promise.resolve(mockGet<T>(path))
      : request<T>(path),

  post: <T>(path: string, body: unknown) =>
    USE_MOCK
      ? Promise.resolve(mockPost<T>(path, body))
      : request<T>(path, { method: "POST", body: JSON.stringify(body) }),

  patch: <T>(path: string, body: unknown) =>
    USE_MOCK
      ? Promise.resolve({} as T)
      : request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(path: string) =>
    USE_MOCK
      ? Promise.resolve({} as T)
      : request<T>(path, { method: "DELETE" }),
};
