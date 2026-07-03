import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isMac } from "../lib/shortcuts";

// Handles shortcuts that apply app-wide, regardless of which page you're on.
// Page-specific shortcuts (like save-note) stay local to their own components.
export function useGlobalShortcuts({ onOpenPalette, onOpenShortcutsRef }) {
  const navigate = useNavigate();

  useEffect(() => {
    let gPressed = false;
    let gTimeout = null;

    const handleKeyDown = (e) => {
      const modPressed = isMac ? e.metaKey : e.ctrlKey;

      // don't fire shortcuts while typing in inputs/textareas, except Esc and Mod+K
      const isTyping =
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable;

      // Mod+K -> command palette (works even while typing, common UX pattern)
      if (modPressed && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenPalette?.();
        return;
      }

      if (isTyping) return;

      // Shift+N -> new note
      if (e.shiftKey && !modPressed && e.key.toLowerCase() === "n") {
        e.preventDefault();
        navigate("/create");
        return;
      }

      // Shift+/ (i.e. "?") -> shortcuts reference
      if (e.shiftKey && e.key === "?") {
        e.preventDefault();
        onOpenShortcutsRef?.();
        return;
      }

      // G then H -> go home, G then P -> go profile (two-key sequence)
      if (e.key.toLowerCase() === "g") {
        gPressed = true;
        clearTimeout(gTimeout);
        gTimeout = setTimeout(() => {
          gPressed = false;
        }, 800);
        return;
      }

      if (gPressed) {
        if (e.key.toLowerCase() === "h") {
          gPressed = false;
          navigate("/");
        } else if (e.key.toLowerCase() === "p") {
          gPressed = false;
          navigate("/profile");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(gTimeout);
    };
  }, [navigate, onOpenPalette, onOpenShortcutsRef]);
}