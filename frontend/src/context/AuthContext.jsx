import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await api.get("/api/auth/me");
                setUser(res.data);
            } catch (error) {
                console.error("Failed to load user", error);
                localStorage.removeItem("token");
                setToken(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [token]);

    // heartbeat: catch session revocation even on an idle tab
    useEffect(() => {
        if (!token) return;

        const interval = setInterval(() => {
            api.get("/api/auth/me").catch(() => {
                // errors are handled globally by the axios interceptor
            });
        }, 20000);

        return () => clearInterval(interval);
    }, [token]);

    const login = (data) => {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser({ _id: data._id, name: data.name, email: data.email, theme: data.theme, emailVerified: data.emailVerified });
    };

    const logout = async () => {
        try {
            await api.post("/api/auth/logout");
        } catch (error) {
            console.error("Logout request failed", error);
        } finally {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }
    };

    const updateUser = (partial) => {
        setUser((prev) => ({ ...prev, ...partial }));
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);