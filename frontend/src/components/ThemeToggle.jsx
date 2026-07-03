import { useState, useRef, useEffect } from "react";
import { PaletteIcon, CheckIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const ThemeToggle = () => {
    const { theme, setTheme, themes } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="btn btn-ghost btn-sm btn-circle"
                title="Change theme"
                aria-label="Change theme"
                aria-haspopup="true"
                aria-expanded={open}
            >
                <PaletteIcon className="w-4 h-4" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-52 max-h-80 overflow-y-auto rounded-xl border border-base-content/8 bg-base-100 shadow-xl p-1.5 z-50 animate-fade-in">
                    {themes.map((t) => (
                        <button
                            key={t}
                            onClick={() => {
                                setTheme(t);
                                setOpen(false);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm capitalize hover:bg-base-200 transition-colors"
                        >
                            {/* Scoped theme preview swatch */}
                            <span
                                data-theme={t}
                                className="flex gap-0.5 shrink-0 rounded-md overflow-hidden border border-base-content/10"
                            >
                                <span className="w-2 h-4 bg-base-200" />
                                <span className="w-2 h-4 bg-primary" />
                                <span className="w-2 h-4 bg-secondary" />
                                <span className="w-2 h-4 bg-accent" />
                                <span className="w-2 h-4 bg-neutral" />
                            </span>

                            <span className="flex-1 text-left">{t}</span>

                            {theme === t && <CheckIcon className="w-3.5 h-3.5 text-primary shrink-0" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeToggle;