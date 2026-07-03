import { useState } from "react";
import toast from "react-hot-toast";
import { SaveIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import api from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";

const AccountSettings = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [resending, setResending] = useState(false);

  const isDirty = name.trim() !== user?.name;

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      const res = await api.put("/api/auth/profile", { name: name.trim() });
      updateUser({ name: res.data.name });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleResendVerification = async () => {
    setResending(true);
    try {
      await api.post("/api/auth/resend-verification");
      toast.success("Verification email sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend verification email");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-base-content mb-1">Account</h2>
        <p className="text-sm text-base-content/50">Manage your personal information</p>
      </div>

      <div className="form-control gap-2">
        <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest">
          Name
        </label>
        <input
          type="text"
          className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-control gap-2">
        <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest">
          Email
        </label>
        <div className="flex items-center gap-2">
          <input
            type="email"
            className="input input-bordered w-full bg-base-200/30 text-base-content/50"
            value={user?.email || ""}
            disabled
          />
          {user?.emailVerified ? (
            <span className="flex items-center gap-1 text-xs text-success shrink-0">
              <CheckCircleIcon className="w-4 h-4" />
              Verified
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-warning shrink-0">
              <AlertCircleIcon className="w-4 h-4" />
              Unverified
            </span>
          )}
        </div>
        {!user?.emailVerified && (
          <button
            onClick={handleResendVerification}
            className="btn btn-ghost btn-xs self-start text-primary"
            disabled={resending}
          >
            {resending ? "Sending..." : "Resend verification email"}
          </button>
        )}
      </div>

      <button
        onClick={handleSave}
        className="btn btn-primary btn-sm gap-2"
        disabled={saving || !isDirty}
      >
        {saving ? <span className="loading loading-spinner loading-xs" /> : <SaveIcon className="w-4 h-4" />}
        Save changes
      </button>
    </div>
  );
};

export default AccountSettings;