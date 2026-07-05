import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, XIcon, StickyNoteIcon, SettingsIcon, KeyboardIcon } from "lucide-react";
import api from "../lib/axios";
import { useShortcutsModal } from "../context/ShortcutsModalContext";

const SETTINGS_ITEMS = [
    { label: "Profile", path: "/profile", keywords: "account profile user" },
    { label: "Account", path: "/profile#settings-sections", keywords: "account" },
    { label: "Appearance", path: "/profile#appearance-settings", keywords: "theme dark light" },
    { label: "Change Password", path: "/profile#security-settings", keywords: "change password" },
    { label: "Log out", path: "/profile#logout-section", keywords: "logout" },
];

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { open: openShortcuts } = useShortcutsModal();

  // debounce: wait 350ms after the user stops typing before calling the API
  useEffect(() => {
    if (!isOpen || !query.trim()) {
      setNotes([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      api
        .get(`/api/notes?search=${encodeURIComponent(query.trim())}&limit=6`)
        .then((res) => setNotes(res.data.notes || []))
        .catch(() => setNotes([]))
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  const handleShortcutsClick = () => {
    onClose();
    openShortcuts();
  };

  const q = query.toLowerCase().trim();

  // no query: show everything by default. query present: filter.
  const matchedSettings = q
    ? SETTINGS_ITEMS.filter(
        (s) => s.label.toLowerCase().includes(q) || s.keywords.toLowerCase().includes(q)
      )
    : SETTINGS_ITEMS;

  const shortcutsMatch = q ? "keyboard shortcuts".includes(q) : true;

  const hasResults = notes.length > 0 || matchedSettings.length > 0 || shortcutsMatch;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-24" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-base-300/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md glass-panel-strong glass-highlight animate-slide-up rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-base-content/10">
          <SearchIcon className="w-4 h-4 text-ink-subtle shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes and settings..."
            className="flex-1 bg-transparent outline-none text-sm text-base-content placeholder:text-ink-subtle"
          />
          <button onClick={onClose} className="btn btn-ghost btn-xs btn-circle" aria-label="Close search">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {loading && <p className="text-xs text-ink-subtle text-center py-6">Searching...</p>}

          {!loading && q && !hasResults && (
            <p className="text-xs text-ink-subtle text-center py-6">No results for "{query}"</p>
          )}

          {!loading && notes.length > 0 && (
            <div className="mb-2">
              <p className="text-xs font-semibold text-ink-subtle px-2 py-1">Notes</p>
              {notes.map((note) => (
                <button
                  key={note._id}
                  onClick={() => goTo(`/notes/${note._id}`)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-base-content/5 text-left"
                >
                  <StickyNoteIcon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-base-content truncate">{note.title}</span>
                </button>
              ))}
            </div>
          )}

          {!loading && (matchedSettings.length > 0 || shortcutsMatch) && (
            <div>
              <p className="text-xs font-semibold text-ink-subtle px-2 py-1">Settings</p>
              {shortcutsMatch && (
                <button
                  onClick={handleShortcutsClick}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-base-content/5 text-left"
                >
                  <KeyboardIcon className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-sm text-base-content truncate">Keyboard shortcuts</span>
                </button>
              )}
              {matchedSettings.map((item) => (
                <button
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-base-content/5 text-left"
                >
                  <SettingsIcon className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-sm text-base-content truncate">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;