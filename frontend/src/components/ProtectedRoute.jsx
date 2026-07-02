import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, token, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-md text-primary" />
            </div>
        );
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;