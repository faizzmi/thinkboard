import { CheckIcon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const AppearanceSettings = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-lg font-semibold text-base-content mb-1">Appearance</h2>
        <p className="text-sm text-ink-muted">Choose how ThinkBoard looks</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`flex items-center gap-2 p-3 rounded-xl border transition-colors text-left ${
              theme === t
                ? "border-primary/40 bg-primary/5"
                : "border-base-content/8 hover:border-base-content/20"
            }`}
          >
            <span
              data-theme={t}
              className="flex gap-0.5 shrink-0 rounded-md overflow-hidden border border-base-content/10"
            >
              <span className="w-2 h-5 bg-base-200" />
              <span className="w-2 h-5 bg-primary" />
              <span className="w-2 h-5 bg-secondary" />
              <span className="w-2 h-5 bg-accent" />
            </span>
            <span className="flex-1 text-sm capitalize">{t}</span>
            {theme === t && <CheckIcon className="w-4 h-4 text-primary shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppearanceSettings;