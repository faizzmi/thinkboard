import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreatePage from "./pages/CreatePage";
import EditNotePage from "./pages/EditNotePage";
import AuthPage from "./pages/AuthPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ShortcutsModal from "./components/ShortcutsModal";
import { Toaster } from "react-hot-toast";
import { useGlobalShortcuts } from "./hooks/useGlobalShortcuts";
import { useShortcutsModal } from "./context/ShortcutsModalContext.jsx";
import SplitViewPage from "./pages/SplitViewPage";
import SharedNotePage from "./pages/SharedNotePage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import NotFoundRedirect from "./components/NotFoundRedirect";
import SessionRevokedModal from "./components/SessionRevokedModal";
import { useEffect, useState } from "react";

const App = () => {
  const { isOpen, open, close } = useShortcutsModal();
  const [sessionRevoked, setSessionRevoked] = useState(false);
  const navigate = useNavigate();

  useGlobalShortcuts({
    onOpenPalette: () => {
      // command palette doesn't exist yet (future feature) — for now, no-op
      // once built, this will open that component's modal state
    },
    onOpenShortcutsRef: open,
  });


  useEffect(() => {
    const handleRevoked = () => setSessionRevoked(true);
    window.addEventListener("session-revoked", handleRevoked);
    return () => window.removeEventListener("session-revoked", handleRevoked);
  }, []);

  const handleAcknowledge = () => {
    setSessionRevoked(false);
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // clears AuthContext state cleanly
  };

  const handleSecureAccount = () => {
    setSessionRevoked(false);
    localStorage.removeItem("token");
    navigate("/forgot-password");
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen w-full bg-base-200">
      <div className="fixed inset-0 -z-10 h-full w-full bg-base-200">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Routes>
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/notes" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
        <Route path="/note/:id" element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
        <Route path="/note/edit/:id" element={<ProtectedRoute><EditNotePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/split" element={<ProtectedRoute><SplitViewPage /></ProtectedRoute>} />
        <Route path="/shared/:token" element={<SharedNotePage />} />
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>

      <ShortcutsModal isOpen={isOpen} onClose={close} />
      <SessionRevokedModal
        isOpen={sessionRevoked}
        onConfirm={handleAcknowledge}
        onSecureAccount={handleSecureAccount}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />
    </div>
  );
};

export default App;