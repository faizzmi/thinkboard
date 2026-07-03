import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogInIcon, MailIcon, LockIcon } from "lucide-react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import CryptoJS from "crypto-js";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Email and password required");
      return;
    }

    setLoading(true);
    try {
      const hashedPassword = CryptoJS.SHA256(form.password).toString();
      const res = await api.post("/api/auth/login", {
        email: form.email,
        password: hashedPassword,
        theme: "light",
      });
      login(res.data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      console.error("Login error full:", error);
      const msg = error.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-base-content/8 bg-base-100/60 backdrop-blur-sm shadow-xl shadow-base-content/5 p-6 sm:p-8 animate-slide-up">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 ring-1 ring-primary/20">
            <LogInIcon className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-base-content">Log in</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
              <MailIcon className="w-3.5 h-3.5" />
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-control gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
              <LockIcon className="w-3.5 h-3.5" />
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full gap-2 shadow-md shadow-primary/20"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-xs" /> : "Log in"}
          </button>
        </form>

        <p className="text-sm text-base-content/50 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-center mt-3">
          <Link to="/forgot-password" className="text-base-content/40 hover:text-base-content transition-colors">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;