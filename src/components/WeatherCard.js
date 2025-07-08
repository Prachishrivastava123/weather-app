import "../styles/components.css"

function WeatherCard({ children, className = "" }) {
  return <div className={`weather-card ${className}`}>{children}</div>
}

export default WeatherCard
