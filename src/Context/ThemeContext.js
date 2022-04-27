import React, { useContext, useState } from 'react'

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    }

    return (
        <ThemeContext.Provider value={{darkMode, handleDarkModeToggle}}>{children}</ThemeContext.Provider>
    )
}

export function useThemeContext() {
    return useContext(ThemeContext);
}