import { Link, useLocation } from "react-router-dom";
import { PlusIcon, BookOpenIcon } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  const isCreate = location.pathname === "/create";

  return (
    <header className="sticky top-0 z-50 border-b border-base-content/5 bg-base-300/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 ring-1 ring-primary/20 group-hover:bg-primary/25 transition-colors duration-200">
              <BookOpenIcon className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold font-mono tracking-tight text-base-content">
              Think<span className="text-primary">Board</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {!isCreate && (
              <Link
                to="/create"
                className="btn btn-primary btn-sm sm:btn-md gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
              >
                <PlusIcon className="w-4 h-4" />
                <span className="hidden sm:inline">New Note</span>
                <span className="sm:hidden">New</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;