import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, User, BookOpen } from "lucide-react";

export function AvatarMenu() {
  const { learner, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = learner?.initials ?? "?";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary
                   flex items-center justify-center text-white text-sm font-bold
                   ring-2 ring-cream/10 hover:ring-brand-primary/50 transition-all"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-surface-border
                        bg-surface shadow-xl overflow-hidden z-50">
          <div className="px-3 py-2 border-b border-surface-border">
            <p className="text-xs text-dim">Signed in as</p>
            <p className="text-sm text-cream/80 truncate">{learner?.email}</p>
          </div>
          {[
            { icon: User,     label: "Profile",    path: "/profile" },
            { icon: BookOpen, label: "My Courses", path: "/dashboard" },
          ].map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              onClick={() => { setOpen(false); navigate(path); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-cream/70
                         hover:bg-cream/[0.06] hover:text-cream transition-colors"
            >
              <Icon size={15} /> {label}
            </button>
          ))}
          <div className="border-t border-surface-border">
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-400
                         hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
