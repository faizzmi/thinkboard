import { LogOutIcon } from "lucide-react";

const LogoutSection = ({ onLogoutClick }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-base-content mb-1">Log out</h2>
        <p className="text-sm text-ink-muted">Sign out of your ThinkBoard account on this device</p>
      </div>
      <button
        onClick={onLogoutClick}
        className="btn btn-error btn-sm gap-2 shadow-md shadow-error/20 shrink-0"
      >
        <LogOutIcon className="w-4 h-4" />
        Log out
      </button>
    </div>
  );
};

export default LogoutSection;