import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LockIcon, KeyRoundIcon } from "lucide-react";
import api from "../lib/axios";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/reset-password", { token, newPassword: password });
      toast.success("Password reset! Please log in.");
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to reset password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-base-content/8 bg-base-100/60 backdrop-blur-sm shadow-xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 ring-1 ring-primary/20">
            <KeyRoundIcon className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl font-bold">Set new password</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
              <LockIcon className="w-3.5 h-3.5" />
              New password
            </label>
            <input
              type="password"
              className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-control gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
              <LockIcon className="w-3.5 h-3.5" />
              Confirm password
            </label>
            <input
              type="password"
              className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-xs" /> : "Reset password"}
          </button>
        </form>

        <Link to="/login" className="block text-center text-sm text-base-content/50 hover:text-base-content mt-6">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;