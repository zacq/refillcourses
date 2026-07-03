import { useOutletContext, useParams, Navigate } from "react-router-dom";
import { Certificate } from "../components/certificate/Certificate";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import type { Course } from "../data/schema";

interface OutletContext {
  course: Course;
}

export function CertificatePage() {
  const { course } = useOutletContext<OutletContext>();
  const { learner } = useAuth();
  const { isCourseComplete, evaluationSubmitted } = useProgress();
  const { courseId } = useParams<{ courseId: string }>();

  if (!isCourseComplete(course) || !evaluationSubmitted.has(courseId!)) {
    return <Navigate to={`/learn/${courseId}`} replace />;
  }

  const completedAt = new Date().toISOString();

  return (
    <div className="py-6">
      <Certificate
        learnerName={learner?.fullName ?? "Learner"}
        courseTitle={course.title}
        completedAt={completedAt}
      />
    </div>
  );
}
