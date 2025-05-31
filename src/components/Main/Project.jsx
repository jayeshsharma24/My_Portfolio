import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    title: 'Portfolio Website: Fully Responsive',
    description: 'This website is a portfolio, or we can say a kind of digital resume.',
    image: '/project-1.png',
    readMoreLink: '#',
    sourceCodeLink: '#',
  },
  {
    title: 'ToDo List Application',
    description: 'The Todo list application will store your daily routone tasks..',
    image: '/Project-2.png',
    readMoreLink: '#',
    sourceCodeLink: '#',
  },
  {
    title: 'Portfolio Website: Fully Responsive',
    description: 'This website is a portfolio, or we can say a kind of digital resume.',
    image: '/project-1.png',
    readMoreLink: '#',
    sourceCodeLink: '#',
  },
];

const Project = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,     // animate only once
    threshold: 0.2         // 20% of the component is visible
  });
  return (
    <motion.div name="Projects" className="  space-y-12 p-5 sm:p-6 lg:p-10 bg-white dark:bg-gray-900 m-3 rounded-lg animate-fadeIn shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]">
      <div className="text-white flex justify-center items-center gap-3">
        <h2 className="text-4xl sm:text-5xl font-bold">Projects</h2>
        <img
          src="https://img.icons8.com/?size=50&id=104233&format=png&color=000000"
          alt="Project Icon"
          className="h-10 w-10"
        />
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="w-full max-w-[300px] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]"
          >
            <a href={project.readMoreLink}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[200px] sm:max-h-[220px] md:max-h-[240px] lg:max-h-[260px] object-cover rounded-t-lg"
              />
            </a>
            <div className="p-4">
              <a href={project.readMoreLink}>
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h5>
              </a>
              <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">{project.description}</p>
              <div className="flex justify-between gap-2">
                <a
                  href={project.readMoreLink}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition hover:scale-105 hover:text-black"
                >
                  Read more
                </a>
                <a
                  href={project.sourceCodeLink}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition hover:scale-105 hover:text-black"
                >
                  Source
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Project;
