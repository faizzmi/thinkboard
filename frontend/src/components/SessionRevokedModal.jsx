import { ShieldAlertIcon } from "lucide-react";

const SessionRevokedModal = ({ isOpen, onConfirm, onSecureAccount }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-revoked-title"
    >
      <div className="absolute inset-0 bg-base-300/80 backdrop-blur-sm" />

      <div className="relative w-full max-w-md glass-panel-strong glass-highlight animate-slide-up">
        <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-warning/70 via-warning/30 to-transparent" />

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-2 rounded-lg bg-warning/10 ring-1 ring-warning/20 flex-shrink-0">
              <ShieldAlertIcon className="w-5 h-5 text-warning" strokeWidth={2} />
            </div>
            <div>
              <h2 id="session-revoked-title" className="text-base font-semibold text-base-content leading-snug">
                A device signed in to this account
              </h2>
              <p className="text-sm text-ink-muted mt-1.5 leading-relaxed">
                ThinkBoard only allows one active session at a time. If this was you signing in
                elsewhere, no action needed. If it wasn't, secure your account right away.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-1">
            <button onClick={onConfirm} className="btn btn-ghost btn-sm w-full sm:w-auto">
              OK
            </button>
            <button onClick={onSecureAccount} className="btn btn-warning btn-sm w-full sm:w-auto">
              This wasn't me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionRevokedModal;