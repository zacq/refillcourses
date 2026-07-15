import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email);
      navigate("/dashboard");
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-cream">Welcome back</h1>
          <p className="text-dim text-sm mt-2">Sign in to continue learning</p>
        </div>

        <GlassCard accent="violet">
          {sent ? (
            <div className="text-center py-4">
              <p className="text-cream/80">Check your email for the sign-in link.</p>
              <p className="text-dim text-sm mt-2">{email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-dim mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-surface-border bg-cream/[0.03] px-4 py-2.5
                             text-sm text-cream placeholder:text-dim/50
                             focus:outline-none focus:border-brand-primary/50 transition-all"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending…" : "Continue with Email"}
              </Button>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
