# Weather App

A modern, responsive weather application built with React that displays current weather conditions and 5-day forecasts using the OpenWeatherMap API.

## Features

- **City Search**: Search for weather information by city name
- **Current Weather**: Display current temperature, weather conditions, and detailed metrics
- **5-Day Forecast**: View upcoming weather forecasts
- **Multiple Cities**: Save and switch between multiple cities
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Search History**: Keeps track of recently searched cities
- **Fast Performance**: Optimized with React hooks and Context API

## Technologies Used

- **React 18** - Frontend framework
- **Context API** - State management
- **Fetch API** - HTTP requests
- **CSS3** - Styling with modern features
- **OpenWeatherMap API** - Weather data source

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- OpenWeatherMap API key


## Usage

### Searching for Weather
1. Enter a city name in the search bar
2. Press Enter or click the Search button
3. View current weather and forecast data

### Managing Multiple Cities
1. Search for different cities to add them to your saved list
2. Use the navigation tabs to switch between cities
3. Recent searches are automatically saved for quick access

### Features Overview
- **Current Weather**: Temperature, weather description, humidity, wind speed, pressure, and visibility
- **5-Day Forecast**: Daily high/low temperatures, weather conditions, humidity, and wind speed
- **Search History**: Last 5 searched cities for quick access
- **Responsive Design**: Optimized for all screen sizes

## API Integration

The app uses the OpenWeatherMap API with two main endpoints:

- **Current Weather**: \`/weather\` - Gets current weather data
- **5-Day Forecast**: \`/forecast\` - Gets forecast data with 3-hour intervals

### Error Handling
- Network connectivity issues
- Invalid city names
- API key validation

### State Management
- **WeatherContext**: Centralized state using React Context API
- **useReducer**: Complex state logic management
- **Local Storage**: Persistent search history

## Styling Approach

- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Consistent theming
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Enhanced user experience

### Common Issues

1. **API Key Error**
   - Ensure your API key is correctly set in the \`.env\` file
   - Verify the API key is active on OpenWeatherMap

2. **City Not Found**
   - Check spelling of city names
   - Try using city name with country code (e.g., "London, UK")

3. **Network Errors**
   - Check internet connectivity
   - Verify API endpoints are accessible

