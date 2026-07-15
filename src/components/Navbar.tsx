import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NotificationBell } from "./nav/NotificationBell";
import { MessagesButton } from "./nav/MessagesButton";
import { AvatarMenu } from "./nav/AvatarMenu";

const NAV_LINKS = [
  { label: "Home",        to: "/" },
  { label: "Dashboard",   to: "/dashboard" },
  { label: "Programmes",  to: "/catalog" },
  { label: "News",        to: "/news" },
  { label: "About",       to: "/about" },
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
        ? "bg-brand-bg/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-2"
        : "bg-brand-bg/40 backdrop-blur-md py-3"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="font-display font-bold text-xl text-white tracking-tight">
          Refill<span className="text-brand-primary">Courses</span>
        </NavLink>

        {/* Desktop center links */}
        <ul className="hidden md:flex items-center gap-7 text-sm text-white/70">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `transition-colors relative pb-0.5 ${
                    isActive
                      ? "text-white after:absolute after:bottom-0 after:inset-x-0 after:h-px after:bg-brand-primary"
                      : "hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right utility cluster */}
        <div className="flex items-center gap-1">
          <NotificationBell count={2} />
          <MessagesButton />
          <span className="w-px h-5 bg-white/10 mx-1" />
          <AvatarMenu />

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-2 p-2 text-white/50 hover:text-white transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-bg/95 backdrop-blur-2xl border-t border-white/5 px-4 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "text-white bg-brand-primary/10"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`
                  }
                >
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
