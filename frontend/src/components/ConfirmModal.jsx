import { useEffect } from "react";
import { AlertTriangleIcon } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  confirmVariant = "error",
}) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onConfirm, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-base-300/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md max-h-[80vh] overflow-y-auto glass-panel-strong glass-highlight animate-slide-up">

        {/* Top accent */}
        <div className={`h-1 w-full rounded-t-2xl bg-gradient-to-r from-${confirmVariant}/70 via-${confirmVariant}/30 to-transparent`} />

        <div className="p-6 space-y-4">
          {/* Icon + title */}
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 p-2 rounded-lg bg-${confirmVariant}/10 ring-1 ring-${confirmVariant}/20 flex-shrink-0`}>
              <AlertTriangleIcon className={`w-4 h-4 text-${confirmVariant}`} strokeWidth={2} />
            </div>
            <div>
              <h2
                id="confirm-modal-title"
                className="text-base font-semibold text-base-content leading-snug"
              >
                {title}
              </h2>
              <p className="text-sm text-base-content/55 mt-1 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={onCancel}
              className="btn btn-ghost btn-sm"
              autoFocus
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`btn btn-${confirmVariant} btn-sm shadow-md shadow-${confirmVariant}/20`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;