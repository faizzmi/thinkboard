import { useState } from "react";
import toast from "react-hot-toast";
import { LockIcon, KeyRoundIcon } from "lucide-react";
import api from "../../lib/axios";

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("All fields required");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await api.put("/api/auth/change-password", { currentPassword, newPassword });
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many attempts. Please wait before trying again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to change password");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-lg font-semibold text-base-content mb-1">Security</h2>
        <p className="text-sm text-base-content/50">Change your password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <div className="form-control gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
            <LockIcon className="w-3.5 h-3.5" />
            Current password
          </label>
          <input
            type="password"
            className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="form-control gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
            <KeyRoundIcon className="w-3.5 h-3.5" />
            New password
          </label>
          <input
            type="password"
            className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-control gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
            <KeyRoundIcon className="w-3.5 h-3.5" />
            Confirm new password
          </label>
          <input
            type="password"
            className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
          {submitting ? <span className="loading loading-spinner loading-xs" /> : "Change password"}
        </button>
      </form>
    </div>
  );
};

export default SecuritySettings;