import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpenIcon,
  SettingsIcon,
  KeyboardIcon,
  LayoutDashboardIcon,
  StickyNoteIcon,
  PlusIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useShortcutsModal } from "../context/ShortcutsModalContext";
import { getInitials } from "../lib/utils";

const NavBar = () => {
  const { user } = useAuth();
  const { open } = useShortcutsModal();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const desktopLinkClass = (path) =>
    `btn btn-ghost btn-sm gap-2 ${
      isActive(path) ? "text-primary bg-primary/10" : "text-ink-muted hover:text-base-content"
    }`;

  const mobileIconClass = (path) =>
    `btn btn-ghost btn-sm btn-circle ${
      isActive(path) ? "text-primary bg-primary/15" : "text-ink-muted"
    }`;

  return (
    <>
    <div className="sticky top-4 z-50 hidden sm:flex justify-center px-6">
      <div className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-full glass-panel-strong glass-highlight shadow-glass-lg w-full max-w-3xl">
        <Link to="/" className="flex items-center gap-2 group shrink-0 mr-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 ring-1 ring-primary/20 group-hover:bg-primary/25 transition-colors duration-200">
            <BookOpenIcon className="w-4 h-4 text-primary" strokeWidth={2} />
          </div>
          <span className="text-lg font-bold font-mono tracking-tight text-base-content">
            Think<span className="text-primary">Board</span>
          </span>
        </Link>

        {user && (
          <nav className="flex items-center gap-1 flex-1" aria-label="Primary">
            <Link to="/" className={desktopLinkClass("/")}>
              <LayoutDashboardIcon className="w-4 h-4" />
              Dashboard
            </Link>
            <Link to="/notes" className={desktopLinkClass("/notes")}>
              <StickyNoteIcon className="w-4 h-4" />
              Notes
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2 shrink-0">
          {user && (
            <>
              <button
                onClick={open}
                className="btn btn-ghost btn-sm btn-circle"
                title="Keyboard shortcuts (Shift + ?)"
                aria-label="Keyboard shortcuts"
              >
                <KeyboardIcon className="w-4 h-4" />
              </button>
              <Link
                to="/profile"
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  isActive("/profile")
                    ? "bg-primary text-primary-content ring-2 ring-primary/30"
                    : "bg-base-300 text-ink hover:bg-base-content/15"
                }`}
                title="Profile & settings"
                aria-label="Profile and settings"
                aria-current={isActive("/profile") ? "page" : undefined}
              >
                {getInitials(user.name)}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Mobile: slim top bar, logo + shortcuts only */}
    <header className="sticky top-0 z-50 glass-nav sm:hidden">
      <div className="px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 ring-1 ring-primary/20">
              <BookOpenIcon className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
            </div>
            <span className="text-lg font-bold font-mono tracking-tight text-base-content">
              Think<span className="text-primary">Board</span>
            </span>
          </Link>
          {user && (
            <button onClick={open} className="btn btn-ghost btn-sm btn-circle" title="Keyboard shortcuts" aria-label="Keyboard shortcuts">
              <KeyboardIcon className="w-4 h-4" />
            </button>
          )}
        </div>
    </div>
    </header>

    {/* Mobile: floating bottom pill nav — primary mobile navigation */}
    {user && (
      <nav
        className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Primary"
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full glass-panel-strong glass-highlight shadow-glass-lg">
          <button
            onClick={() => navigate("/")}
            className={mobileIconClass("/")}
            title="Dashboard"
            aria-label="Dashboard"
            aria-current={isActive("/") ? "page" : undefined}
          >
            <LayoutDashboardIcon className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={() => navigate("/notes")}
            className={mobileIconClass("/notes")}
            title="Notes"
            aria-label="Notes"
            aria-current={isActive("/notes") ? "page" : undefined}
          >
            <StickyNoteIcon className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={() => navigate("/create")}
            className="btn btn-primary btn-sm btn-circle shadow-md shadow-primary/30 mx-1"
            title="New note (Shift + N)"
            aria-label="New note"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/profile")}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-colors ${
              isActive("/profile")
                ? "bg-primary text-primary-content ring-2 ring-primary/30"
                : "bg-base-300 text-ink"
            }`}
            title="Profile & settings"
            aria-label="Profile and settings"
            aria-current={isActive("/profile") ? "page" : undefined}
          >
            {getInitials(user.name)}
          </button>
        </div>
      </nav>
    )}
    </>
  );
};

export default NavBar;