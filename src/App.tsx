import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import { AppShell } from "./layouts/AppShell";
import { CoursePlayerLayout } from "./layouts/CoursePlayerLayout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CatalogPage } from "./pages/CatalogPage";
import { NewsPage } from "./pages/NewsPage";
import { AboutPage } from "./pages/AboutPage";
import { CoursePage } from "./pages/CoursePage";
import { CertificatePage } from "./pages/CertificatePage";
import { LessonRenderer } from "./components/lesson/LessonRenderer";
import { Evaluation } from "./components/eval/Evaluation";
import { FullPageSkeleton } from "./components/ui/Skeleton";
import { NotFoundPage } from "./pages/NotFoundPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { learner, loading } = useAuth();
  if (loading) return <FullPageSkeleton />;
  if (!learner) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public shell */}
      <Route element={<AppShell />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="about" element={<AboutPage />} />

        {/* Protected shell routes */}
        <Route path="dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      </Route>

      {/* Course player (own layout, no AppShell) */}
      <Route
        path="learn/:courseId"
        element={<RequireAuth><CoursePlayerLayout /></RequireAuth>}
      >
        <Route index element={<CoursePage />} />
        <Route path=":lessonId" element={<LessonRenderer />} />
        <Route path="certificate" element={<CertificatePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <AppRoutes />
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
