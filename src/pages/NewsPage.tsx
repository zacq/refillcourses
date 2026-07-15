import { GlassCard } from "../components/ui/GlassCard";

const POSTS = [
  {
    id: "1",
    date: "2026-06-20",
    title: "Platform launch",
    body: "RefillCourses is now live. Start exploring our growing catalogue of programmes.",
  },
];

export function NewsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-cream mb-8">News & Announcements</h1>
      <div className="space-y-4">
        {POSTS.map(post => (
          <GlassCard key={post.id} accent="plain">
            <p className="text-xs text-dim mb-1">{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            <h2 className="font-display text-xl text-cream mb-2">{post.title}</h2>
            <p className="text-cream/65 text-sm leading-relaxed">{post.body}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
