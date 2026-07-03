# RefillCourses — Airtable Base Schema (Importable Spec)

This base backs the self-paced platform. It is read/written **only through a server-side proxy** (n8n webhook or Netlify Function) — the Airtable token never ships in the frontend bundle, per the implementation plan.

Six tables, normalized: **Courses → Blocks → Lessons**, plus **Enrollments**, **Progress**, and **Evaluations** keyed to a learner.

---

## How to create the base

**Fast path (CSV import):** In Airtable, create a new base → for each table, *Add a table → Import data → CSV* and upload the matching file from `airtable_seed/`. Airtable infers most field types from the data. Then fix up the field types and links per the tables below (CSV import can't create link fields automatically — see *Linking* at the bottom).

**Clean path (manual):** Create each table and field by hand using the specs below, then import only the seed rows you want.

---

## Table 1 — `Courses`

| Field | Type | Notes |
|---|---|---|
| `Title` | Single line text | **Primary field**. e.g. "Building a Digital Business" |
| `Slug` | Single line text | URL id, e.g. `digital-business` |
| `Summary` | Long text | Catalog/dashboard description |
| `Category` | Single select | e.g. Digital Skills, Finance, Marketing |
| `Published` | Checkbox | Hidden from catalog until checked |
| `Blocks` | Link → `Blocks` | One-to-many (set up after import) |
| `Cover Image` | Attachment | Optional catalog art |
| `Created` | Created time | Auto |

## Table 2 — `Blocks`

| Field | Type | Notes |
|---|---|---|
| `Title` | Single line text | **Primary**. e.g. "Block 2: Building an Online Presence" |
| `Order` | Number (integer) | Display order within the course |
| `Course` | Link → `Courses` | The parent course |
| `Lessons` | Link → `Lessons` | One-to-many (set up after import) |

## Table 3 — `Lessons`

| Field | Type | Notes |
|---|---|---|
| `Title` | Single line text | **Primary**. e.g. "Module 1: Why Digitalize?" |
| `Type` | Single select | `text` · `video` · `download` · `quiz` |
| `Order` | Number (integer) | Display order within the block |
| `Block` | Link → `Blocks` | Parent block |
| `Body` | Long text (rich/markdown) | For `text` lessons |
| `Media URL` | URL | For `video` lessons |
| `Files` | Attachment | For `download` lessons (flyers, guides) |
| `Survey JSON` | Long text | For `quiz` lessons — survey definition as JSON (see schema below) |

## Table 4 — `Enrollments`

| Field | Type | Notes |
|---|---|---|
| `Enrollment` | Formula or autonumber | **Primary**, e.g. `{Learner Email} & " · " & {Course}` |
| `Learner Email` | Email | Identifies the learner |
| `Learner Name` | Single line text | |
| `Course` | Link → `Courses` | |
| `Enrolled At` | Date | |
| `Status` | Single select | `active` · `completed` · `dropped` |

## Table 5 — `Progress`

One row per completed lesson per learner.

| Field | Type | Notes |
|---|---|---|
| `Key` | Single line text | **Primary**. `{email}:{lessonId}` — guarantees uniqueness |
| `Learner Email` | Email | |
| `Lesson` | Link → `Lessons` | |
| `Course` | Link → `Courses` | Denormalized for fast % queries |
| `Status` | Single select | `done` (extend later: `in-progress`) |
| `Completed At` | Date | |

## Table 6 — `Evaluations`

One row per submitted course evaluation.

| Field | Type | Notes |
|---|---|---|
| `Submission` | Autonumber | **Primary** |
| `Learner Email` | Email | |
| `Course` | Link → `Courses` | |
| `Answers JSON` | Long text | Full answer payload as JSON |
| `Submitted At` | Date | |

---

## `Survey JSON` shape (for `quiz` lessons)

Stored in the `Survey JSON` field; the `Evaluation` component renders straight from it.

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "rating-matrix",
      "required": true,
      "prompt": "How useful were the following parts of the training? 1 = not useful, 5 = very useful.",
      "scaleHint": "Rate each part 1–5",
      "rows": [
        { "id": "r1", "label": "How useful were the training modules?" },
        { "id": "r2", "label": "How useful was the support from your trainer?" },
        { "id": "r3", "label": "How useful was the training and coaching overall?" }
      ]
    },
    { "id": "q2", "type": "single-scale", "required": true, "max": 5,
      "prompt": "Will you use what you learned? 1 = very unlikely, 5 = very likely.",
      "rowLabel": "How likely are you to use the knowledge and skills acquired?" },
    { "id": "q3", "type": "free-text", "required": true,
      "prompt": "What do you suggest we do to further improve the programme?" }
  ]
}
```

## `Answers JSON` shape (written to `Evaluations`)

```json
{
  "q1": { "r1": 4, "r2": 5, "r3": 4 },
  "q2": 5,
  "q3": "Very relevant program."
}
```

---

## Proxy endpoints (server-side, token stays here)

| Method | Route | Reads/Writes |
|---|---|---|
| GET  | `/api/courses` | `Courses` where `Published` |
| GET  | `/api/courses/:slug` | One course + nested `Blocks` + `Lessons` |
| GET  | `/api/progress?email=` | All `Progress` rows for a learner |
| POST | `/api/progress` | Upsert a `Progress` row (`Key = email:lessonId`) |
| POST | `/api/evaluations` | Create an `Evaluations` row |
| POST | `/api/enroll` | Create an `Enrollments` row |

Course completion % is computed by the proxy: `count(Progress where status=done & course) / count(Lessons in course)`.

---

## Linking (after CSV import)

CSV import creates the tables and text columns but **not** the relationships. After importing:

1. In `Blocks`, change `Course` to a **Link to another record → Courses**. Airtable matches each cell's text to the matching `Courses.Title`.
2. In `Lessons`, change `Block` to a **Link → Blocks**.
3. In `Progress` / `Enrollments` / `Evaluations`, change `Course` (and `Lesson`) cells to **Link** fields the same way.
4. Add the reverse link fields (`Courses.Blocks`, `Blocks.Lessons`) — Airtable creates these automatically when you make the forward link.

The seed CSVs use the **primary-field text** (e.g. the course title) in link columns so this matching works on import.
