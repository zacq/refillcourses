import { GlassCard } from "../components/ui/GlassCard";

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-white mb-4">About RefillCourses</h1>
      <GlassCard accent="plain" className="prose-lesson">
        <p>
          RefillCourses is a self-paced learning platform built to help learners develop digital and
          professional skills on their own schedule.
        </p>
        <p className="mt-4">
          Each programme is structured into focused blocks, modules, and tasks — so you always know
          where you are and what comes next.
        </p>
      </GlassCard>
    </div>
  );
}
