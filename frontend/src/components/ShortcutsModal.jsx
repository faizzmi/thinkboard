import { useEffect } from "react";
import { KeyboardIcon, XIcon } from "lucide-react";
import { SHORTCUTS, SHORTCUT_CATEGORIES, formatKeys } from "../lib/shortcuts";

const KeyBadge = ({ children }) => (
    <kbd className="kbd kbd-sm font-mono">{children}</kbd>
);

const ShortcutsModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const grouped = Object.keys(SHORTCUT_CATEGORIES).map((catId) => ({
        id: catId,
        label: SHORTCUT_CATEGORIES[catId],
        items: SHORTCUTS.filter((s) => s.category === catId),
    })).filter((group) => group.items.length > 0);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-modal-title"
        >
            <div
                className="absolute inset-0 bg-base-300/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl border border-base-content/8 bg-base-100/95 backdrop-blur-md shadow-2xl shadow-base-content/10 animate-slide-up">
                <div className="sticky top-0 bg-base-100/95 backdrop-blur-md flex items-center justify-between gap-2.5 p-6 pb-4 border-b border-base-content/6">
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 ring-1 ring-primary/20">
                            <KeyboardIcon className="w-4 h-4 text-primary" />
                        </div>
                        <h2 id="shortcuts-modal-title" className="text-lg font-bold text-base-content">
                            Keyboard shortcuts
                        </h2>
                    </div>
                    <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {grouped.map((group) => (
                        <section key={group.id}>
                            <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-3">
                                {group.label}
                            </h3>
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
            </div>
        </div>
    );
};

export default ShortcutsModal;