/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// Map weather conditions to images/GIFs and gradients
const weatherStyles = {
  Clear: {
    image: "https://media.giphy.com/media/xT9IgzoPDWknR7nVZK/giphy-downsized.gif",
    gradient: "from-blue-300 to-blue-500",
  },
  Sunny: {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    gradient: "from-yellow-200 to-orange-400",
  },
  Cloudy: {
    image: "https://media.giphy.com/media/xT9Igu0xJ9zJ3zJ3zJ/giphy-downsized.gif",
    gradient: "from-gray-300 to-gray-500",
  },
  Rain: {
    image: "https://media.giphy.com/media/xT9IgG2lP0XJ0Z0Z0Z/giphy-downsized.gif",
    gradient: "from-blue-400 to-gray-600",
  },
  Snow: {
    image: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy-downsized.gif",
    gradient: "from-blue-100 to-gray-200",
  },
  default: {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    gradient: "from-gray-400 to-gray-700",
  },
};

// Debounce utility to limit API calls
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Home = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("Krishnanagar");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [unit, setUnit] = useState("C");
  const [forecastDays, setForecastDays] = useState(3);
  const [hourlyRange, setHourlyRange] = useState(12);
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({
    wind: true,
    humidity: true,
    pressure: true,
    uv: true,
  });

  const fetchData = async (location) => {
    setLoading(true);
    setError(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${forecastDays}&aqi=yes&alerts=yes`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data for Krishnanagar.");
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(search);
  }, [search, forecastDays]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim()) {
        setSearch(value);
      }
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search.trim()) {
      fetchData(search);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sortedForecast = (forecastDays) => {
    if (!data?.forecast?.forecastday) return [];
    const forecast = [...data.forecast.forecastday].slice(0, forecastDays);
    if (sortBy === "highTemp") {
      return forecast.sort((a, b) => (unit === "C" ? b.day.maxtemp_c - a.day.maxtemp_c : b.day.maxtemp_f - a.day.maxtemp_f));
    } else if (sortBy === "lowTemp") {
      return forecast.sort((a, b) => (unit === "C" ? b.day.mintemp_c - a.day.mintemp_c : b.day.mintemp_f - a.day.mintemp_f));
    } else if (sortBy === "precipitation") {
      return forecast.sort((a, b) => b.day.daily_chance_of_rain - a.day.daily_chance_of_rain);
    }
    return forecast;
  };

  const condition = data?.current?.condition?.text || "default";
  const { image, gradient } = weatherStyles[condition] || weatherStyles.default;

  return (
    <div
      className={`relative min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500 font-sans`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradient} backdrop-blur-md opacity-75`}
      ></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center min-h-screen p-4 pt-12 sm:pt-16"
      >
        <div className="w-full max-w-[95%] sm:max-w-3xl">
          {/* Search Bar */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="bg-white/30 backdrop-blur-xl shadow-lg rounded-2xl p-4 sm:p-6 border-2 border-gradient-to-r from-blue-400/50 to-purple-400/50"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center tracking-tight flex items-center justify-center gap-2">
              <span role="img" aria-label="Weather">☀️</span> Weather Dashboard
            </h2>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
              <input
                value={search}
                onChange={handleSearchChange}
                type="text"
                placeholder="Enter city name (e.g., Krishnanagar)"
                className="w-full px-4 py-2.5 text-gray-800 font-medium bg-white/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/80 shadow-sm hover:shadow-md transition duration-300 text-sm sm:text-base"
                aria-label="Search city"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full hover:brightness-110 transition duration-300 shadow-md disabled:opacity-50 text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleUnit}
                className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-full hover:brightness-110 transition duration-300 shadow-md text-sm sm:text-base"
                aria-label={`Switch to ${unit === "C" ? "Fahrenheit" : "Celsius"}`}
              >
                {unit === "C" ? "°F" : "°C"}
              </motion.button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-red-300 text-center text-sm sm:text-base"
              >
                {error}
              </motion.p>
            )}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-4 sm:p-6 border border-white/30"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-4">
              Filters
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm sm:text-base">Forecast Days</label>
                <select
                  value={forecastDays}
                  onChange={(e) => setForecastDays(Number(e.target.value))}
                  className="px-3 py-2 bg-white/70 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                  aria-label="Select forecast days"
                >
                  <option value={1}>1 Day</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm sm:text-base">Hourly Forecast Range</label>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="6"
                  value={hourlyRange}
                  onChange={(e) => setHourlyRange(Number(e.target.value))}
                  className="w-full accent-blue-500"
                  aria-label="Select hourly forecast range"
                />
                <span className="text-white text-sm">{hourlyRange} Hours</span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm sm:text-base">Sort Forecast By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white/70 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                  aria-label="Sort forecast"
                >
                  <option value="date">Date</option>
                  <option value="highTemp">Highest Temperature</option>
                  <option value="lowTemp">Lowest Temperature</option>
                  <option value="precipitation">Precipitation Chance</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm sm:text-base">Show Parameters</label>
                <div className="flex gap-4 flex-wrap">
                  <label className="flex items-center gap-2 text-white text-sm">
                    <input
                      type="checkbox"
                      checked={filters.wind}
                      onChange={() => toggleFilter("wind")}
                      className="accent-blue-500"
                    />
                    Wind
                  </label>
                  <label className="flex items-center gap-2 text-white text-sm">
                    <input
                      type="checkbox"
                      checked={filters.humidity}
                      onChange={() => toggleFilter("humidity")}
                      className="accent-blue-500"
                    />
                    Humidity
                  </label>
                  <label className="flex items-center gap-2 text-white text-sm">
                    <input
                      type="checkbox"
                      checked={filters.pressure}
                      onChange={() => toggleFilter("pressure")}
                      className="accent-blue-500"
                    />
                    Pressure
                  </label>
                  <label className="flex items-center gap-2 text-white text-sm">
                    <input
                      type="checkbox"
                      checked={filters.uv}
                      onChange={() => toggleFilter("uv")}
                      className="accent-blue-500"
                    />
                    UV Index
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-white text-center"
            >
              <svg
                className="animate-spin h-6 w-6 sm:h-8 sm:w-8 mx-auto text-blue-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                ></path>
              </svg>
            </motion.div>
          )}

          {data && !loading && (
            <div className="mt-6 space-y-8 sm:space-y-10">
              {/* Weather Alerts */}
              {data.alerts?.alert?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-red-500/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-red-300/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-white text-center">
                    Weather Alerts
                  </h4>
                  {data.alerts.alert.map((alert, index) => (
                    <p key={index} className="text-sm sm:text-base text-white mt-2">
                      {alert.headline} - {alert.desc}
                    </p>
                  ))}
                </motion.div>
              )}

              {/* Current Weather */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-4 sm:p-6 border border-white/30"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
                  {`Current Weather in ${search}, ${data.location.country}`}
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-between mt-3 gap-3 sm:gap-4">
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-white">
                      {unit === "C" ? data.current.temp_c : data.current.temp_f}°{unit}
                    </p>
                    <p className="text-base sm:text-lg text-white mt-1">
                      {data.current.condition.text}
                    </p>
                  </div>
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={`https:${data.current.condition.icon}`}
                    alt="Weather Icon"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm sm:text-base font-medium text-white mt-3 text-center">
                  {data.current.is_day === 0 ? "🌙 Night" : "☀️ Day"}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 text-white text-sm sm:text-base">
                  {filters.wind && (
                    <p className="flex items-center gap-2" title="Wind speed">
                      <span role="img" aria-label="Wind">💨</span>
                      Wind: {data.current.wind_kph} kph
                    </p>
                  )}
                  {filters.humidity && (
                    <p className="flex items-center gap-2" title="Humidity level">
                      <span role="img" aria-label="Humidity">🌫️</span>
                      Humidity: {data.current.humidity}%
                    </p>
                  )}
                  {filters.pressure && (
                    <p className="flex items-center gap-2" title="Atmospheric pressure">
                      <span role="img" aria-label="Pressure">📉</span>
                      Pressure: {data.current.pressure_mb} mb
                    </p>
                  )}
                  {filters.uv && (
                    <p className="flex items-center gap-2" title="UV index">
                      <span role="img" aria-label="UV">☀️</span>
                      UV Index: {data.current.uv}
                    </p>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMore(!showMore)}
                    className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300 shadow-md text-sm sm:text-base"
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </motion.button>
                </div>

                {showMore && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 text-white text-sm sm:text-base space-y-2"
                  >
                    <p className="flex items-center gap-2" title="Region">
                      <span role="img" aria-label="Region">🌍</span>
                      Region: {data.location.region}
                    </p>
                    <p className="flex items-center gap-2" title="Local time">
                      <span role="img" aria-label="Time">🕒</span>
                      Local Time: {data.location.localtime}
                    </p>
                    <p className="flex items-center gap-2" title="Last updated time">
                      <span role="img" aria-label="Last Updated">🖊️</span>
                      Last Updated: {data.current.last_updated}
                    </p>
                    <p className="flex items-center gap-2" title="Dewpoint temperature">
                      <span role="img" aria-label="Dewpoint">🌅</span>
                      Dewpoint: {unit === "C" ? data.current.dewpoint_c : data.current.dewpoint_f}°{unit}
                    </p>
                    <p className="flex items-center gap-2" title="Windchill temperature">
                      <span role="img" aria-label="Windchill">🌪️</span>
                      Windchill: {unit === "C" ? data.current.windchill_c : data.current.windchill_f}°{unit}
                    </p>
                    <p className="flex items-center gap-2" title="Precipitation amount">
                      <span role="img" aria-label="Precipitation">💧</span>
                      Precipitation: {data.current.precip_mm} mm
                    </p>
                    <p className="flex items-center gap-2" title="Visibility distance">
                      <span role="img" aria-label="Visibility">🌫️</span>
                      Visibility: {data.current.vis_km} km
                    </p>
                    {data.current.air_quality && (
                      <p className="flex items-center gap-2" title="Air Quality Index">
                        <span role="img" aria-label="Air Quality">🌬️</span>
                        Air Quality (AQI): {data.current.air_quality["us-epa-index"]}
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Hourly Forecast */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white text-center mb-4">
                  Hourly Forecast
                </h4>
                <div className="flex overflow-x-auto space-x-3 pb-4 snap-x snap-mandatory">
                  {data.forecast.forecastday[0].hour.slice(0, hourlyRange).map((hour, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex-shrink-0 snap-start p-3 bg-white/20 backdrop-blur-lg rounded-lg border border-white/30 shadow-md hover:scale-105 transition-transform duration-300 w-28"
                    >
                      <p className="text-xs sm:text-sm font-medium text-white text-center">
                        {new Date(hour.time).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                      <img
                        src={`https:${hour.condition.icon}`}
                        alt="Hourly Weather Icon"
                        className="w-10 h-10 mx-auto my-1"
                        loading="lazy"
                      />
                      <p className="text-xs sm:text-sm text-white text-center">
                        {unit === "C" ? hour.temp_c : hour.temp_f}°{unit}
                      </p>
                      <p className="text-xs text-white text-center">{hour.condition.text}</p>
                      <p className="text-xs text-white text-center" title="Chance of rain">
                        💧 {hour.chance_of_rain}%
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 3-Day Forecast */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white text-center mb-4">
                  {forecastDays}-Day Forecast
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {sortedForecast(forecastDays).map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="p-4 bg-white/20 backdrop-blur-lg rounded-lg border border-white/30 shadow-md hover:scale-105 transition-transform duration-300"
                    >
                      <h5 className="text-sm sm:text-base font-medium text-white text-center">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </h5>
                      <img
                        src={`https:${day.day.condition.icon}`}
                        alt="Forecast Icon"
                        className="w-12 h-12 mx-auto my-2"
                        loading="lazy"
                      />
                      <p className="text-xs sm:text-sm text-white text-center">
                        {day.day.condition.text}
                      </p>
                      <div className="mt-2 text-white text-xs sm:text-sm space-y-1">
                        <p title="Maximum temperature">
                          High: {unit === "C" ? day.day.maxtemp_c : day.day.maxtemp_f}°{unit}
                        </p>
                        <p title="Minimum temperature">
                          Low: {unit === "C" ? day.day.mintemp_c : day.day.mintemp_f}°{unit}
                        </p>
                        <p title="Chance of rain">Precipitation: {day.day.daily_chance_of_rain}%</p>
                        <p title="Maximum wind speed">Wind: {day.day.maxwind_kph} kph</p>
                        <p title="Average humidity">Humidity: {day.day.avghumidity}%</p>
                      </div>
                      <div className="mt-2 text-white text-xs sm:text-sm">
                        <p title="Sunrise time">
                          <span role="img" aria-label="Sunrise">🌅</span> Sunrise: {day.astro.sunrise}
                        </p>
                        <p title="Sunset time">
                          <span role="img" aria-label="Sunset">🌇</span> Sunset: {day.astro.sunset}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;