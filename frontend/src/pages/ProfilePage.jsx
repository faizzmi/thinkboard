import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ConfirmModal from "../components/ConfirmModal";
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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-28 sm:pb-8">

        <h1 className="text-page-title text-base-content mb-6">Settings</h1>

        <div className="space-y-6" id="settings-sections">
          <section className="glass-panel glass-highlight">
            <AccountSettings />
          </section>

          <section className="glass-panel glass-highlight" id="appearance-settings">
            <AppearanceSettings />
          </section>

          <section className="glass-panel glass-highlight" id="security-settings">
            <SecuritySettings />
          </section>

          <section className="rounded-2xl border border-error/15 bg-error/5 backdrop-blur-sm p-6 sm:p-8" id="logout-section">
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