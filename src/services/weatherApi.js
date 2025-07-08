const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || "42053ce6bcec40d8a375256c01244d6b"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function getCurrentWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling and try again.")
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.")
      } else {
        throw new Error("Failed to fetch weather data. Please try again later.")
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error.message.includes("fetch")) {
      throw new Error("Network error. Please check your internet connection.")
    }
    throw error
  }
}

export async function getForecast(city) {
  try {
    const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found for forecast data.")
      } else if (response.status === 401) {
        throw new Error("Invalid API key for forecast data.")
      } else {
        throw new Error("Failed to fetch forecast data.")
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error.message.includes("fetch")) {
      throw new Error("Network error while fetching forecast.")
    }
    throw error
  }
}

export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
