import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full py-4 bg-black/50 backdrop-blur-md shadow-lg fixed top-0 z-50 border-b border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          🌌 Weather App
        </h1>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-cyan-400 transition duration-300 text-lg font-semibold"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-cyan-400 transition duration-300 text-lg font-semibold"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
