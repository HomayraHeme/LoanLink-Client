import React from "react";
import { useTheme } from "./ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            title="Toggle Theme"
        >

            {theme === "light" ? <FiMoon className="h-6 w-6 text-amber-800" /> : <FiSun className="h-6 w-6" />}
        </button>
    );
};

export default ThemeToggle;