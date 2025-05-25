import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const About = () => {
  return (
    <div name="Home" className="m-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 sm:p-6 lg:p-8 rounded-lg bg-white dark:bg-gray-900 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h1 className="text-amber-100 text-3xl sm:text-4xl md:text-5xl font-bold">
            Sharma Jayesh
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            Hello, I'm a{' '}
            <span className="animate-gradient-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              <Typewriter
                words={[
                  'Jayesh Sharma',
                  'Frontend Developer',
                  'React Enthusiast',
                  'DevOps Engineer',
                  'Cloud Engineer',
                  'Tech Explorer',
                ]}
                loop={Infinity}
                typeSpeed={80}
              />
            </span>
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            Dedicated, result-oriented with learning aptitude and the ability to
            clearly communicate complex technical concepts across business units.
          </p>

          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition w-auto sm:w-48"
          >
            Contact Me
          </a>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="./src/assets/myimage.png.png"
            alt="Jayesh"
            className="max-h-[300px] sm:max-h-[350px] md:max-h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
