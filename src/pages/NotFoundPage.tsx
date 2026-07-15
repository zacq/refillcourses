import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-7xl font-display font-bold text-cream/10 mb-4">404</p>
      <h1 className="font-display text-2xl text-cream mb-2">Page not found</h1>
      <p className="text-dim text-sm mb-6">This page doesn't exist or was moved.</p>
      <Button variant="ghost" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
    </div>
  );
}
