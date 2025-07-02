import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const introRef = useRef(null);
  const featuresRef = useRef(null);
  const developerRef = useRef(null);
  const techRef = useRef(null);

  const isIntroInView = useInView(introRef, { once: true, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const isDeveloperInView = useInView(developerRef, { once: true, margin: "-100px" });
  const isTechInView = useInView(techRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6 pt-16 sm:pt-20 pb-16 sm:pb-0 relative overflow-hidden">
      {/* Starry Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Introduction Section */}
      <motion.section
        ref={introRef}
        initial={{ y: 50 }}
        animate={{ y: isIntroInView ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isIntroInView ? "visible" : "hidden"}
          className="bg-black/40 backdrop-blur-2xl shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-3xl mx-auto border-2 border-gradient-to-r from-blue-600/60 to-purple-600/60 border-white/10"
        >
          <motion.h2
            variants={cardVariants}
            className="text-3xl sm:text-4xl flex flex-col font-extrabold text-white tracking-tight text-center text-shadow-glow flex items-center justify-center gap-2"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.9 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            About This Weather App
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-lg sm:text-xl font-medium text-white mt-6 leading-relaxed text-center"
          >
            Discover real-time weather updates with a sleek, interactive interface powered by{" "}
            <span className="font-semibold">React.js</span> and the{" "}
            <span className="font-semibold">Weather API</span>. Search for any city, customize your forecast, and experience a visually stunning design optimized for all devices.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial={{ y: 50 }}
        animate={{ y: isFeaturesInView ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-16"
      >
        <motion.h3
          variants={cardVariants}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center text-shadow-glow mb-8"
        >
          Key Features
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Real-Time Weather",
              desc: "Get up-to-date weather data for any city, powered by the Weather API.",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              ),
              title: "Customizable Forecasts",
              desc: "Choose forecast duration and parameters like wind, humidity, and UV index.",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              ),
              title: "Responsive Design",
              desc: "Seamlessly adapts to mobile, tablet, and desktop for a consistent experience.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-black/40 backdrop-blur-2xl shadow-xl rounded-xl p-4 sm:p-6 border-2 border-gradient-to-r from-blue-600/60 to-purple-600/60 border-white/10 hover:scale-105 hover:shadow-glow-premium transition duration-300"
            >
              <div className="flex items-center justify-center mb-4">{feature.icon}</div>
              <h4 className="text-lg sm:text-xl font-semibold text-white text-center">{feature.title}</h4>
              <p className="text-sm sm:text-base font-medium text-white mt-2 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Developer Section */}
      <motion.section
        ref={developerRef}
        initial={{ y: 50 }}
        animate={{ y: isDeveloperInView ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-16"
      >
        <motion.h3
          variants={cardVariants}
          initial="hidden"
          animate={isDeveloperInView ? "visible" : "hidden"}
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center text-shadow-glow mb-8"
        >
          Meet the Developer
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isDeveloperInView ? "visible" : "hidden"}
          className="bg-black/40 backdrop-blur-2xl shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-3xl mx-auto border-2 border-gradient-to-r from-blue-600/60 to-purple-600/60 border-white/10 hover:scale-105 hover:shadow-glow-premium transition duration-300"
        >
          <motion.div variants={cardVariants} className="flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </motion.div>
          <motion.h4 variants={cardVariants} className="text-lg sm:text-xl font-semibold text-white text-center">
            Nirupam Pal
          </motion.h4>
          <motion.p variants={cardVariants} className="text-sm sm:text-base font-medium text-white mt-4 text-center">
            A passionate web developer skilled in React, JavaScript, and modern UI/UX design. Dedicated to building intuitive and visually appealing applications.
          </motion.p>
          <motion.div variants={cardVariants} className="mt-6 flex justify-center gap-6">
            <a
              href="https://github.com/nirupampal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 hover:scale-110 hover:shadow-glow-premium transition duration-200 px-4 py-3"
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.49v-1.84c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.03 1.54 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.71.95.71 1.92v2.85c0 .27.16.58.67.49A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/nirupam-pal-0916a721b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 hover:scale-110 hover:shadow-glow-premium transition duration-200 px-4 py-3"
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8a6 6 0 00-12 0v7.5a6 6 0 0012 0V8zM5 9.5h.01M5 12h.01M5 14.5h.01M9 14.5h6M9 12h6"
                />
              </svg>
            </a>
            <a
              href="mailto:nirupampaldev@gmail.com"
              className="text-white hover:text-blue-400 hover:scale-110 hover:shadow-glow-premium transition duration-200 px-4 py-3"
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        ref={techRef}
        initial={{ y: 50 }}
        animate={{ y: isTechInView ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-16"
      >
        <motion.h3
          variants={cardVariants}
          initial="hidden"
          animate={isTechInView ? "visible" : "hidden"}
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center text-shadow-glow mb-8"
        >
          Tech Stack
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isTechInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              ),
              title: "React.js",
              desc: "A JavaScript library for building dynamic user interfaces.",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.172 2.172a2 2 0 010 2.828l-1.657 1.657"
                  />
                </svg>
              ),
              title: "Tailwind CSS",
              desc: "A utility-first CSS framework for rapid styling.",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.9 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              ),
              title: "Weather API",
              desc: "Provides real-time weather data for any location.",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              ),
              title: "Framer Motion",
              desc: "A library for smooth animations and transitions.",
            },
          ].map((tech, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-black/40 backdrop-blur-2xl shadow-xl rounded-xl p-4 sm:p-6 border-2 border-gradient-to-r from-blue-600/60 to-purple-600/60 border-white/10 hover:scale-105 hover:shadow-glow-premium transition duration-300"
            >
              <div className="flex items-center justify-center mb-4">{tech.icon}</div>
              <h4 className="text-lg sm:text-xl font-semibold text-white text-center">{tech.title}</h4>
              <p className="text-sm sm:text-base font-medium text-white mt-2 text-center">{tech.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;