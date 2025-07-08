"use client"

import { useTheme } from "../context/ThemeContext"
import "../styles/components.css"

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-pressed={theme === "dark"}
      title={`Current theme: ${theme}. Click to switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
      <span className="theme-toggle-text">{theme === "light" ? "Dark" : "Light"} Mode</span>
    </button>
  )
}

export default ThemeToggle
