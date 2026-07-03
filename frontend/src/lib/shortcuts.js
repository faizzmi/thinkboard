// Central registry — single source of truth for both actual keybindings
// and the reference page. Each shortcut declares its own keys, description,
// and category. Actions are wired up separately per-context (global vs page-local).

export const SHORTCUT_CATEGORIES = {
    navigation: "Navigation",
    notes: "Notes",
    editing: "Editing",
    general: "General",
  };
  
  // Detect platform once, reused for display formatting
  export const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  
  export const modKey = isMac ? "Cmd" : "Ctrl";
  
  // keys: array of key combo parts, using "Mod" as a stand-in for Cmd/Ctrl
  // so the reference page can render the right symbol per-platform.
  export const SHORTCUTS = [
    {
      id: "command-palette",
      keys: ["Mod", "K"],
      description: "Open command palette",
      category: "general",
    },
    {
      id: "go-home",
      keys: ["G", "H"],
      description: "Go to notes",
      category: "navigation",
    },
    {
      id: "go-profile",
      keys: ["G", "P"],
      description: "Go to settings",
      category: "navigation",
    },
    {
      id: "new-note",
      keys: ["Shift", "N"],
      description: "Create a new note",
      category: "notes",
      combo: true,
    },
    {
      id: "save-note",
      keys: ["Mod", "Enter"],
      description: "Save current note",
      category: "editing",
    },
    {
      id: "close-modal",
      keys: ["Esc"],
      description: "Close modal or dialog",
      category: "general",
    },
    {
      id: "show-shortcuts",
      keys: ["Shift", "/"],
      description: "Show keyboard shortcuts",
      category: "general",
    },
  ];
  
  export function formatKeys(keys) {
    return keys.map((k) => (k === "Mod" ? modKey : k));
  }