import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 640) { // Apply only on mobile (sm breakpoint)
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false); // Hide on scroll down
        } else {
          setIsVisible(true); // Show on scroll up
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
   <motion.nav
  animate={{ translateY: isVisible || window.innerWidth >= 640 ? 0 : "100%" }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="fixed bottom-3 sm:top-0 sm:bottom-auto left-1/2 transform -translate-x-1/2 w-fit sm:w-full sm:max-w-6xl mx-auto bg-black/40 backdrop-blur-2xl shadow-xl z-50 border border-white/10 sm:border-none rounded-full sm:rounded-none px-4 sm:px-6 py-1.5 sm:py-3"
>
  <div className="flex items-center justify-center gap-6 sm:justify-between sm:gap-0">
    <h1 className="hidden sm:flex text-2xl sm:text-3xl font-extrabold text-white tracking-tighter text-shadow-glow">
      <span role="img" aria-label="Weather">🌌</span> Weather App
    </h1>
    <div className="flex gap-6">
      <Link
        to="/"
        aria-label="Home"
        className="flex items-center justify-center text-white hover:text-blue-400 transition duration-200 focus:ring-2 focus:ring-blue-500/80"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>
      <Link
        to="/about"
        aria-label="About"
        className="flex items-center justify-center text-white hover:text-blue-400 transition duration-200 focus:ring-2 focus:ring-blue-500/80"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>
    </div>
  </div>
</motion.nav>

  );
};

export default Navbar;