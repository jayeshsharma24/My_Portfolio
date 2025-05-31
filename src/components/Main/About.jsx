import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Link as ScrollLink } from "react-scroll";
const About = () => {
  return (
    <section
      id="home"
      className="m-3"
      aria-label="About section with introduction and contact"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-lg
                      bg-white dark:bg-gray-900 
                      shadow-lg
                      transition-shadow duration-300
                      hover:shadow-xl animate-fadeIn shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]" 
      >
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-5">
          <h1 className="text-amber-400 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
            Sharma Jayesh
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hello, I'm a{' '}
            <span
              className="inline-block bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 bg-clip-text text-transparent font-extrabold"
              aria-label="Animated roles or descriptions"
            >
              <Typewriter
                words={[
                  'Jayesh Sharma',
                  'Frontend Developer',
                  'React Enthusiast',
                  'DevOps Engineer',
                  'Cloud Engineer',
                  'Tech Explorer',
                ]}
                loop={0} // 0 means infinite loop
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h2>

          <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed text-lg">
            Dedicated and result-oriented professional with a strong learning aptitude and
            the ability to clearly communicate complex technical concepts across business units.
          </p>

          <ScrollLink
            to="contact" smooth={true} duraction={500}  spy={true}
  isDynamic={true}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md
                       hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                       sm:w-48 text-center"
          >
            Contact Me
          </ScrollLink>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="/myimage.png.png"
            alt="Portrait of Jayesh Sharma"
            className="max-h-[280px] sm:max-h-[320px] md:max-h-[400px] object-contain rounded-lg shadow-lg"
            loading="lazy"
            decoding="async"
            width="400"
            height="400"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
