import { createContext, useContext, useReducer } from "react"
import { getCurrentWeather, getForecast } from "../services/weatherApi"

const WeatherContext = createContext()

const initialState = {
  currentWeather: null,
  forecast: null,
  cities: [],
  activeCity: null,
  loading: false,
  error: null,
  searchHistory: JSON.parse(localStorage.getItem("weatherSearchHistory")) || [],
}

function weatherReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_CURRENT_WEATHER":
      return { ...state, currentWeather: action.payload, loading: false, error: null }
    case "SET_FORECAST":
      return { ...state, forecast: action.payload }
    case "SET_ACTIVE_CITY":
      return { ...state, activeCity: action.payload }
    case "ADD_CITY":
      const newCities = [...state.cities]
      const existingIndex = newCities.findIndex((city) => city.id === action.payload.id)
      if (existingIndex === -1) {
        newCities.push(action.payload)
      }
      return { ...state, cities: newCities }
    case "ADD_TO_SEARCH_HISTORY":
      const newHistory = [action.payload, ...state.searchHistory.filter((item) => item.id !== action.payload.id)].slice(
        0,
        5,
      )
      localStorage.setItem("weatherSearchHistory", JSON.stringify(newHistory))
      return { ...state, searchHistory: newHistory }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    default:
      return state
  }
}

export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  const searchCity = async (cityName) => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "CLEAR_ERROR" })

    try {
      const currentWeatherData = await getCurrentWeather(cityName)
      const forecastData = await getForecast(cityName)

      const cityData = {
        id: currentWeatherData.id,
        name: currentWeatherData.name,
        country: currentWeatherData.sys.country,
      }

      dispatch({ type: "SET_CURRENT_WEATHER", payload: currentWeatherData })
      dispatch({ type: "SET_FORECAST", payload: forecastData })
      dispatch({ type: "SET_ACTIVE_CITY", payload: cityData })
      dispatch({ type: "ADD_CITY", payload: cityData })
      dispatch({ type: "ADD_TO_SEARCH_HISTORY", payload: cityData })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
    }
  }

  const selectCity = async (city) => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "CLEAR_ERROR" })

    try {
      const currentWeatherData = await getCurrentWeather(city.name)
      const forecastData = await getForecast(city.name)

      dispatch({ type: "SET_CURRENT_WEATHER", payload: currentWeatherData })
      dispatch({ type: "SET_FORECAST", payload: forecastData })
      dispatch({ type: "SET_ACTIVE_CITY", payload: city })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
    }
  }

  const value = {
    ...state,
    searchCity,
    selectCity,
  }

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}
