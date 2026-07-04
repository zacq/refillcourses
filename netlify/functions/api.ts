import { listAll, findByFormula, createRecord, updateRecord, escapeFormula } from "./_lib/airtable";
import { buildCourse } from "./_lib/mapCourse";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

export default async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api/, "") || "/";
  const method = req.method;

  if (method === "OPTIONS") return json({});

  try {
    if (method === "GET" && path === "/courses") {
      const [courses, blocks, lessons] = await Promise.all([
        listAll("Courses"), listAll("Blocks"), listAll("Lessons"),
      ]);
      const published = courses.filter(c => c.fields.Published);
      return json(published.map(c => buildCourse(c, blocks, lessons)));
    }

    const courseMatch = path.match(/^\/courses\/([^/]+)$/);
    if (method === "GET" && courseMatch) {
      const slug = decodeURIComponent(courseMatch[1]);
      const [courses, blocks, lessons] = await Promise.all([
        listAll("Courses"), listAll("Blocks"), listAll("Lessons"),
      ]);
      const courseRow = courses.find(c => c.fields.Slug === slug);
      if (!courseRow) return json({ error: "Course not found" }, 404);
      return json(buildCourse(courseRow, blocks, lessons));
    }

    const enrolledMatch = path.match(/^\/enrollments\/([^/]+)\/courses$/);
    if (method === "GET" && enrolledMatch) {
      const email = decodeURIComponent(enrolledMatch[1]);
      const [courses, blocks, lessons, enrollments, progress] = await Promise.all([
        listAll("Courses"), listAll("Blocks"), listAll("Lessons"),
        listAll("Enrollments"), listAll("Progress"),
      ]);
      const myEnrollments = enrollments.filter(e => e.fields["Learner Email"] === email);
      const myDone = new Set(
        progress
          .filter(p => p.fields["Learner Email"] === email && p.fields.Status === "done")
          .map(p => (p.fields.Lesson ?? [])[0])
      );
      const result = myEnrollments
        .map(e => {
          const courseId = (e.fields.Course ?? [])[0];
          const courseRow = courses.find(c => c.id === courseId);
          if (!courseRow) return null;
          const course = buildCourse(courseRow, blocks, lessons);
          const allLessonIds = course.blocks.flatMap(b => b.lessons.map(l => l.id));
          const doneCount = allLessonIds.filter(id => myDone.has(id)).length;
          course.percentComplete = allLessonIds.length
            ? Math.round((doneCount / allLessonIds.length) * 100)
            : 0;
          return course;
        })
        .filter(Boolean);
      return json(result);
    }

    if (method === "POST" && path === "/enrollments") {
      const { courseId, learnerId, learnerName } = (await req.json()) as {
        courseId: string; learnerId: string; learnerName?: string;
      };
      const courses = await listAll("Courses");
      const courseRow = courses.find(c => c.fields.Slug === courseId);
      if (!courseRow) return json({ error: "Course not found" }, 404);

      const existing = await findByFormula(
        "Enrollments",
        `AND({Learner Email} = "${escapeFormula(learnerId)}", FIND("${escapeFormula(courseRow.fields.Title)}", ARRAYJOIN({Course})))`
      );
      if (!existing) {
        await createRecord("Enrollments", {
          Enrollment: `${learnerId} · ${courseRow.fields.Title}`,
          "Learner Email": learnerId,
          "Learner Name": learnerName ?? "",
          Course: [courseRow.id],
          "Enrolled At": new Date().toISOString().slice(0, 10),
          Status: "active",
        });
      }
      return json({ ok: true });
    }

    if (method === "POST" && path === "/progress") {
      const { lessonId, status, learnerId } = (await req.json()) as {
        lessonId: string; status: string; learnerId?: string;
      };
      if (!learnerId) return json({ error: "learnerId required" }, 400);

      const [lessons, blocks] = await Promise.all([listAll("Lessons"), listAll("Blocks")]);
      const lessonRow = lessons.find(l => l.id === lessonId);
      const blockId = (lessonRow?.fields.Block ?? [])[0];
      const blockRow = blocks.find(b => b.id === blockId);
      const courseRecId = (blockRow?.fields.Course ?? [])[0];

      const key = `${learnerId}:${lessonId}`;
      const fields: Record<string, unknown> = {
        Key: key,
        "Learner Email": learnerId,
        Lesson: [lessonId],
        Status: status,
        "Completed At": new Date().toISOString().slice(0, 10),
      };
      if (courseRecId) fields.Course = [courseRecId];

      const existing = await findByFormula("Progress", `{Key} = "${escapeFormula(key)}"`);
      if (existing) await updateRecord("Progress", existing.id, fields);
      else await createRecord("Progress", fields);
      return json({ ok: true });
    }

    if (method === "POST" && path === "/evaluations") {
      const { courseId, answers, learnerId } = (await req.json()) as {
        courseId: string; answers: unknown; learnerId?: string;
      };
      if (!learnerId) return json({ error: "learnerId required" }, 400);

      const [courses, existingEvals] = await Promise.all([listAll("Courses"), listAll("Evaluations")]);
      const courseRow = courses.find(c => c.fields.Slug === courseId);
      await createRecord("Evaluations", {
        Submission: existingEvals.length + 1,
        "Learner Email": learnerId,
        Course: courseRow ? [courseRow.id] : undefined,
        "Answers JSON": JSON.stringify(answers),
        "Submitted At": new Date().toISOString().slice(0, 10),
      });
      return json({ ok: true });
    }

    if (method === "POST" && path === "/auth/magic-link") {
      const { email } = (await req.json()) as { email: string };
      const namePart = email.split("@")[0];
      const fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[._]/g, " ");
      const initials = fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
      return json({ id: email, fullName, email, initials });
    }

    return json({ error: "Not found" }, 404);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
};

export const config = { path: "/api/*" };
