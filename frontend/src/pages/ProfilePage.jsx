import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import ConfirmModal from "../components/ConfirmModal";
import { ArrowLeftIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AccountSettings from "../components/profile/AccountSettings";
import AppearanceSettings from "../components/profile/AppearanceSettings";
import SecuritySettings from "../components/profile/SecuritySettings";
import LogoutSection from "../components/profile/LogoutSection";

const ProfilePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-base-content/45 hover:text-base-content transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to notes
        </Link>

        <h1 className="text-2xl font-bold text-base-content mb-6">Settings</h1>

        <div className="space-y-6">
          <section className="rounded-2xl border border-base-content/8 bg-base-100/60 backdrop-blur-sm shadow-xl shadow-base-content/5 p-6 sm:p-8">
            <AccountSettings />
          </section>

          <section className="rounded-2xl border border-base-content/8 bg-base-100/60 backdrop-blur-sm shadow-xl shadow-base-content/5 p-6 sm:p-8">
            <AppearanceSettings />
          </section>

          <section className="rounded-2xl border border-base-content/8 bg-base-100/60 backdrop-blur-sm shadow-xl shadow-base-content/5 p-6 sm:p-8">
            <SecuritySettings />
          </section>

          <section className="rounded-2xl border border-error/15 bg-error/5 backdrop-blur-sm p-6 sm:p-8">
            <LogoutSection onLogoutClick={() => setShowLogoutConfirm(true)} />
          </section>
        </div>
      </main>

      <ConfirmModal
        isOpen={showLogoutConfirm}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        title="Log out of ThinkBoard?"
        message="You'll need to log back in to access your notes."
        confirmLabel="Log out"
        confirmVariant="error"
      />
    </div>
  );
};

export default ProfilePage;