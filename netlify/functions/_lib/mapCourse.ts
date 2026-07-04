import type { AirtableRecord } from "./airtable";

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function buildCourse(
  courseRow: AirtableRecord,
  allBlocks: AirtableRecord[],
  allLessons: AirtableRecord[]
) {
  const courseBlocks = allBlocks
    .filter(b => (b.fields.Course ?? [])[0] === courseRow.id)
    .sort((a, b) => (a.fields.Order ?? 0) - (b.fields.Order ?? 0));

  const flatEntries = courseBlocks.flatMap(block => {
    const blockLessons = allLessons
      .filter(l => (l.fields.Block ?? [])[0] === block.id)
      .sort((a, b) => (a.fields.Order ?? 0) - (b.fields.Order ?? 0));
    return blockLessons.map(lesson => ({ lesson, block }));
  });

  const mappedLessons = flatEntries.map(({ lesson, block }, idx) => {
    const files = (lesson.fields.Files ?? []).map((f: any) => ({
      id: f.id,
      name: f.filename,
      url: f.url,
      ext: (f.filename?.split(".").pop() ?? "").toLowerCase(),
      sizeLabel: formatSize(f.size),
    }));

    return {
      id: lesson.id,
      courseId: courseRow.fields.Slug,
      blockId: block.id,
      blockTitle: block.fields.Title,
      title: lesson.fields.Title,
      type: lesson.fields.Type,
      order: lesson.fields.Order,
      body: lesson.fields.Body,
      mediaUrl: lesson.fields["Media URL"],
      files: files.length ? files : undefined,
      survey: lesson.fields["Survey JSON"] ? JSON.parse(lesson.fields["Survey JSON"]) : undefined,
      prevId: idx > 0 ? flatEntries[idx - 1].lesson.id : undefined,
      nextId: idx < flatEntries.length - 1 ? flatEntries[idx + 1].lesson.id : undefined,
    };
  });

  const blocks = courseBlocks.map(block => ({
    id: block.id,
    title: block.fields.Title,
    order: block.fields.Order,
    lessons: mappedLessons.filter(l => l.blockId === block.id),
  }));

  return {
    id: courseRow.fields.Slug,
    title: courseRow.fields.Title,
    summary: courseRow.fields.Summary,
    category: courseRow.fields.Category,
    blocks,
    percentComplete: 0,
  };
}
