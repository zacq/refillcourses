import { FileText } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import type { Lesson } from "../../data/schema";

interface DownloadLessonProps {
  lesson: Lesson;
}

export function DownloadLesson({ lesson }: DownloadLessonProps) {
  const files = lesson.files ?? [];

  return (
    <div className="space-y-3">
      {files.map(file => (
        <GlassCard key={file.id} accent="cyan" className="flex items-center gap-4 p-4">
          <FileText className="text-brand-secondary shrink-0" size={24} />
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{file.name}</p>
            <p className="text-white/50 text-xs mt-0.5">
              {file.sizeLabel} · {file.ext.toUpperCase()}
            </p>
          </div>
          <a
            href={file.url}
            download
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white transition-colors shrink-0"
          >
            Download
          </a>
        </GlassCard>
      ))}
      {files.length === 0 && (
        <p className="text-white/40 text-sm">No files attached to this lesson.</p>
      )}
    </div>
  );
}
