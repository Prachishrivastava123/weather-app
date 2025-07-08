import { createContext, useContext, useReducer, useEffect } from "react"

const ThemeContext = createContext()

const initialState = {
  theme: localStorage.getItem("weather-app-theme") || "light",
  systemPreference: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
}

function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light"
      localStorage.setItem("weather-app-theme", newTheme)
      return { ...state, theme: newTheme }
    case "SET_THEME":
      localStorage.setItem("weather-app-theme", action.payload)
      return { ...state, theme: action.payload }
    case "SET_SYSTEM_PREFERENCE":
      return { ...state, systemPreference: action.payload }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => {
      dispatch({ type: "SET_SYSTEM_PREFERENCE", payload: e.matches ? "dark" : "light" })
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [state.theme])

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" })
  }

  const setTheme = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme })
  }

  const value = {
    ...state,
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
