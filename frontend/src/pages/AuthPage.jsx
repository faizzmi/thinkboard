import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogInIcon, UserPlusIcon, MailIcon, LockIcon, UserIcon, BookOpenIcon } from "lucide-react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import CryptoJS from "crypto-js";

const AuthPage = () => {
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname === "/signup" ? "signup" : "login");
  const [submitting, setSubmitting] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();
  const { login } = useAuth();

  const switchTab = (next) => {
    setTab(next);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      toast.error("Email and password required");
      return;
    }

    setSubmitting(true);
    try {
      const hashedPassword = CryptoJS.SHA256(loginForm.password).toString();
      const res = await api.post("/api/auth/login", {
        email: loginForm.email,
        password: hashedPassword,
      });
      login(res.data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupForm.name.trim() || !signupForm.email.trim() || !signupForm.password.trim()) {
      toast.error("All fields required");
      return;
    }
    if (signupForm.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    try {
      const hashedPassword = CryptoJS.SHA256(signupForm.password).toString();
      const res = await api.post("/api/auth/signup", {
        name: signupForm.name.trim(),
        email: signupForm.email,
        password: hashedPassword,
      });
      login(res.data);
      toast.success("Account created!");
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || "Signup failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass-panel glass-highlight shadow-base-content/5 p-6 sm:p-8 animate-slide-up">
        {/* Tabs */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 ring-1 ring-primary/20 mb-3">
            <BookOpenIcon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-base-content">
            Welcome to Think<span className="text-primary">Board</span>
          </h1>
          <p className="text-sm text-ink-muted mt-1">Your notes, organized.</p>
        </div>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-base-200/60 mb-6">
          <button
            type="button"
            onClick={() => switchTab("login")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
              tab === "login"
                ? "bg-base-100 text-primary shadow-sm"
                : "text-ink-muted hover:text-base-content"
            }`}
          >
            <LogInIcon className="w-3.5 h-3.5" />
            Log in
          </button>
          <button
            type="button"
            onClick={() => switchTab("signup")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
              tab === "signup"
                ? "bg-base-100 text-primary shadow-sm"
                : "text-ink-muted hover:text-base-content"
            }`}
          >
            <UserPlusIcon className="w-3.5 h-3.5" />
            Sign up
          </button>
        </div>

        {/* Login form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-widest">
                <MailIcon className="w-3.5 h-3.5" />
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                autoFocus
              />
            </div>

            <div className="form-control gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-widest">
                <LockIcon className="w-3.5 h-3.5" />
                Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full gap-2 shadow-md shadow-primary/20" disabled={submitting}>
              {submitting ? <span className="loading loading-spinner loading-xs" /> : "Log in"}
            </button>

            <Link to="/forgot-password" className="block text-center text-sm text-ink-subtle hover:text-base-content transition-colors">
              Forgot your password?
            </Link>
          </form>
        )}

        {/* Signup form */}
        {tab === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="form-control gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-widest">
                <UserIcon className="w-3.5 h-3.5" />
                Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                autoFocus
              />
            </div>

            <div className="form-control gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-widest">
                <MailIcon className="w-3.5 h-3.5" />
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              />
            </div>

            <div className="form-control gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-widest">
                <LockIcon className="w-3.5 h-3.5" />
                Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full gap-2 shadow-md shadow-primary/20" disabled={submitting}>
              {submitting ? <span className="loading loading-spinner loading-xs" /> : "Create account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;