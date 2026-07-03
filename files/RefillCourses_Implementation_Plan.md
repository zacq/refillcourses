# RefillCourses.com — Self-Paced Learning Platform Implementation Plan

> Portable blueprint for a self-paced course platform. Reuses the **NeuraFlow design system** (dark glassmorphism, violet/cyan/pink, Inter + Syne, Tailwind v4 `@theme`) and maps it onto a **WIDB-style learning anatomy**: a collapsible Course Menu (Blocks → Modules → Tasks), per-item progress dots, a lesson content pane, and an evaluation/quiz engine.
>
> **Design = inherited from NeuraFlow. Structure = inherited from the sample LMS. Sales funnel, chatbot, and lead-capture machinery are intentionally dropped.**

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 19 + TypeScript | Same as NeuraFlow |
| Build Tool | Vite 7 | Same |
| Styling | Tailwind CSS v4 (`@theme` tokens, no config file) | Same token system |
| Icons | `lucide-react` | Same |
| Fonts | Inter (body) + Syne (display/headings) via Google Fonts | Same pairing |
| Routing | `react-router-dom` v6 | **New** — a real LMS needs nested course/lesson routes, not hash routing |
| Data Layer | Airtable (REST) via a thin n8n/serverless proxy | Courses, enrollments, progress, evaluations |
| Auth | Email magic-link or Supabase Auth (pluggable) | Learners must be identifiable to persist progress |
| Video | Native `<video>` / YouTube / Vimeo embed | Lesson media |
| State | React Context + `localStorage` mirror | Progress is optimistic-local, synced to backend |
| Hosting | Netlify (`netlify.toml`, SPA redirect) | Same |

> **Why a real router (departure from NeuraFlow):** the original plan used hash routing for a single marketing sub-page. A course platform has deep, shareable, bookmarkable URLs (`/learn/:courseId/:lessonId`) and protected routes, so `react-router-dom` replaces the hash trick.

---

## 1. Project Structure

```
src/
├── App.tsx                       ← Router shell, auth gate, global providers
├── main.tsx
├── index.css                     ← Tailwind v4 @theme tokens + animations (ported from NeuraFlow)
├── context/
│   ├── AuthContext.tsx           ← current learner, login/logout
│   └── ProgressContext.tsx       ← completion state, optimistic updates, sync
├── lib/
│   ├── api.ts                    ← fetch wrappers → n8n/serverless proxy
│   └── progress.ts               ← completion math, % helpers
├── layouts/
│   ├── AppShell.tsx              ← Top navbar + page outlet (marketing + dashboard)
│   └── CoursePlayerLayout.tsx    ← Course Menu sidebar + lesson content pane
├── components/
│   ├── Navbar.tsx                ← Transparent → blurred glass on scroll (ported)
│   ├── nav/NotificationBell.tsx
│   ├── nav/MessagesButton.tsx
│   ├── nav/AvatarMenu.tsx        ← "CK" style initials avatar + dropdown
│   ├── course/CourseMenu.tsx     ← Accordion: Blocks → Modules → Tasks + progress dots
│   ├── course/MenuItem.tsx       ← Single lesson row with completion indicator
│   ├── course/ProgressDot.tsx    ← done / in-progress / locked states
│   ├── course/ProgressBar.tsx    ← Course-level % bar
│   ├── lesson/LessonRenderer.tsx ← Switches on lesson.type (text/video/download/quiz)
│   ├── lesson/VideoLesson.tsx
│   ├── lesson/TextLesson.tsx
│   ├── lesson/DownloadLesson.tsx ← "Flyer", "Instructions" style attachments
│   ├── lesson/LessonNav.tsx      ← Prev / Mark Complete / Next
│   ├── eval/Evaluation.tsx       ← Quiz/survey engine
│   ├── eval/RatingMatrix.tsx     ← The 1–5 grid from the sample
│   ├── eval/SingleChoice.tsx
│   ├── eval/FreeText.tsx
│   ├── dashboard/CourseCard.tsx  ← Enrolled course w/ progress ring
│   ├── dashboard/ContinueCard.tsx← "Pick up where you left off"
│   ├── catalog/CatalogCard.tsx   ← Browse/enroll
│   ├── certificate/Certificate.tsx
│   └── ui/                       ← GlassCard, Button, Badge, Skeleton, Modal
└── data/
    └── schema.ts                 ← TypeScript types (Course, Block, Module, Lesson…)
```

---

## 2. Information Architecture & Routing

```
/                         Landing / marketing (dark hero, ported NeuraFlow aesthetic)
/login                    Magic-link / auth
/dashboard                Learner home — enrolled courses, continue-learning, progress
/catalog                  Browse all programmes
/catalog/:courseId        Course detail + enroll
/news                     News / announcements feed
/about                    About RefillCourses
/learn/:courseId          Course player → redirects to first incomplete lesson
/learn/:courseId/:lessonId  Lesson view inside CoursePlayerLayout
/learn/:courseId/evaluation Course evaluation (gated until lessons complete)
/learn/:courseId/certificate  Certificate (gated until evaluation complete)
```

### Route Guarding

```tsx
// Protected routes require an authenticated learner
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { learner, loading } = useAuth();
  if (loading) return <FullPageSkeleton />;
  if (!learner) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Sequential gating — evaluation locked until all lessons complete
function RequireCourseComplete({ courseId, children }: GateProps) {
  const { isCourseComplete } = useProgress();
  if (!isCourseComplete(courseId)) {
    return <Navigate to={`/learn/${courseId}`} replace />;
  }
  return <>{children}</>;
}
```

---

## 3. Design System (ported verbatim from NeuraFlow, extended for learning)

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --font-sans:    "Inter", ui-sans-serif, system-ui;
  --font-display: "Syne", sans-serif;

  /* Core brand palette — UNCHANGED from NeuraFlow */
  --color-brand-bg:        #030308;  /* Near-black page background */
  --color-brand-primary:   #8b5cf6;  /* Violet — primary CTAs, active nav, accents */
  --color-brand-secondary: #06b6d4;  /* Cyan — secondary accents, links */
  --color-brand-accent:    #f0abfc;  /* Light pink — badges, highlights */

  /* NEW — learning-platform semantic tokens */
  --color-surface:    #0d0d1f;       /* Elevated glass panels (sidebar, content pane) */
  --color-surface-2:  #12122b;       /* Cards on top of surfaces */
  --color-progress:   #34d399;       /* Emerald — completion dots (matches sample) */
  --color-in-progress:#fbbf24;       /* Amber — current/started lesson */
  --color-locked:     #3f3f5a;       /* Muted — locked/not-started */
}

@layer base {
  body {
    @apply font-sans bg-brand-bg text-white/90 antialiased;
    letter-spacing: -0.01em;
  }
  h1, h2, h3, h4, .font-display {
    @apply font-display font-bold tracking-tight text-white;
  }
  /* Long-form lesson content needs comfortable reading defaults */
  .prose-lesson {
    @apply text-white/85 leading-relaxed text-[15px] md:text-base;
  }
  .prose-lesson h2 { @apply text-2xl mt-8 mb-3; }
  .prose-lesson p  { @apply mb-4; }
  .prose-lesson ul { @apply list-disc pl-6 mb-4 space-y-1; }
}

/* Animations — ported from NeuraFlow */
@keyframes float        { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-10px);} }
@keyframes pulse-soft   { 0%,100% { opacity:.15; transform:scale(1);} 50% { opacity:.25; transform:scale(1.05);} }
@keyframes marquee      { 0% { transform: translateX(0);} 100% { transform: translateX(-50%);} }
.animate-float       { animation: float 6s ease-in-out infinite; }
.animate-pulse-soft  { animation: pulse-soft 8s ease-in-out infinite; }
.animate-marquee     { animation: marquee 40s linear infinite; width: max-content; }

* { scroll-behavior: smooth; }
::selection { @apply bg-brand-primary/30 text-white; }
```

### Theme strategy — dark chrome, readable content

The NeuraFlow palette is dark. A learning platform is **read-heavy**, so the design is applied as:

- **App chrome (navbar, Course Menu sidebar, dashboard, cards):** full dark glassmorphism — this is where the NeuraFlow look lives.
- **Lesson content surface:** a slightly elevated dark-glass panel (`--color-surface`) with high-contrast body text (`text-white/85`, 15–16px, generous line-height) so long reading sessions stay comfortable while staying on-brand.

### Repeating Glass Card (ported pattern)

```html
<!-- Dark glass card with colored border accent -->
<div class="p-6 rounded-2xl border border-violet-500/30
            bg-gradient-to-b from-violet-900/20 to-[#0a0a2f]
            hover:border-violet-500/50 transition-all duration-300">
```

### `GlassCard` primitive

```tsx
export function GlassCard({ accent = "violet", className = "", children }: GlassCardProps) {
  const accents: Record<string, string> = {
    violet: "border-violet-500/30 from-violet-900/20 hover:border-violet-500/50",
    cyan:   "border-cyan-500/30 from-cyan-900/20 hover:border-cyan-500/50",
    plain:  "border-white/10 from-white/[0.03] hover:border-white/20",
  };
  return (
    <div className={`p-6 rounded-2xl border bg-gradient-to-b to-[#0a0a1f]
                     transition-all duration-300 ${accents[accent]} ${className}`}>
      {children}
    </div>
  );
}
```

---

## 4. App Shell & Top Navbar

Adapts the NeuraFlow navbar (transparent → blurred glass on scroll) into a **logged-in app bar**, mirroring the sample: left logo, center nav links, right utility cluster (notifications, messages, avatar).

```tsx
// Navbar.tsx — center links + right utility cluster
<header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
  scrolled
    ? "bg-brand-bg/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-2"
    : "bg-brand-bg/40 backdrop-blur-md py-3"   /* app bar is always slightly opaque */
}`}>
  <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
    <Logo />  {/* RefillCourses mark */}

    <ul className="hidden md:flex items-center gap-7 text-sm text-white/70">
      {["Home","Dashboard","News","About","Programmes"].map(label => (
        <li key={label}>
          <NavLink to={routeFor(label)}
            className={({isActive}) =>
              isActive ? "text-white" : "hover:text-white transition-colors"}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>

    <div className="flex items-center gap-3">
      <NotificationBell count={unread} />
      <MessagesButton />
      <span className="w-px h-6 bg-white/10" />
      <AvatarMenu initials="CK" />
    </div>
  </nav>
</header>
```

Key behaviors (ported + extended):
- Transparent-ish on load → blurred dark glass on scroll (20px threshold).
- Active link gets `text-white` + a thin violet underline; inactive links `text-white/70`.
- **Notification bell / messages** use cyan accent on hover, with a violet/pink dot badge for unread counts.
- **Avatar** renders learner initials in a gradient ring; dropdown → Profile, My Courses, Sign out.
- Mobile: hamburger → slide-down panel with the same links + utility row.

---

## 5. Course Player Layout (the core screen)

Two-pane layout mirroring the sample: a collapsible **Course Menu** on the left, **lesson content** on the right.

```tsx
// CoursePlayerLayout.tsx
export function CoursePlayerLayout() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className="pt-16 min-h-screen bg-brand-bg">
      <div className="flex">
        {/* Course Menu sidebar */}
        <aside className={`transition-[width] duration-300 shrink-0 border-r border-white/5
                           bg-surface/60 backdrop-blur-xl
                           ${menuOpen ? "w-[300px]" : "w-0 overflow-hidden"}`}>
          <CourseMenu />
        </aside>

        {/* Content pane */}
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
            <button onClick={() => setMenuOpen(v => !v)}
              className="mb-4 text-white/50 hover:text-white transition-colors">
              {menuOpen ? <PanelLeftClose size={18}/> : <PanelLeftOpen size={18}/>}
            </button>
            <Outlet />   {/* LessonRenderer / Evaluation / Certificate */}
          </div>
        </main>
      </div>
    </div>
  );
}
```

---

## 6. Course Menu — Accordion with Progress Dots

This is the signature component from the sample: **Blocks** (collapsible) → **Modules / Tasks** (rows with completion dots).

```tsx
// CourseMenu.tsx
export function CourseMenu() {
  const { course } = useCourse();
  const { isComplete, currentLessonId } = useProgress();
  const [openBlocks, setOpenBlocks] = useState<Set<string>>(
    () => new Set(course.blocks.map(b => b.id))   // expanded by default, like the sample
  );

  return (
    <nav className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-4rem)]">
      <header className="px-1 pb-2">
        <h2 className="font-display text-lg text-white">Course Menu</h2>
        <ProgressBar value={course.percentComplete} className="mt-2" />
      </header>

      {course.blocks.map(block => {
        const open = openBlocks.has(block.id);
        return (
          <div key={block.id}
               className="rounded-xl border border-white/8 bg-surface-2/50 overflow-hidden">
            {/* Block header */}
            <button onClick={() => toggleBlock(block.id)}
              className="w-full flex items-center justify-between px-4 py-3
                         text-sm font-semibold text-white/90 hover:bg-white/[0.03]">
              <span className="truncate">{block.title}</span>
              <ChevronUp size={16}
                className={`shrink-0 transition-transform ${open ? "" : "rotate-180"}`} />
            </button>

            {/* Lessons */}
            {open && (
              <ul className="pb-2">
                {block.lessons.map(lesson => (
                  <MenuItem key={lesson.id}
                    lesson={lesson}
                    state={
                      isComplete(lesson.id) ? "done"
                      : lesson.id === currentLessonId ? "current"
                      : "todo"
                    } />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
```

```tsx
// MenuItem.tsx — single lesson row
export function MenuItem({ lesson, state }: MenuItemProps) {
  return (
    <li>
      <NavLink to={`/learn/${lesson.courseId}/${lesson.id}`}
        className={({isActive}) =>
          `flex items-center gap-2.5 px-4 py-2 text-sm transition-colors
           ${isActive ? "text-white bg-violet-500/10 border-l-2 border-violet-400"
                      : "text-white/60 hover:text-white/90 border-l-2 border-transparent"}`}>
        <ProgressDot state={state} />
        <span className="truncate">{lesson.title}</span>
      </NavLink>
    </li>
  );
}
```

```tsx
// ProgressDot.tsx — matches the green dots in the sample
const DOT = {
  done:    "bg-[var(--color-progress)]",          // emerald — completed
  current: "bg-[var(--color-in-progress)] animate-pulse", // amber — in progress
  todo:    "bg-[var(--color-locked)]",            // muted — not started
};
export const ProgressDot = ({ state }: { state: keyof typeof DOT }) =>
  <span className={`w-2 h-2 rounded-full shrink-0 ${DOT[state]}`} />;
```

---

## 7. Lesson Renderer

A single switchboard renders any lesson type. Matches the sample's mix of **Flyers/Instructions (downloads)**, **Modules (content)**, and **Tasks**.

```tsx
// LessonRenderer.tsx
export function LessonRenderer() {
  const lesson = useCurrentLesson();
  return (
    <article>
      <p className="text-xs uppercase tracking-wider text-violet-300/70 mb-1">
        {lesson.blockTitle}
      </p>
      <h1 className="font-display text-3xl text-white mb-6">{lesson.title}</h1>

      {lesson.type === "video"    && <VideoLesson    lesson={lesson} />}
      {lesson.type === "text"     && <TextLesson     lesson={lesson} />}
      {lesson.type === "download" && <DownloadLesson lesson={lesson} />}
      {lesson.type === "quiz"     && <Evaluation     lesson={lesson} />}

      <LessonNav lesson={lesson} />
    </article>
  );
}
```

```tsx
// LessonNav.tsx — Prev / Mark Complete / Next
export function LessonNav({ lesson }: { lesson: Lesson }) {
  const { markComplete, isComplete } = useProgress();
  const done = isComplete(lesson.id);
  return (
    <div className="mt-10 flex items-center justify-between border-t border-white/8 pt-6">
      <PrevButton lessonId={lesson.prevId} />
      <button onClick={() => markComplete(lesson.id)}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
          ${done
            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
            : "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90"}`}>
        {done ? "✓ Completed" : "Mark Complete"}
      </button>
      <NextButton lessonId={lesson.nextId} />
    </div>
  );
}
```

`DownloadLesson` renders attachment cards (the sample's "Flyer" / "Instructions to update your phone"):

```tsx
<GlassCard accent="cyan" className="flex items-center gap-4">
  <FileText className="text-cyan-300 shrink-0" />
  <div className="flex-1 min-w-0">
    <p className="text-white font-medium truncate">{file.name}</p>
    <p className="text-white/50 text-xs">{file.sizeLabel} · {file.ext.toUpperCase()}</p>
  </div>
  <a href={file.url} download
     className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white">
    Download
  </a>
</GlassCard>
```

---

## 8. Evaluation Engine (the rating-matrix screen)

Rebuilds the sample's "Course Evaluation" — numbered questions, a **1–5 rating matrix**, single-choice scales, and free-text.

```tsx
// Evaluation.tsx
export function Evaluation({ lesson }: { lesson: Lesson }) {
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const survey = lesson.survey!;

  return (
    <div>
      <h2 className="font-display text-2xl text-white mb-1">Course Evaluation</h2>
      <p className="text-white/40 text-sm mb-8 flex items-center gap-2">
        <Printer size={14}/> Respondent: <em>Anonymous</em>
      </p>

      {survey.questions.map((q, i) => (
        <section key={q.id} className="mb-8">
          <div className="flex gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0
                             bg-pink-400/15 text-pink-300 font-bold">
              {i + 1}{q.required && <sup className="text-red-400">*</sup>}
            </span>
            <div className="flex-1 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/15 px-4 py-3">
              <p className="text-white/90">{q.prompt}</p>
            </div>
          </div>

          <div className="mt-4 pl-11">
            {q.type === "rating-matrix" && (
              <RatingMatrix q={q}
                value={answers[q.id] as MatrixValue}
                onChange={v => setAnswers(a => ({ ...a, [q.id]: v }))} />
            )}
            {q.type === "single-scale" && (
              <SingleChoice q={q}
                value={answers[q.id] as number}
                onChange={v => setAnswers(a => ({ ...a, [q.id]: v }))} />
            )}
            {q.type === "free-text" && (
              <FreeText
                value={answers[q.id] as string}
                onChange={v => setAnswers(a => ({ ...a, [q.id]: v }))} />
            )}
          </div>
        </section>
      ))}

      <SubmitEvaluation answers={answers} lessonId={lesson.id} />
    </div>
  );
}
```

```tsx
// RatingMatrix.tsx — the 1..5 grid of radio rows
export function RatingMatrix({ q, value = {}, onChange }: MatrixProps) {
  const scale = [1, 2, 3, 4, 5];
  return (
    <div className="overflow-x-auto rounded-xl border border-white/8">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/[0.03] text-white/50">
            <th className="text-left px-3 py-2 font-normal">{q.scaleHint}</th>
            {scale.map(n => <th key={n} className="px-3 py-2 font-medium">{n}</th>)}
          </tr>
        </thead>
        <tbody>
          {q.rows.map(row => (
            <tr key={row.id} className="border-t border-white/5">
              <td className="px-3 py-3 text-white/75">{row.label}</td>
              {scale.map(n => (
                <td key={n} className="text-center">
                  <button
                    onClick={() => onChange({ ...value, [row.id]: n })}
                    aria-label={`${row.label}: ${n}`}
                    className={`w-5 h-5 rounded-full border-2 transition-all
                      ${value[row.id] === n
                        ? "border-violet-400 bg-violet-500 shadow-[0_0_10px] shadow-violet-500/50"
                        : "border-white/25 hover:border-violet-400/60"}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

The 1–5 scales (`not useful → very useful`, `very unlikely → very likely`) and the free-text "What do you suggest…" question from the sample are all expressed through these three primitives — no bespoke markup per survey.

---

## 9. Dashboard & Catalog

**Dashboard** = enrolled courses as glass cards with progress rings, plus a "Continue learning" hero.

```tsx
<GlassCard accent="violet" className="group cursor-pointer">
  <div className="flex items-start justify-between">
    <Badge>{course.category}</Badge>
    <ProgressRing percent={course.percentComplete} />  {/* SVG ring, violet→cyan gradient */}
  </div>
  <h3 className="font-display text-xl text-white mt-4 group-hover:text-violet-300 transition-colors">
    {course.title}
  </h3>
  <p className="text-white/55 text-sm mt-1 line-clamp-2">{course.summary}</p>
  <div className="mt-5 flex items-center gap-2 text-sm text-cyan-300">
    Continue <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
  </div>
</GlassCard>
```

- **Continue card** deep-links straight to the first incomplete lesson.
- **Catalog** reuses the same card, swapping the progress ring for an **Enroll** action.
- Optional decorative glow orbs (`animate-pulse-soft`) behind the dashboard hero, exactly as NeuraFlow uses them.

---

## 10. Certificate

Gated behind course + evaluation completion. Rendered as an on-brand dark certificate with a violet→cyan gradient border, learner name, course title, and date; exportable to PNG/PDF via `html-to-image` or `@react-pdf/renderer`.

```tsx
<RequireCourseComplete courseId={courseId}>
  <Certificate
    learnerName={learner.fullName}
    courseTitle={course.title}
    completedAt={progress.completedAt}
    onDownload={() => exportCertificate(ref.current)} />
</RequireCourseComplete>
```

---

## 11. Data Model

TypeScript schema (`data/schema.ts`) — Airtable-friendly, normalized into Courses → Blocks → Lessons.

```ts
type LessonType = "text" | "video" | "download" | "quiz";

interface Course {
  id: string;
  title: string;
  summary: string;
  category: string;          // e.g. "Digital Skills"
  blocks: Block[];
  percentComplete: number;   // derived per-learner, not stored on the course
}

interface Block {
  id: string;
  title: string;             // "Block 2: Building an online presence"
  order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  courseId: string;
  blockId: string;
  blockTitle: string;
  title: string;             // "Module 2", "Task 2: Building an Online Presence"
  type: LessonType;
  order: number;
  body?: string;             // markdown/html for text lessons
  mediaUrl?: string;         // video lessons
  files?: Attachment[];      // download lessons (flyers, instructions)
  survey?: Survey;           // quiz lessons
  prevId?: string;
  nextId?: string;
}

interface Survey {
  questions: Question[];
}
type Question =
  | { id: string; type: "rating-matrix"; prompt: string; required: boolean;
      scaleHint: string; rows: { id: string; label: string }[] }
  | { id: string; type: "single-scale"; prompt: string; required: boolean; max: number }
  | { id: string; type: "free-text"; prompt: string; required: boolean };
```

### Airtable tables (via proxy)

| Table | Key fields |
|---|---|
| `Courses` | `Title`, `Summary`, `Category`, `Published` |
| `Blocks` | `Title`, `Order`, `Course` (link) |
| `Lessons` | `Title`, `Type`, `Order`, `Block` (link), `Body`, `MediaURL`, `Files` |
| `Enrollments` | `Learner` (link), `Course` (link), `EnrolledAt` |
| `Progress` | `Learner`, `Lesson`, `Status` (`done`), `CompletedAt` |
| `Evaluations` | `Learner`, `Course`, `Answers` (JSON), `SubmittedAt` |

> **Security note (carried over from NeuraFlow v1.6+):** the browser never holds the Airtable token. All reads/writes go through an n8n webhook or Netlify Function that injects credentials server-side.

---

## 12. Progress Tracking (state pattern)

Optimistic-local, synced to backend — so the green dots flip instantly.

```tsx
// ProgressContext.tsx (sketch)
function markComplete(lessonId: string) {
  setDone(prev => new Set(prev).add(lessonId));   // optimistic — dot turns emerald now
  localStorage.setItem(KEY, serialize(done));     // resilience across reloads
  api.post("/progress", { lessonId, status: "done" }).catch(rollback);
}

const isCourseComplete = (courseId: string) =>
  course.blocks.every(b => b.lessons.every(l => done.has(l.id)));

const percentComplete = (course: Course) => {
  const total = course.blocks.flatMap(b => b.lessons).length;
  const done  = course.blocks.flatMap(b => b.lessons).filter(l => isComplete(l.id)).length;
  return total ? Math.round((done / total) * 100) : 0;
};
```

---

## 13. Build & Deploy

```toml
# netlify.toml
[build]
  command = "npx vite build"
  publish = "dist"

# SPA fallback so deep links like /learn/abc/xyz resolve
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

```json
// package.json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.26.0",
    "lucide-react": "^0.474.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.0"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

Install: `npm install` · Dev: `npm run dev` · Build: `npx vite build`

---

## 14. Build Checklist

### Design (port from NeuraFlow — do first)
- [ ] Copy `@theme` tokens into `index.css`; add the learning semantic tokens (surface, progress, in-progress, locked)
- [ ] Add Inter + Syne to `index.html`
- [ ] Port `float` / `pulse-soft` / `marquee` keyframes and `::selection`
- [ ] Build `GlassCard`, `Button`, `Badge`, `ProgressBar`, `ProgressRing` primitives

### Shell & navigation
- [ ] `AppShell` + ported scroll-aware `Navbar` with center links + notification/messages/avatar cluster
- [ ] `react-router-dom` route tree with `RequireAuth` + `RequireCourseComplete` guards

### Course player (core)
- [ ] `CoursePlayerLayout` two-pane shell with collapsible sidebar
- [ ] `CourseMenu` accordion (blocks expanded by default) + `MenuItem` + `ProgressDot`
- [ ] `LessonRenderer` switchboard + `Text` / `Video` / `Download` lesson views
- [ ] `LessonNav` (Prev / Mark Complete / Next)

### Evaluation
- [ ] `Evaluation` numbered-question layout
- [ ] `RatingMatrix` (1–5 grid), `SingleChoice`, `FreeText`
- [ ] Submit → `Evaluations` table via proxy

### Dashboard / catalog / certificate
- [ ] Dashboard with enrolled `CourseCard`s + Continue card
- [ ] Catalog browse + enroll
- [ ] Gated `Certificate` with PNG/PDF export

### Data & state
- [ ] Define `schema.ts` types
- [ ] Stand up Airtable tables + n8n/Netlify proxy (token server-side only)
- [ ] `ProgressContext` with optimistic update + localStorage mirror + backend sync
- [ ] `AuthContext` (magic-link or Supabase)

### Deploy
- [ ] `netlify.toml` with SPA redirect
- [ ] Env vars for proxy webhook URL + auth keys (never the Airtable token in the bundle)

---

## 15. What was deliberately dropped from the NeuraFlow plan

To keep this a learning platform and not a sales site, these NeuraFlow systems are **not** carried over: the global CTA click-intercept + `bookingTriggers`, the booking/pricing/sales modals, the floating AI chat widget (Nova) and its n8n conversational lead workflow, and the conversion-funnel section ordering. The **visual design language is the only thing inherited** — exactly as requested.
