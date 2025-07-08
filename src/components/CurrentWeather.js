import { useWeather } from "../context/WeatherContext"
import WeatherCard from "./WeatherCard"
import { getWeatherIconUrl } from "../services/weatherApi"
import "../styles/components.css"

function CurrentWeather() {
  const { currentWeather, loading, error } = useWeather()

  if (loading) {
    return (
      <div className="current-weather">
        <div className="loading">Loading current weather...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="current-weather">
        <div className="error">Error: {error}</div>
      </div>
    )
  }

  if (!currentWeather) {
    return (
      <div className="current-weather">
        <div className="no-data">
          <h3>Welcome to Weather App</h3>
          <p>Search for a city to see current weather conditions</p>
        </div>
      </div>
    )
  }

  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main, description, icon }],
    wind: { speed },
    visibility,
  } = currentWeather

  return (
    <div className="current-weather">
      <WeatherCard>
        <div className="current-weather-header">
          <div className="location">
            <h2>
              {name}, {country}
            </h2>
            <p className="date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="current-weather-main">
          <div className="temperature-section">
            <img src={getWeatherIconUrl(icon) || "/placeholder.svg"} alt={description} className="weather-icon-large" />
            <div className="temperature">
              <span className="temp-value">{Math.round(temp)}°C</span>
              <p className="weather-description">{description}</p>
              <p className="feels-like">Feels like {Math.round(feels_like)}°C</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{speed} m/s</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{pressure} hPa</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{visibility ? (visibility / 1000).toFixed(1) : "N/A"} km</span>
            </div>
          </div>
        </div>
      </WeatherCard>
    </div>
  )
}

export default CurrentWeather
