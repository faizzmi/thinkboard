import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../lib/axios";

const THEMES = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
    "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
    "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
    "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
    "night", "coffee", "winter", "dim", "nord", "sunset",
];

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