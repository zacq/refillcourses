import { useNavigate } from "react-router-dom";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import type { Course } from "../../data/schema";

interface CatalogCardProps {
  course: Course;
  enrolled?: boolean;
}

export function CatalogCard({ course, enrolled = false }: CatalogCardProps) {
  const { learner } = useAuth();
  const navigate = useNavigate();

  async function handleEnroll() {
    if (!learner) { navigate("/login"); return; }
    await api.post("/enrollments", { courseId: course.id, learnerId: learner.id, learnerName: learner.fullName });
    navigate(`/learn/${course.id}`);
  }

  return (
    <GlassCard accent="plain" className="flex flex-col">
      <Badge color="cyan" className="self-start">{course.category}</Badge>
      <h3 className="font-display text-xl text-white mt-4 line-clamp-2">{course.title}</h3>
      <p className="text-white/55 text-sm mt-1 line-clamp-3 flex-1">{course.summary}</p>
      <div className="mt-5">
        {enrolled ? (
          <Button variant="ghost" onClick={() => navigate(`/learn/${course.id}`)}>
            Continue
          </Button>
        ) : (
          <Button onClick={handleEnroll}>Enroll Now</Button>
        )}
      </div>
    </GlassCard>
  );
}
