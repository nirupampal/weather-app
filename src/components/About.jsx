const About = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6">
        <div className="bg-black/40 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-lg text-center border border-white/30">
          <h2 className="text-4xl font-extrabold text-white tracking-wider">About This App</h2>
          <p className="text-white mt-6 text-lg leading-relaxed">
            This is a simple weather app built using <span className="font-semibold">React.js</span> and the{" "}
            <span className="font-semibold">Weather API</span>.
            <br />
            It allows users to search for the current weather conditions in any city, with a simple and interactive interface.
          </p>
          <p className="text-white mt-6 text-lg leading-relaxed">
            🌍 Made with ❤️ by <span className="font-semibold">Nirupam Pal</span>
          </p>
  
          {/* Social Links */}
          <div className="mt-6 flex justify-center gap-6">
            <a
              href="https://github.com/nirupampal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl"
            >
              <i className="bx bxl-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/nirupam-pal-0916a721b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
            <a
              href="mailto:nirupampaldev@gmail.com"
              className="text-white text-3xl"
            >
              <i className="bx bx-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  