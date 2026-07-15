import { useRef } from "react";
import { Download, Award } from "lucide-react";
import { Button } from "../ui/Button";

interface CertificateProps {
  learnerName: string;
  courseTitle: string;
  completedAt: string;
}

export function Certificate({ learnerName, courseTitle, completedAt }: CertificateProps) {
  const ref = useRef<HTMLDivElement>(null);

  async function handleDownload() {
    const { toPng } = await import("html-to-image");
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, { pixelRatio: 2 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `certificate-${courseTitle.replace(/\s+/g, "-")}.png`;
    a.click();
  }

  const date = new Date(completedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Certificate panel */}
      <div
        ref={ref}
        className="w-full max-w-2xl rounded-2xl p-px bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent"
      >
        <div className="rounded-2xl bg-gradient-to-br from-brand-primary/8 via-surface to-brand-accent/8 px-10 py-12 text-center">
          <Award className="mx-auto mb-4 text-brand-primary" size={48} />
          <p className="text-xs uppercase tracking-widest text-brand-primary/70 mb-2">Certificate of Completion</p>
          <p className="text-dim text-sm mb-4">This certifies that</p>
          <h2 className="font-display text-4xl text-cream mb-4">{learnerName}</h2>
          <p className="text-dim text-sm mb-2">has successfully completed</p>
          <h3 className="font-display text-2xl text-brand-accent mb-6">{courseTitle}</h3>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent mx-auto mb-4" />
          <p className="text-dim text-sm">Issued on {date}</p>
          <p className="text-dim/70 text-xs mt-1">RefillCourses.com</p>
        </div>
      </div>

      <Button onClick={handleDownload} variant="ghost" className="flex items-center gap-2">
        <Download size={15} /> Download Certificate
      </Button>
    </div>
  );
}
