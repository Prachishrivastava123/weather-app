import { useWeather } from "../context/WeatherContext"
import WeatherCard from "./WeatherCard"
import { getWeatherIconUrl } from "../services/weatherApi"
import "../styles/components.css"

function Forecast() {
  const { forecast, loading, error } = useWeather()

  if (loading || !forecast) {
    return null
  }

  if (error) {
    return (
      <div className="forecast">
        <WeatherCard>
          <div className="error">Failed to load forecast data</div>
        </WeatherCard>
      </div>
    )
  }

  // Group forecast data by day (take one forecast per day at noon)
  const dailyForecasts = forecast.list
    .filter((item, index) => {
      const date = new Date(item.dt * 1000)
      return date.getHours() === 12 || index === 0
    })
    .slice(0, 5)

  return (
    <div className="forecast">
      <WeatherCard>
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-list">
          {dailyForecasts.map((item, index) => {
            const date = new Date(item.dt * 1000)
            const dayName = index === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" })
            const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

            return (
              <div key={item.dt} className="forecast-item">
                <div className="forecast-day">
                  <span className="day-name">{dayName}</span>
                  <span className="day-date">{dateStr}</span>
                </div>

                <div className="forecast-weather">
                  <img
                    src={getWeatherIconUrl(item.weather[0].icon) || "/placeholder.svg"}
                    alt={item.weather[0].description}
                    className="forecast-icon"
                  />
                  <span className="forecast-description">{item.weather[0].main}</span>
                </div>

                <div className="forecast-temps">
                  <span className="temp-high">{Math.round(item.main.temp_max)}°</span>
                  <span className="temp-low">{Math.round(item.main.temp_min)}°</span>
                </div>

                <div className="forecast-details">
                  <span className="humidity">💧 {item.main.humidity}%</span>
                  <span className="wind">💨 {item.wind.speed} m/s</span>
                </div>
              </div>
            )
          })}
        </div>
      </WeatherCard>
    </div>
  )
}

export default Forecast
