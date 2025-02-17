import { useState } from "react";
import BackImage from "../assets/BackgroundNew.jpg";

const Home = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("London");
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const fetchData = async (location) => {
    setLoading(true);

    const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `${apiUrl}?key=${apiKey}&q=${location}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok.");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BackImage})`, // Fixed the background image URL
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>

      <div className="flex flex-col pt-20 items-center justify-center min-h-screen p-6 relative z-10">
        <div className="bg-black/60 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-lg text-center border border-white/30">
          <h2 className="text-4xl font-extrabold text-white tracking-wider">
            Weather App
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Enter city name..."
              className="w-full px-4 py-3 text-gray-800 font-semibold bg-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            />
            <button
              onClick={() => fetchData(search)}
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out shadow-lg"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Display Weather Data */}
        {data && (
          <div className="mt-8 bg-black/60 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-lg text-center border border-white/30">
            <h3 className="text-2xl font-bold text-white">
              {`Weather in ${data.location.name}, ${data.location.country}`}
            </h3>
            <p className="text-xl text-white mt-2">
              {data.current.temp_c}°C | {data.current.condition.text}
            </p>
            <img
              src={`https:${data.current.condition.icon}`}
              alt="Weather Icon"
              className="mx-auto w-24 h-24 mt-4 rounded-full shadow-lg"
            />
            <p className="text-lg font-semibold text-white mt-2">
              {data.current.is_day === 0 ? "🌙 Night" : "☀️ Day"}
            </p>

            {/* Weather Details Summary */}
            <div className="mt-4 text-white text-left space-y-2">
              <p className="flex items-center gap-2">
                <span role="img" aria-label="Feels Like">🌡️</span>
                Feels Like: {data.current.feelslike_c}°C
              </p>
              <p className="flex items-center gap-2">
                <span role="img" aria-label="Wind">💨</span>
                Wind: {data.current.wind_kph} kph
              </p>
              <p className="flex items-center gap-2">
                <span role="img" aria-label="Humidity">🌫️</span>
                Humidity: {data.current.humidity}%
              </p>
              <p className="flex items-center gap-2">
                <span role="img" aria-label="Pressure">📉</span>
                Pressure: {data.current.pressure_mb} mb
              </p>
            </div>

            {/* "Show More" Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowMore(!showMore)}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg"
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            </div>

            {/* Additional Weather Details (Visible when Show More is clicked) */}
            {showMore && (
              <div className="mt-4 text-white text-left space-y-2">
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Region">🌍</span>
                  Region: {data.location.region}
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Time">🕒</span>
                  Local Time: {data.location.localtime}
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Last Updated">🖊️</span>
                  Last Updated: {data.current.last_updated}
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Dewpoint">🌅</span>
                  Dewpoint: {data.current.dewpoint_c}°C
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Windchill">🌪️</span>
                  Windchill: {data.current.windchill_c}°C
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Precipitation">💧</span>
                  Precipitation: {data.current.precip_mm} mm
                </p>
                <p className="flex items-center gap-2">
                  <span role="img" aria-label="Visibility">🌫️</span>
                  Visibility: {data.current.vis_km} km
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
