import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sprout, BookOpen, GraduationCap, LayoutGrid, Award } from "lucide-react";
import { NotificationBell } from "./nav/NotificationBell";
import { MessagesButton } from "./nav/MessagesButton";
import { AvatarMenu } from "./nav/AvatarMenu";

const NAV_LINKS = [
  { label: "Awareness",  to: "/",           end: true,  icon: BookOpen },
  { label: "Programs",   to: "/catalog",    end: false, icon: GraduationCap },
  { label: "Dashboard",  to: "/dashboard",  end: false, icon: LayoutGrid },
  { label: "Certificate", to: "/dashboard", end: false, icon: Award },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-brand-bg/90 backdrop-blur-2xl border-b border-cream/10 shadow-sm py-2"
        : "bg-brand-bg/60 backdrop-blur-md py-3"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shrink-0">
            <Sprout size={18} className="text-white" />
          </span>
          <span>
            <span className="font-display font-bold text-lg text-cream tracking-tight block leading-none">
              Refill<span className="text-brand-primary">Courses</span>
            </span>
            <span className="font-mono text-[.6rem] tracking-[.24em] text-dim uppercase block mt-1">
              Seed of Power
            </span>
          </span>
        </NavLink>

        {/* Desktop center links */}
        <ul className="hidden md:flex items-center gap-1.5 text-sm">
          {NAV_LINKS.map(({ label, to, end, icon: Icon }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-[0_4px_16px_rgba(204,85,0,.3)]"
                      : "text-dim hover:text-cream hover:bg-cream/[0.05]"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right utility cluster */}
        <div className="flex items-center gap-1">
          <NotificationBell count={2} />
          <MessagesButton />
          <span className="w-px h-5 bg-cream/10 mx-1" />
          <AvatarMenu />

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-2 p-2 text-dim hover:text-cream transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-bg/95 backdrop-blur-2xl border-t border-cream/10 px-4 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ label, to, end, icon: Icon }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "text-white bg-gradient-to-r from-brand-primary to-brand-accent"
                        : "text-cream/60 hover:text-cream hover:bg-cream/[0.04]"
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
