import type { Lesson } from "../../data/schema";

interface VideoLessonProps {
  lesson: Lesson;
}

function isYouTube(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function isVimeo(url: string) {
  return url.includes("vimeo.com");
}

function youtubeEmbedUrl(url: string) {
  const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

function vimeoEmbedUrl(url: string) {
  const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
  return id ? `https://player.vimeo.com/video/${id}` : url;
}

export function VideoLesson({ lesson }: VideoLessonProps) {
  const url = lesson.mediaUrl ?? "";

  if (isYouTube(url) || isVimeo(url)) {
    const embed = isYouTube(url) ? youtubeEmbedUrl(url) : vimeoEmbedUrl(url);
    return (
      <div className="aspect-video rounded-xl overflow-hidden border border-white/10 mb-6">
        <iframe
          src={embed}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={lesson.title}
        />
      </div>
    );
  }

  return (
    <video
      src={url}
      controls
      className="w-full rounded-xl border border-white/10 mb-6"
    />
  );
}
