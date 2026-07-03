import { Link } from "react-router-dom";
import { BookOpenIcon, SettingsIcon, KeyboardIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-base-content/5 bg-base-300/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 ring-1 ring-primary/20 group-hover:bg-primary/25 transition-colors duration-200">
              <BookOpenIcon className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold font-mono tracking-tight text-base-content">
              Think<span className="text-primary">Board</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {user && (
              <>
                <Link to="/shortcuts" className="btn btn-ghost btn-sm btn-circle" title="Keyboard shortcuts">
                  <KeyboardIcon className="w-4 h-4" />
                </Link>
                <Link to="/profile" className="btn btn-ghost btn-sm btn-circle" title="Settings">
                  <SettingsIcon className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;