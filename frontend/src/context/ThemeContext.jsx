import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../lib/axios";

const THEMES =  ["light", "dark", "cyberpunk", "bumblebee", "retro", "halloween", "forest", "black", "lofi", "luxury", "coffee", "nord"];

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(
        () => localStorage.getItem("theme") || "light"
    );
    const { user } = useAuth();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        if (user?.theme) {
            setThemeState(user.theme);
            localStorage.setItem("theme", user.theme);
        }
    }, [user]);

    const setTheme = async (newTheme) => {
        localStorage.setItem("theme", newTheme);
        setThemeState(newTheme);
        try {
            await api.put("/api/auth/theme", { theme: newTheme });
        } catch (error) {
            console.error("Failed to save theme preference", error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);