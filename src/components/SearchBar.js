"use client"

import { useState } from "react"
import { useWeather } from "../context/WeatherContext"
import "../styles/components.css"

function SearchBar() {
  const [query, setQuery] = useState("")
  const { searchCity, loading, searchHistory } = useWeather()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      searchCity(query.trim())
      setQuery("")
    }
  }

  const handleHistoryClick = (city) => {
    searchCity(city.name)
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-button" disabled={loading || !query.trim()}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {searchHistory.length > 0 && (
        <div className="search-history">
          <h4>Recent Searches:</h4>
          <div className="history-items">
            {searchHistory.map((city) => (
              <button
                key={city.id}
                onClick={() => handleHistoryClick(city)}
                className="history-item"
                disabled={loading}
              >
                {city.name}, {city.country}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
