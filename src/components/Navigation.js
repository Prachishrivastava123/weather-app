"use client"
import { useWeather } from "../context/WeatherContext"
import "../styles/components.css"

function Navigation() {
  const { cities, activeCity, selectCity, loading } = useWeather()

  if (cities.length === 0) {
    return null
  }

  return (
    <nav className="navigation">
      <h4>Saved Cities</h4>
      <div className="city-tabs">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => selectCity(city)}
            className={`city-tab ${activeCity?.id === city.id ? "active" : ""}`}
            disabled={loading}
          >
            {city.name}
            <span className="country-code">{city.country}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
