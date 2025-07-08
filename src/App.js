import { WeatherProvider } from "./context/WeatherContext"
import SearchBar from "./components/SearchBar"
import CurrentWeather from "./components/CurrentWeather"
import Forecast from "./components/Forecast"
import Navigation from "./components/Navigation"
import "./styles/App.css"
import { ThemeProvider } from "./context/ThemeContext"
import ThemeToggle from "./components/ThemeToggle"
// import AccessibilityAnnouncer from "./components/AccessibilityAnnouncer"
// import { useWeather } from "./context/WeatherContext"

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="app">
          {/* <a href="#main-content" className="skip-link">
            Skip to main content
          </a> */}

          <header className="app-header" role="banner">
            <div className="header-content">
              <h1>Weather App</h1>
              <ThemeToggle />
            </div>
            <SearchBar />
          </header>

          <main className="app-main" role="main" id="main-content">
            <Navigation />
            <div className="weather-content">
              <CurrentWeather />
              <Forecast />
            </div>
          </main>

          {/* <AccessibilityAnnouncer message={useWeather().announcement} /> */}
        </div>
      </WeatherProvider>
    </ThemeProvider>
  )
}

export default App
