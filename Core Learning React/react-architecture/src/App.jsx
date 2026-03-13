import { useState, useEffect } from 'react'
import './App.css'
import Loader from './Loader';
import Weather from './Weather';

function App() {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const API_URL = process.env.OPENWEATHER_API_URL;

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("porto alegre");
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  // Function to fetch weather and forecast data from OpenWeather API
  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true)
      setError(null)

      // Fetching current weather data
      const url = `${API_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      const weatherResponse = await fetch(url);
      if (!weatherResponse.ok) {
        throw new Error("City not found! Try another one"); // Error if city not found
      }
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      // Fetching forecast data
      const forecastResponse = await fetch(`${API_URL}/forecast/daily?q=${city}&appid=${API_KEY}&units=metric&cnt=7`);
      if (!forecastResponse.ok) {
        throw new Error("Unable to fetch forecast data"); // Error if forecast data not available
      }
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData.list);

    } catch (error) {
      // Handling any errors that occur during the fetch
      if (error instanceof Error) {
        setError(error.message);
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  // Handling form submission to fetch weather data based on city input
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
    setCity("");
  }

  if (loading) return <Loader />;

  return (
    <div className="grid-container">
      <div className="item1">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {error && <p className="error">{error}</p>}

      {!error && weatherData && (
        <>
        <div className="item2">
          <div className="weather-infos">
            <h1 className="city">{weatherData.name}</h1>
            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            <p className="condition">{weatherData.weather[0].main}</p>
            <Weather condition={weatherData.weather[0]}/>
          </div>
        </div>

        <div className="item3">
          <div className="weather-details">
            <div style={{marginBottom:"30px"}}>
              <h2>Humidity</h2>
              <h2 style={{ fontWeight: "bold" }}>{Math.round(weatherData.main.humidity)}%</h2>
            </div>
            <div>
              <h2>Wind Speed</h2>
              <h2 style={{ fontWeight: "bold" }}>{Math.round(weatherData.wind.speed)} m/s</h2>
            </div>
          </div>
        </div>
        </>
      )}

      {!error && forecastData.length > 0 && (
        <>
        <div className="item4">
          <div className="forecast">
            <h2 className="forecast-header">7-Day Forecast</h2>
            <div className="forecast-days">
              {forecastData.map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  />
                  <p>{Math.round(day.temp.day)}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default App
