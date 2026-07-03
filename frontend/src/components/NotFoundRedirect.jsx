import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotFoundRedirect = () => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    );
  }

  return <Navigate to={token && user ? "/" : "/welcome"} replace />;
};

export default NotFoundRedirect;