import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-soft pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative text-center px-4 max-w-3xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/30 mb-6">
          Self-Paced Learning Platform
        </span>
        <h1 className="font-display text-5xl md:text-6xl text-white leading-tight mb-6">
          Learn at your<br />
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            own pace
          </span>
        </h1>
        <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
          Structured programmes, bite-sized lessons, and progress that sticks — all in one place.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={() => navigate("/catalog")}>Browse Programmes</Button>
          <Button variant="ghost" onClick={() => navigate("/login")}>Sign in</Button>
        </div>
      </div>
    </div>
  );
}
