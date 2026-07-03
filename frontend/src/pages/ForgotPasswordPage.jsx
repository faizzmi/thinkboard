import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MailIcon, ArrowLeftIcon, KeyRoundIcon } from "lucide-react";
import api from "../lib/axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
      setSent(true);
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait before trying again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass-panel glass-highlight p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 ring-1 ring-primary/20">
            <KeyRoundIcon className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl font-bold">Reset password</h1>
        </div>

        {sent ? (
          <div className="text-center space-y-3 py-4">
            <MailIcon className="w-10 h-10 text-primary mx-auto" />
            <p className="text-sm text-base-content/70">
              A reset link has been sent. Check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control gap-2">
              <label className="text-xs font-semibold text-base-content/50 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-xs" /> : "Send reset link"}
            </button>
          </form>
        )}

        <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-base-content/50 hover:text-base-content mt-6">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;