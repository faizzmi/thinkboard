import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreatePage from "./pages/CreatePage";
import EditNotePage from "./pages/EditNotePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-base-200">
      <div className="fixed inset-0 -z-10 h-full w-full bg-base-200">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
        <Route path="/note/:id" element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
        <Route path="/note/edit/:id" element={<ProtectedRoute><EditNotePage /></ProtectedRoute>} />
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "hsl(var(--b1))",
            color: "hsl(var(--bc))",
            border: "1px solid hsl(var(--b3))",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
          },
          success: { iconTheme: { primary: "hsl(var(--p))", secondary: "hsl(var(--pc))" } },
          error: { iconTheme: { primary: "hsl(var(--er))", secondary: "hsl(var(--erc))" } },
        }}
      />
    </div>
  );
};

export default App;