import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon, MailIcon } from "lucide-react";
import api from "../lib/axios";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }

    const verify = async () => {
      try {
        await api.get(`/api/auth/verify-email?token=${token}`);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass-panel glass-highlight p-8 text-center space-y-4">
        {status === "verifying" && (
          <>
            <span className="loading loading-spinner loading-lg text-primary" />
            <p className="text-ink-muted">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircleIcon className="w-12 h-12 text-success mx-auto" />
            <h1 className="text-xl font-bold">Email verified!</h1>
            <p className="text-sm text-ink-muted">Your account is now fully verified.</p>
            <Link to="/" className="btn btn-primary btn-sm">Go to ThinkBoard</Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircleIcon className="w-12 h-12 text-error mx-auto" />
            <h1 className="text-xl font-bold">Verification failed</h1>
            <p className="text-sm text-ink-muted">{message}</p>
            <Link to="/login" className="btn btn-ghost btn-sm gap-2">
              <MailIcon className="w-4 h-4" />
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;