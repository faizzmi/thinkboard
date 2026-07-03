import { Link } from "react-router-dom";
import { ArrowLeftIcon, KeyboardIcon } from "lucide-react";
import NavBar from "../components/NavBar";
import { SHORTCUTS, SHORTCUT_CATEGORIES, formatKeys } from "../lib/shortcuts";

const KeyBadge = ({ children }) => (
  <kbd className="kbd kbd-sm font-mono">{children}</kbd>
);

const ShortcutsPage = () => {
  const grouped = Object.keys(SHORTCUT_CATEGORIES).map((catId) => ({
    id: catId,
    label: SHORTCUT_CATEGORIES[catId],
    items: SHORTCUTS.filter((s) => s.category === catId),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-base-content/45 hover:text-base-content transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to notes
        </Link>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 ring-1 ring-primary/20">
            <KeyboardIcon className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-base-content">Keyboard shortcuts</h1>
        </div>

        <div className="space-y-6">
          {grouped.map((group) => (
            <section
              key={group.id}
              className="rounded-2xl border border-base-content/8 bg-base-100/60 backdrop-blur-sm shadow-xl shadow-base-content/5 p-6"
            >
              <h2 className="text-sm font-semibold text-base-content/50 uppercase tracking-widest mb-4">
                {group.label}
              </h2>
              <ul className="space-y-3">
                {group.items.map((shortcut) => (
                  <li key={shortcut.id} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-base-content/80">{shortcut.description}</span>
                    <div className="flex items-center gap-1 shrink-0">
                    {formatKeys(shortcut.keys).map((key, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <KeyBadge>{key}</KeyBadge>
                        {i < shortcut.keys.length - 1 && (
                          <span className="text-base-content/25 text-xs">
                            {shortcut.combo ? "+" : "then"}
                          </span>
                        )}
                      </span>
                    ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-xs text-base-content/30 mt-6 text-center">
          Press <KeyBadge>Shift</KeyBadge> + <KeyBadge>?</KeyBadge> anywhere to open this page.
        </p>
      </main>
    </div>
  );
};

export default ShortcutsPage;