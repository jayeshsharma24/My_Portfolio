import React from 'react';

const techStack = [
  { name: 'Docker', img: 'https://img.icons8.com/?size=100&id=LdUzF8b5sz2R&format=png&color=000000'},
  { name: 'JavaScript', img: 'https://img.icons8.com/?size=100&id=108784&format=png&color=000000' },
  { name: 'Terraform', img: 'https://img.icons8.com/?size=100&id=kEkT1u7zTDk5&format=png&color=000000' },
  { name: 'ArgoCD', img: '/Argo CD.png' },
  { name: 'Node.js', img: 'https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000' },
  { name: 'CSS', img: 'https://img.icons8.com/?size=100&id=21278&format=png&color=000000' },
  { name: 'AWS', img: 'https://img.icons8.com/?size=100&id=33039&format=png&color=000000' },
  { name: 'Linux', img: 'https://img.icons8.com/?size=100&id=tmEqIUErLJVM&format=png&color=000000' },
  { name: 'HTML', img: 'https://img.icons8.com/?size=100&id=20909&format=png&color=000000' },
  { name: 'K8s', img: 'https://img.icons8.com/?size=100&id=cvzmaEA4kC0o&format=png&color=000000' },
  { name: 'Ansible', img: 'https://img.icons8.com/?size=100&id=iGCCE2iEmh2u&format=png&color=000000' },
  { name: 'GitHub', img: 'https://img.icons8.com/?size=100&id=12599&format=png&color=000000', className: 'invert' },
];

const TechStack = () => {
  return (
    <div name="Tech Stack" className="space-y-12 p-5 sm:p-6 lg:p-10 bg-white dark:bg-gray-900  m-3 rounded-lg animate-fadeIn shadow-[0_4px_6px_-1px_rgba(255,255,255,0.6)]">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">🚀 Tech Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {techStack.map((tech, index) => (
          <a
            key={index}
            href={tech.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center transition-transform hover:scale-105"
          >
            <img
              src={tech.img}
              alt={tech.name}
              className={`h-20 w-20 object-contain rounded-lg shadow-md ${tech.className || ''}`}
            />
            <span className="mt-2 text-sm text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" >
              {tech.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
export default TechStack;