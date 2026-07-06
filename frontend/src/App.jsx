import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import ShortcutsModal from "./components/ShortcutsModal";
import { Toaster } from "react-hot-toast";
import { useGlobalShortcuts } from "./hooks/useGlobalShortcuts";
import { useShortcutsModal } from "./context/ShortcutsModalContext";
import NotFoundRedirect from "./components/NotFoundRedirect";

const HomePage = lazy(() => import("./pages/HomePage"));
const NoteDetailPage = lazy(() => import("./pages/NoteDetailPage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));
const EditNotePage = lazy(() => import("./pages/EditNotePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SplitViewPage = lazy(() => import("./pages/SplitViewPage"));
const SharedNotePage = lazy(() => import("./pages/SharedNotePage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));

const PageFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <span className="loading loading-spinner loading-md text-primary" />
  </div>
);

const App = () => {
  const { isOpen, open, close } = useShortcutsModal();

  useGlobalShortcuts({
    onOpenPalette: () => {},
    onOpenShortcutsRef: open,
  });

  return (
    <div className="relative min-h-screen w-full bg-base-200">
      <div className="fixed inset-0 -z-10 h-full w-full bg-base-200">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Suspense fallback={<PageFallback />}>
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
      </Suspense>

      <ShortcutsModal isOpen={isOpen} onClose={close} />

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